import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('roles') // Table name
export class Role {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  code!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: false })
  description!: string;

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions!: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}

