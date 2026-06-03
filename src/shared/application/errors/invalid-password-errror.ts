export class InvalidPaswordError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'InvalidPaswordError';
  }
}
