import { InputType } from '@nestjs/graphql';

import { UserWhereInput } from 'src/@generated/user/user-where.input';

@InputType()
export class FindUserWhereInput extends UserWhereInput {}
