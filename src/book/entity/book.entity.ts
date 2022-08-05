import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { Author } from '../../author/entity/author.entity';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  category: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  mark: number;

  @Column({
    type: 'timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @BeforeInsert() async addDate() {
    this.createdAt = new Date();
  }
}
