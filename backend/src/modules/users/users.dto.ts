import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UsersDTO {
	@IsNotEmpty({ message: "El campo 'username' no puede estar vacío" })
	@ApiProperty({ required: true, example: '', type: String })
	username: string;

	@ApiProperty({ required: true, example: '', type: String })
	name: string;

	@ApiProperty({ required: true, example: '', type: String })
	surname: string;

	@IsNotEmpty({ message: "El campo 'password' no puede estar vacío" })
	@ApiProperty({ required: true, example: '', type: String })
	password: string;
}
