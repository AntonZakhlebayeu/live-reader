import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { BookController } from './book/book.controller';
import { BookModule } from './book/book.module';
import { Author } from './author/entity/author.entity';
import { Book } from './book/entity/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [User, Author, Book],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    AuthorModule,
    BookModule,
  ],
  controllers: [AppController, BookController],
  providers: [AppService],
})
export class AppModule {}
