import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { NO_DATA_EXISTS } from '../../constants/error'
import { Gpslog } from '../../models/index'

export class GetGpslog {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    const data = await this.getGpslog();
    
    if (!data) {
      return this.handler.error(NO_DATA_EXISTS);
    }

    return this.handler.json(data);
  }

  /**
   * メッセージを返す
   */
  getGpslog() {
    return Gpslog.findAll({
      attributes: ['id', 'area_id', 'user_id', 'date']
    });
  }
}
