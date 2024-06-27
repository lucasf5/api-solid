class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default CustomError;
