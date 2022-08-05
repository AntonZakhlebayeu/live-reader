import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Book])],
  providers: [BookService],
})
export class BookModule {}
