import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/CreateBoardDto.dto';
import { DeleteBoardDto } from './dto/DeleteBoardDto.dto';
import { UpdateBoardDto } from './dto/updateBoardDto.dto';
import { NotFoundBoardException } from './exception/NotFoundBoardException';

@Injectable()
export class BoardService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {
    console.log('use this repository board', Board);
  }

  // 사용자의 userName를 받아 게시글 생성
  async createBoard(args: CreateBoardDto) {
    const findUser = await this.userService.findUser(args.userName);

    const board = new Board();
    board.author = findUser;
    board.title = args.title;
    board.content = args.content;

    return await this.boardRepository.save(board);
  }

  // 게시글 찾기
  async findBoard(id: number): Promise<Board> {
    const findBoard = await this.boardRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findBoard) {
      throw new NotFoundBoardException(id);
    }
    return findBoard;
  }

  async findUserBoard(id: number, user: User): Promise<Board> {
    const findBoard = await this.boardRepository.findOne({
      where: {
        id: id,
        author: user,
      },
    });

    if (!findBoard) {
      throw new NotFoundBoardException(id);
    }
    return findBoard;
  }

  // 사용자의 userName과 게시글의 id를 받아 게시글 수정
  async updateBoard(args: UpdateBoardDto) {
    const findUser = await this.userService.findUser(args.userName);
    const findBoard = await this.findUserBoard(args.boardId, findUser);
    findBoard.title = args.title;
    findBoard.content = args.content;

    return await this.boardRepository.save(findBoard);
  }

  // 사용자의 userName과 게시글의 id를 받아 게시글 삭제
  async deleteBoard(args: DeleteBoardDto) {
    const findUser = await this.userService.findUser(args.userName);
    const findBoard = await this.findUserBoard(args.boardId, findUser);
    await this.boardRepository.softDelete({
      id: args.boardId,
    });

    const deleteBoard = await this.boardRepository.findOne({
      where: { id: findBoard.id },
      withDeleted: true,
    });

    return deleteBoard;
  }

  // 사용자의 userName을 받아 해당 사용자가 작성한 게시글 확인
  async getBoards(args: string) {
    const findUser = await this.userService.findUser(args);
    const findBoards = await this.boardRepository.find({
      where: {
        author: findUser,
      },
    });
    return findBoards;
  }
}
