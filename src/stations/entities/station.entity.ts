import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from '../../regions/entities/region.entity';
import { User } from '../../users/entities/user.entity';

@Entity('stations') // Table name
export class Station {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  code!: string;

  @Column({ nullable: true })
  name!: string;

  @ManyToOne(() => Region, (region) => region.stations, { nullable: false })
  @JoinColumn({ name: 'region_id' })
  region!: Region;

  @OneToMany(() => User, (user) => user.station)
  users!: User[];

  @Column({ nullable: true })
  description!: string;
}
