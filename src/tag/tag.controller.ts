import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Tag } from './entities/tag.entity';

@ApiTags('tags')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Enviar arquivo excel com as tags' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Arquivo processado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Arquivo inválido ou formato incorreto',
  })
  async uploadFile(@UploadedFile() file: any) {
    await this.tagService.processExcelFile(file);
    return { message: 'Arquivo processado com sucesso.' };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar todas as tags' })
  @ApiResponse({ status: HttpStatus.OK, type: [Tag] })
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':tag')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar tag por ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Tag })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Tag nao encontrada',
  })
  findOne(@Param('tag') tag: string): Tag {
    const foundTag = this.tagService.findOne(tag);
    if (!foundTag) {
      throw new NotFoundException('Tag nao encontrada');
    }
    return foundTag;
  }

  @Put(':tag')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar uma tag' })
  @ApiResponse({ status: HttpStatus.OK, type: Tag })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tag nao encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  update(@Param('tag') tag: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(tag, updateTagDto);
  }

  @Delete(':tag')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar tag' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Tag removida com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tag nao encontrada',
  })
  remove(@Param('tag') tag: string) {
    const deleted = this.tagService.delete(tag);
    if (!deleted) {
      throw new NotFoundException('Tag nao encontrada');
    }
    return { message: 'Tag removida com sucesso' };
  }
}
