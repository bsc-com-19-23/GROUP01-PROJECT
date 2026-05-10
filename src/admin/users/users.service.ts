import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
      select: ['id', 'email', 'passwordhash', 'role', 'name'],
    });
  }
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  // CREATE USER
  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      passwordhash: hashedPassword,
      role: dto.role,
    });

    return this.repo.save(user);
  }

  // GET ALL USERS
  findAll() {
    return this.repo.find();
  }

  // GET ONE USER
  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }
  // UPDATE USER
  async update(id: number, dto: UpdateUserDto) {
    await this.repo.update(id, {
      ...dto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      role: dto.role ? ({ id: dto.role } as any) : undefined,
    });
    return this.findOne(id);
  }

  // DELETE USER
  remove(id: number) {
    return this.repo.delete(id);
  }

  // ACTIVATE / DEACTIVATE
  async setActive(id: number, status: boolean) {
    await this.repo.update(id, { isActive: status });
    return this.findOne(id);
  }
}
