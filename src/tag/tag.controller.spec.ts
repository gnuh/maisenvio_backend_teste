import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { NotFoundException } from '@nestjs/common';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [TagService],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should process excel file successfully', async () => {
      const mockFile = {
        buffer: Buffer.from('mock excel content'),
      } as any;

      jest
        .spyOn(service, 'processExcelFile')
        .mockImplementation(async () => undefined);

      const result = await controller.uploadFile(mockFile);

      expect(result).toEqual({ message: 'Arquivo processado com sucesso.' });
      expect(service.processExcelFile).toHaveBeenCalledWith(mockFile);
    });
  });

  describe('findAll', () => {
    it('should return array of tags', () => {
      const mockTags = [
        {
          tag: 'AA123456789BR',
          name: 'Test User 1',
          status: 1,
          source: '39645000',
          price: 10,
        },
        {
          tag: 'BB123456789BR',
          name: 'Test User 2',
          status: 2,
          source: '39645001',
          price: 20,
        },
      ];

      jest.spyOn(service, 'findAll').mockImplementation(() => mockTags);

      const result = controller.findAll();

      expect(result).toEqual(mockTags);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single tag', () => {
      const mockTag = {
        tag: 'AA123456789BR',
        name: 'Test User',
        status: 1,
        source: '39645000',
        price: 10,
      };

      jest.spyOn(service, 'findOne').mockImplementation(() => mockTag);

      const result = controller.findOne('AA123456789BR');

      expect(result).toEqual(mockTag);
      expect(service.findOne).toHaveBeenCalledWith('AA123456789BR');
    });

    it('should throw NotFoundException when tag not found', () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => undefined);

      expect(() => controller.findOne('non-existent')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return tag', () => {
      const mockTag = {
        tag: 'AA123456789BR',
        name: 'Test User',
        status: 2,
        source: '39645000',
        price: 15,
      };

      jest.spyOn(service, 'update').mockImplementation(() => mockTag);

      const result = controller.update('AA123456789BR', {
        status: 2,
        price: 15,
      });

      expect(result).toEqual(mockTag);
      expect(service.update).toHaveBeenCalledWith('AA123456789BR', {
        status: 2,
        price: 15,
      });
    });

    it('should throw NotFoundException when updating non-existent tag', () => {
      jest.spyOn(service, 'update').mockImplementation(() => {
        throw new NotFoundException('Tag nao encontrada.');
      });

      expect(() => {
        controller.update('non-existent', { status: 2 });
      }).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete tag and return success message', () => {
      jest.spyOn(service, 'delete').mockImplementation(() => true);

      const result = controller.remove('AA123456789BR');

      expect(result).toEqual({ message: 'Tag removida com sucesso' });
      expect(service.delete).toHaveBeenCalledWith('AA123456789BR');
    });

    it('should throw NotFoundException when deleting non-existent tag', () => {
      jest.spyOn(service, 'delete').mockImplementation(() => false);

      expect(() => controller.remove('non-existent')).toThrow(
        NotFoundException,
      );
    });
  });
});
