import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Book } from '../../book/entity/book.entity';

@Entity('author')
export class Author {
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
    type: 'integer',
    nullable: false,
  })
  age: 'integer';

  @Column({
    type: 'timestamp',
  })
  createdAt: Date;

  @OneToMany(() => Book, (book) => book.author, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  books: Book[];

  @BeforeInsert() async addDate() {
    this.createdAt = new Date();
  }
}
