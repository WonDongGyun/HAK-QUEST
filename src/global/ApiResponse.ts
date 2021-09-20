export class ApiResponse {
  private code: number;
  private message: string;
  private response: any;

  constructor(code: number, message: string, response: any) {
    this.response = response;
    this.code = code;
  }

  static userApiResponse(
    code: number,
    message: string,
    response: any,
  ): ApiResponse {
    return new ApiResponse(code, message, response);
  }
}
