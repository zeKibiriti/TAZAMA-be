import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StationLog } from '../../station-log/entities/station-log.entity';
import { Station } from '../../stations/entities/station.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('users') // Table name
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    first_name!: string;

    @Column({ nullable: true })
    middle_name!: string;

    @Column({ nullable: false })
    last_name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ nullable: true })
    password!: string;

    @OneToMany(() => StationLog, (stationLog) => stationLog.user)
    stationLogs!: StationLog[];

    @ManyToOne(() => Station, (station) => station.users, { nullable: true })
    @JoinColumn({ name: 'station_id' })
    station!: Station[];

    @ManyToOne(() => Role, (role) => role.users, { nullable: true })
    @JoinColumn({ name: 'role_id' }) // Join column to specify the foreign key
    role!: Role;
}
