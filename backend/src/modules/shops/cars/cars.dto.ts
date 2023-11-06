import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CarsDTO {
	@IsNotEmpty({ message: "El campo 'type' no puede estar vacío" })
	@ApiProperty({ required: true, example: '', type: String })
	type: string;

	@IsNotEmpty({ message: "El campo 'year' no puede estar vacío" })
	@ApiProperty({ required: true, example: '', type: Number })
	year: number;

	@IsNotEmpty({ message: "El campo 'km' no puede estar vacío" })
	@ApiProperty({ required: true, example: '', type: Number })
	km: number;
}
