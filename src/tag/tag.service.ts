import { Injectable } from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import * as XLSX from 'xlsx';

@Injectable()
export class TagService {
  private tags: Map<string, Tag> = new Map();

  async processExcelFile(file: any): Promise<void> {
    const workbook = XLSX.read(file.buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);
    data.forEach((row: any) => {
      if (row.Customer === 'Tag') {
        return;
      }
      const tag: Tag = {
        tag: row.Customer,
        name: row['MaisEnvios Testes'],
        status: row.__EMPTY,
        source: row.__EMPTY_1.toString(),
        price:
          typeof row.__EMPTY_2 === 'string'
            ? parseFloat(row.__EMPTY_2.replace(',', '.'))
            : row.__EMPTY_2,
      };
      this.tags.set(tag.tag, tag);
    });
  }

  findAll() {
    return Array.from(this.tags.values());
  }

  findOne(tag: string): Tag {
    return this.tags.get(tag);
  }

  update(tag: string, updateData: Partial<Tag>): Tag {
    const existingTag = this.tags.get(tag);
    if (!existingTag) {
      throw new Error('Tag nao encontrada.');
    }
    const updatedTag = { ...existingTag, ...updateData };
    this.tags.set(tag, updatedTag);
    return updatedTag;
  }

  delete(tag: string): boolean {
    return this.tags.delete(tag);
  }
}
