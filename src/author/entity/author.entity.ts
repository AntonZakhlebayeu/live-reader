import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
