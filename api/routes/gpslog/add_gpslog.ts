import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { PARAMETER_INVALID } from '../../constants/error';
import { Gpslog } from '../../models/index';

import convert from 'xml-js';
import fs from 'fs';

export class AddGpslog {
  handler: Handler;

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res);
  }

  /**
   * メイン処理
   */
  async main() {
    let jsondata: any = JSON.parse(this.handler.getBody().json);
    let filepath: string = this.handler.getFile().path;

    // ファイルを開いて日時を読み出す
    let gpx_data = fs.readFileSync(filepath, 'utf-8');
    let gpx_raw: any = convert.xml2js(gpx_data, {ignoreComment: true, compact: true});
    let date_raw: any = gpx_raw.gpx.trk.name._text.slice(0, 10);
    let filedate: Date = new Date(date_raw);

    Gpslog.create({
      filepath: filepath,
      filename: this.handler.getFile().originalname,
      area_id: jsondata.area_id,
      user_id: jsondata.user_id,
      date: filedate,
    })
      .then((Gpslog) => {
        this.handler.json({ success: true });
      })
      .catch((error) => {
        console.log(error);
        this.handler.error(PARAMETER_INVALID);
      });
  }
}
