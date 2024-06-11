import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: 'Id of the todo'})
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, { nullable: true, description: 'What needs to be done'})
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true, description: 'Is it done?'})
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}