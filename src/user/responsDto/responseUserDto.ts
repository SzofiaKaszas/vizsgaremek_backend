import { ApiProperty, PickType } from "@nestjs/swagger";

export class UserBaseDto {
  @ApiProperty({ example: 1 })
  idUser: number;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'exampleemail@example.com' })
  email: string;

  @ApiProperty({example: 'exampleemail@example.com'})
  connectionEmail: string;

  @ApiProperty({ example: '+1234567890' })
  phoneNumber: string;

  @ApiProperty({ example: 'Student from Budapest, interested in shared housing.' })
  userBio?: string;

  @ApiProperty({ example: 25 })
  age?: number;

  @ApiProperty({ example: 'male' })
  gender?: string;

  @ApiProperty({ example: 'Software engineer' })
  occupation?: string;

  @ApiProperty({ example: false })
  hasHouse: boolean;

  @ApiProperty({ example: false })
  lookingForPeople: boolean;

  @ApiProperty({ example: true })
  lookingForHouse: boolean;

  @ApiProperty({ example: 'user' })
  role: string;
}

export class UserNecessaryDto extends PickType(UserBaseDto, [
  "idUser",
  "firstName",
  "lastName",
  "connectionEmail",
  "phoneNumber"
] as const){}




