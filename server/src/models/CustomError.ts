export class CustomError {
  statusCode: Number;
  message: String;

  constructor(statusCode: Number, message: String) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
