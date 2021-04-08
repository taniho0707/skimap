import { Request, Response } from 'express';
import { ErrorCode } from '../constants/error';

type AddUserBody = {
  name: string,
  email: string,
};

/**
 * APIのハンドリングをする機能
 */
export class Handler {
  constructor(private req: Request, private res: Response) {};

  /**
   * データの送信
   */
  json<T>(data: T): void {
    this.res.json({ data: data });
  }

  /**
   * エラーの送信
   */
  error(error: ErrorCode): void {
    this.res.status(error.status).send({ error: error });
  }

  getBody(): AddUserBody {
    return this.req.body;
  }
}
