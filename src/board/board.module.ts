import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { Board } from './board.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Board])],
  providers: [BoardService, BoardResolver],
  exports: [TypeOrmModule],
})
export class BoardModule {}
