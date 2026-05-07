import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  condition!: string;

  @Column()
  medication!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

 @ManyToOne(() => User, (user) => user.medicalRecord)
  patient!: User; 
}