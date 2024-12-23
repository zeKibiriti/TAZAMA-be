import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Station } from '../../stations/entities/station.entity';

@Entity('regions') // Table name
export class Region {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  code!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => Station, (station) => station.region)
  stations!: Station[];
}
