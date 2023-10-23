import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ShopsDTO {
	/*@IsNotEmpty({message: "El campo 'script' no puede estar vacío"})
	@ApiProperty({ required: true, example: '', type: String })
	script: string;*/
}
