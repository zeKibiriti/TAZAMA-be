import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { StationStatus } from '../../station-status/entities/station-status.entity';

@Entity('station_logs')
export class StationLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: Date;

  @ManyToOne(() => StationStatus, (stationStatus) => stationStatus.id, { nullable: false })
  @JoinColumn({ name: 'station_status_id' })
  stationStatus!: StationStatus;

  @Column({ type: 'float' })
  inletPressure!: number;

  @Column({ type: 'float' })
  outletPressure!: number;

  @Column({ type: 'float' })
  averageFlowRate!: number;

  @Column({ type: 'int' })
  operatingUnits!: number;

  @Column({ type: 'int' })
  unitsOnStandby!: number;

  @Column({ type: 'int' })
  unitsOnMaintenance!: number;

  @Column({ type: 'varchar', length: 100 })
  powerSource!: string;

  @Column({ type: 'boolean', default: false })
  tankOnDelivery!: boolean;

  @Column({ type: 'float' })
  pumpOver24Hrs!: number;

  @Column({ type: 'int' })
  pumpingDaysRemainingT4!: number;

  @Column({ type: 'text', nullable: true })
  remarks!: string;

  @ManyToOne(() => User, (user) => user.stationLogs, { nullable: false })
  @JoinColumn({ name: 'shift_leader_id' })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
