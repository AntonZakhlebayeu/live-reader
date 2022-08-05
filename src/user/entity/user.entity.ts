import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  age: 'integer';

  @Column({
    type: 'timestamp',
  })
  registerDate: Date;

  @Column({
    type: 'timestamp',
  })
  lastLoginDate: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  passwordHash: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @BeforeInsert()
  async completeUserModel() {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    this.registerDate = new Date();
    this.lastLoginDate = new Date();
  }
}
