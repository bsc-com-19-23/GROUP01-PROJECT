import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = (await this.usersService.findByEmail(email)) as any;
    console.log('USER FROM DB:', user); // Debug log
    console.log('INPUT PASSWORD:', password); // Debug log
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('HASHED PASSWORD:', user?.password); // Debug log

    if (!user) throw new UnauthorizedException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('PASSWORD MATCH:', isMatch); // Debug log

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }

  async login(email: string, password: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.validateUser(email, password);

    const payload = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      sub: user.id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      email: user.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
