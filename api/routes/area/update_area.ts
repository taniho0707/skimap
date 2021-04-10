import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { NO_DATA_EXISTS } from '../../constants/error';
import { Area } from '../../models/index';

export class UpdateArea {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    Area.update({
      name: this.handler.getBody().name,
      prefecture: this.handler.getBody().prefecture,
      area_id: this.handler.getBody().area_id,
      fullname: this.handler.getBody().fullname,
      official_url: this.handler.getBody().official_url,
    }, {
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
