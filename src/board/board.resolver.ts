import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from './board.model';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/CreateBoardDto.dto';
import { DeleteBoardDto } from './dto/DeleteBoardDto.dto';
import { UpdateBoardDto } from './dto/updateBoardDto.dto';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  // 게시글 생성
  @Mutation(() => Board)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardDto,
  ): Promise<Board> {
    const createBoard = await this.boardService.createBoard(createBoardInput);
    return createBoard;
  }

  // 게시글 수정
  @Mutation(() => Board)
  async updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardDto,
  ): Promise<Board> {
    const findUser = await this.boardService.updateBoard(updateBoardInput);
    return findUser;
  }

  // 게시글 삭제
  @Mutation(() => Board)
  async deleteBoard(
    @Args('deleteBoardInput') deleteBoardInput: DeleteBoardDto,
  ): Promise<Board> {
    const deleteUser = await this.boardService.deleteBoard(deleteBoardInput);
    return deleteUser;
  }

  // 게시글 찾기
  @Query(() => Board)
  async findBoard(@Args('id') id: number): Promise<Board> {
    const findBoard = await this.boardService.findBoard(id);
    return findBoard;
  }

  // 사용자의 게시글 찾기
  @Query(() => [Board])
  async getBoards(@Args('userName') userName: string): Promise<Board[]> {
    const findBoards = await this.boardService.getBoards(userName);
    return findBoards;
  }
}
