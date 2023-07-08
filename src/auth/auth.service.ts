import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email: email });
    const valid = user && (await bcrypt.compare(password, user?.password));

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne({
      email: loginUserInput.email,
    });
    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
        role: user.role,
      }),
      user: result,
    };
  }

  async signup(signupUserInput: CreateUserInput) {
    const userEmailExists = await this.userService.findOne({
      email: signupUserInput.email,
    });

    if (userEmailExists) {
      throw new Error(
        `Email ${signupUserInput.email} já cadastrado no sistema!`,
      );
    }

    const existsUserDocument = await this.userService.findOne({
      document: signupUserInput.document,
    });

    if (existsUserDocument) {
      throw new Error(
        `Documento ${signupUserInput.document} já cadastrado no sistema!`,
      );
    }

    const passwordHashed = await bcrypt.hash(signupUserInput.password, 10);

    const newUser = await this.userService.create({
      ...signupUserInput,
      password: passwordHashed,
    });

    const { password, ...result } = newUser;

    if (newUser) {
      return {
        access_token: this.jwtService.sign({
          email: newUser.email,
          sub: newUser.id,
          role: newUser.role,
        }),
        user: result,
      };
    }
  }
}
