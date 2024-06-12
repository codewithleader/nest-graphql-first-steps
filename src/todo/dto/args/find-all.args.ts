import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class FindAllArgs {
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}