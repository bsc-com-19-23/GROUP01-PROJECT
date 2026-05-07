import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('records')
export class RecordEntity {

    @PrimaryGeneratedColumn()
    id: number = 0;
    // ! tell typescript that the vaues will be added later by the database.
    @Column()
    patientId!: number;

    // Name of disease (e.g. Malaria, Flu)
    @Column()
    diseaseName!: string;

    // Doctor's diagnosis (detailed explanation)
    @Column({ type: 'text', nullable: true })
    diagnosis!: string;

    // Treatment given
    @Column()
    medication!: string;

    // Optional notes
    @Column({ type: 'text', nullable: true })
    notes!: string;

    // Date of visit
    @Column({ type: 'date' })
    date!: string;

    @Column()
    diagnosisedBy!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
