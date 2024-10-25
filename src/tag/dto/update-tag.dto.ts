import { PartialType } from '@nestjs/swagger';
import { Tag } from '../entities/tag.entity';

export class UpdateTagDto extends PartialType(Tag) {}
