import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { USER_EXISTS } from '../../constants/error';
import { User } from '../../models/index';

export class AddUser {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    User.create({
      name: this.handler.getBody().name,
      email: this.handler.getBody().email,
    })
      .then((User) => {
        return this.handler.json({success: true});
      })
      .catch((error) => {
        console.log(error);
        return this.handler.error(USER_EXISTS);
      });
  }
}
