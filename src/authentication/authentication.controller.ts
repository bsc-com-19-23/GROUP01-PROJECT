// src/authentication/authentication.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  // Route: POST /auth/login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const student = await this.authService.validateStudent(
      loginDto.name,
      loginDto.password,
    );

    if (!student) {
      return { message: 'Invalid credentials' };
    }

    return {
      message: 'Login successful',
      studentId: student.id,
    };
  }
}