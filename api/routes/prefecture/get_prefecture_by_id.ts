import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { PARAMETER_INVALID, NO_DATA_EXISTS } from '../../constants/error';
import { Prefecture } from '../../models/index';

type Params = {
    prefecture_id: number
}

export class GetPrefectureById {
    handler: Handler
    params: Params

    constructor(req: Request, res: Response) {
        this.handler = new Handler(req, res);
        this.params = {
            prefecture_id: Number(req.params.prefecture_id),
        }
    }

    async main() {
        if (!this.params.prefecture_id) {
            return this.handler.error(PARAMETER_INVALID);
        }
        
        const data = await this.getPrefecture();

        if (!data) {
            return this.handler.error(NO_DATA_EXISTS);
        }

        return this.handler.json(data);
    }

    getPrefecture() {
        return Prefecture.findOne({
            attributes: ['id', 'name'],
            where: {
                id: this.params.prefecture_id,
            },
        })
    }
}
