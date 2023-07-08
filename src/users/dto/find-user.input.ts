import { InputType } from '@nestjs/graphql';

import { UserWhereUniqueInput } from 'src/@generated/user/user-where-unique.input';
@InputType()
export class FindUserInput extends UserWhereUniqueInput {}
