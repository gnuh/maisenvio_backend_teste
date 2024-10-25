import { ApiProperty } from '@nestjs/swagger';

export class Tag {
  @ApiProperty({
    description: 'Identificador único da tag',
    example: 'AA123456789BR',
  })
  tag: string;

  @ApiProperty({
    description: 'Nome do destinatário',
    example: 'Fulano da Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Status da tag',
    example: 1,
    enum: [1, 2, 3, 4],
  })
  status: number;

  @ApiProperty({
    description: 'CEP de origem',
    example: '39645000',
  })
  source: string;

  @ApiProperty({
    description: 'Preço',
    example: 10.5,
    minimum: 0,
  })
  price: number;
}
