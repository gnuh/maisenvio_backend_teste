import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import * as XLSX from 'xlsx';

// Mock do XLSX
jest.mock('xlsx', () => ({
  read: jest.fn().mockReturnValue({
    SheetNames: ['Sheet1'],
    Sheets: {
      Sheet1: {},
    },
  }),
  utils: {
    sheet_to_json: jest.fn(),
  },
}));

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService],
    }).compile();
    service = module.get<TagService>(TagService);

    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processExcelFile', () => {
    it('should process excel file and store tags', async () => {
      const mockFile = {
        buffer: Buffer.from('mock excel content'),
      } as any;

      const mockExcelData = [
        {
          Customer: 'Tag', // header row
          'MaisEnvios Testes': 'name',
          __EMPTY: 'status',
          __EMPTY_1: 'source',
          __EMPTY_2: 'price',
        },
        {
          Customer: 'AA123456789BR',
          'MaisEnvios Testes': 'Fulano da Silva 1',
          __EMPTY: 1,
          __EMPTY_1: 39645000,
          __EMPTY_2: 10,
        },
      ];

      // Configure o mock para retornar os dados
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockExcelData);

      await service.processExcelFile(mockFile);
      const tags = service.findAll();

      expect(tags).toHaveLength(1);
      expect(tags[0].tag).toBe('AA123456789BR');
      expect(tags[0].name).toBe('Fulano da Silva 1');
    });
  });

  describe('update', () => {
    it('should update an existing tag', () => {
      const mockTag: Tag = {
        tag: 'AA123456789BR',
        name: 'Test User',
        status: 1,
        source: '39645000',
        price: 10,
      };

      service['tags'].set(mockTag.tag, mockTag);

      const updateData = {
        status: 2,
        price: 15,
      };

      const updatedTag = service.update(mockTag.tag, updateData);

      expect(updatedTag.status).toBe(2);
      expect(updatedTag.price).toBe(15);
      expect(updatedTag.name).toBe(mockTag.name);
    });

    it('should throw error when updating non-existent tag', () => {
      expect(() => service.update('non-existent', { status: 2 })).toThrow(
        'Tag nao encontrada.', // Atualizado para corresponder à mensagem real
      );
    });
  });
});
