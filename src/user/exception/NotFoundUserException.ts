import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundUserException extends HttpException {
  constructor(id: number) {
    super(`${id} not found`, HttpStatus.BAD_REQUEST);
  }
}
