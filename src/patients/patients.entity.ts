import{Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,} from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  program: string;
}
