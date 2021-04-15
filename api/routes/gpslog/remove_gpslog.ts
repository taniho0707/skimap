import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { NO_DATA_EXISTS } from '../../constants/error';
import { Gpslog } from '../../models/index';

export class RemoveGpslog {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    Gpslog.destroy({
      where: {
        id: this.handler.getBody().id,
      }
    })
      .then((Gpslog) => {
        return this.handler.json({success: true});
      })
      .catch((error) => {
        console.log(error);
        return this.handler.error(NO_DATA_EXISTS);
      });
  }
}
