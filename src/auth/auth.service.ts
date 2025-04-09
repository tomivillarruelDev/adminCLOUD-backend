import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {}

  login(LoginDto: LoginDto) {}
}
