export class ResponseData<T> {
  constructor(
    public code: number,
    public message: string,
    public time: Date,
    public data?: T,
  ) {}
}