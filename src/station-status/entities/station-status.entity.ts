import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StationLog } from '../../station-log/entities/station-log.entity';

  @Entity('station_status') // Table name
  export class StationStatus {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    code!: string;

    @Column({ nullable: true })
    name!: string;

    @Column({ nullable: true })
    description!: string;

    @OneToMany(() => StationLog, (stationLog) => stationLog.stationStatus)
    logs!: StationLog[];
}
