// src/authentication/authentication.service.ts
import { Injectable } from '@nestjs/common';

export interface Student {
  id: number;
  name: string;
}

@Injectable()
export class AuthenticationService {
  async validateStudent(name: string, password: string): Promise<Student | null> {
    // Example mock logic
    if (name === 'test' && password === 'password') {
      return { id: 1, name };
    }
    return null;
  }
}
