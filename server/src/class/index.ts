export class ResponseData<T> {
  constructor(
    public status: number,
    public code: number,
    public message: string,
    public time: Date,
    public data?: T,
  ) {}
}