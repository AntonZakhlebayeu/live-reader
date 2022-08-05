import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookController } from './book.controller';
import { AuthorService } from '../author/author.service';
import { Author } from '../author/entity/author.entity';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [AuthModule, AuthorModule, TypeOrmModule.forFeature([Book, Author])],
  controllers: [BookController],
  providers: [BookService, AuthorService],
})
export class BookModule {}
