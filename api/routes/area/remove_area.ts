import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { NO_DATA_EXISTS } from '../../constants/error';
import { Area } from '../../models/index';

export class RemoveArea {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    Area.destroy({
      where: {
        id: this.handler.getBody().id,
      }
    })
      .then((Area) => {
        return this.handler.json({success: true});
      })
      .catch((error) => {
        console.log(error);
        return this.handler.error(NO_DATA_EXISTS);
      });
  }
}
