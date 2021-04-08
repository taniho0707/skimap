import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { NO_DATA_EXISTS } from '../../constants/error';
import { User } from '../../models/index';

export class RemoveUser {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    User.destroy({
      where: {
        name: this.handler.getBody().name,
      }
    })
      .then((User) => {
        return this.handler.json({success: true});
      })
      .catch((error) => {
        console.log(error);
        return this.handler.error(NO_DATA_EXISTS);
      });
  }
}
