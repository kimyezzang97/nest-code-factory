import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entity';

@Module({
  imports: [PostsModule,
    TypeOrmModule.forRoot({
      // DB 타입
      type:'postgres',
      host: 'localhost', // or 127.0.0.1
      port : 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostsModel],
      synchronize: true, // 개발환경 : true, 운영 : false 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
