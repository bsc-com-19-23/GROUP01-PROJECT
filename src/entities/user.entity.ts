import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  HEALTHY_OFFICER = 'HEALTHY_OFFICER',
  PATIENT = 'PATIENT',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  passwordhash!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', default: UserRole.PATIENT })
  role!: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
