import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Tag } from './entities/tag.entity';

@ApiTags('tags')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Enviar arquivo excel com as tags' })
  @ApiResponse({ status: 201, description: 'Arquivo processado com sucesso' })
  async uploadFile(@UploadedFile() file: any) {
    await this.tagService.processExcelFile(file);
    return { message: 'Arquivo processado com sucesso.' };
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas as tags' })
  @ApiResponse({ status: 200, type: [Tag] })
  findAll() {
    console.log('loading');
    return this.tagService.findAll();
  }

  @Get(':tag')
  @ApiOperation({ summary: 'Buscar tag por ID' })
  @ApiResponse({ status: 200, type: Tag })
  @ApiResponse({ status: 404, description: 'Tag nao encontrada' })
  findOne(@Param('tag') tag: string): Tag {
    const foundTag = this.tagService.findOne(tag);
    if (!foundTag) {
      throw new NotFoundException('Tag nao encontrada');
    }
    return foundTag;
  }

  @Patch(':tag')
  @ApiOperation({ summary: 'Atualizar uma tag' })
  @ApiResponse({ status: 200, type: Tag })
  @ApiResponse({ status: 404, description: 'Tag nao encontrada' })
  update(@Param('tag') tag: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(tag, updateTagDto);
  }

  @Delete(':tag')
  @ApiOperation({ summary: 'Deletar tag' })
  @ApiResponse({ status: 200, description: 'Tag removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Tag nao encontrada' })
  remove(@Param('tag') tag: string) {
    const deleted = this.tagService.delete(tag);
    if (!deleted) {
      throw new NotFoundException('Tag nao encontrada');
    }
    return { message: 'Tag removida com sucesso' };
  }
}
