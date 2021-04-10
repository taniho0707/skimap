import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { NO_DATA_EXISTS } from '../../constants/error'
import { Area } from '../../models/index'

export class GetAreas {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    const data = await this.getAreas();
    
    if (!data) {
      return this.handler.error(NO_DATA_EXISTS);
    }

    return this.handler.json(data);
  }

  /**
   * メッセージを返す
   */
  getAreas() {
    return Area.findAll({
      attributes: ['id', 'name'],
    });
  }
}
