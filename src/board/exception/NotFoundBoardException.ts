import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundBoardException extends HttpException {
  constructor(boardId: number) {
    super(`${boardId} not found`, HttpStatus.BAD_REQUEST);
  }
}
