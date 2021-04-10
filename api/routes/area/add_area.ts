import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { AREA_EXISTS } from '../../constants/error';
import { Area } from '../../models/index';

export class AddArea {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    Area.create({
      name: this.handler.getBody().name,
      prefecture: this.handler.getBody().prefecture,
      area_id: this.handler.getBody().area_id,
      fullname: this.handler.getBody().fullname,
      official_url: this.handler.getBody().official_url,
    })
      .then((User) => {
        return this.handler.json({success: true});
      })
      .catch((error) => {
        console.log(error);
        return this.handler.error(AREA_EXISTS);
      });
  }
}
