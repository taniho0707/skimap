import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { NO_DATA_EXISTS } from '../../constants/error'
import { Skimap } from '../../models/index'

export class GetTests {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    const data = this.getTests();
    
    if (!data) {
      return this.handler.error(NO_DATA_EXISTS);
    }

    return this.handler.json(data);
  }

  /**
   * メッセージを返す
   */
  getTests() {
    return Skimap.findAll({
      attributes: ['id', 'name', 'description'],
    });
  }
}
