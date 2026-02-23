import { ApiProperty, PickType } from "@nestjs/swagger";

export class RoommatesPrefrencesBaseDto {
    @ApiProperty({ example: 18, required: false })
    minAge?: number;

    @ApiProperty({ example: 30, required: false })
    maxAge?: number;
    @ApiProperty({ example: 'female', required: false })
    gender?: string; //maybe enum later

    @ApiProperty({ example: 'en' , required: false })
    language?: string;
}
