import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MedicalRecord } from "./Medical-Record";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string

    @Column()
    lastName!: string;

    @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
    medicalRecord!: MedicalRecord[];



}