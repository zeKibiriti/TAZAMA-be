import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  code!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  @JoinColumn({ name: 'role_id' }) // Join column to specify the foreign key
  role!: Role;
}
