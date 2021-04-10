import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { PARAMETER_INVALID, NO_DATA_EXISTS } from '../../constants/error';
import { Area } from '../../models/index';

type Params = {
    id: number
}

export class GetAreaById {
    handler: Handler
    params: Params

    constructor(req: Request, res: Response) {
        this.handler = new Handler(req, res);
        this.params = {
            id: Number(req.params.id),
        }
    }

    async main() {
        if (!this.params.id) {
            return this.handler.error(PARAMETER_INVALID);
        }
        
        const data = await this.getArea();

        if (!data) {
            return this.handler.error(NO_DATA_EXISTS);
        }

        return this.handler.json(data);
    }

    getArea() {
        return Area.findOne({
            where: {
                id: this.params.id,
            },
        })
    }
}
