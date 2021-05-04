import { Request, Response } from 'express';
import { Handler } from '../../core/handler';
import { PARAMETER_INVALID, NO_DATA_EXISTS } from '../../constants/error';
import { Gpslog, User, Area } from '../../models/index';

type Params = {
    id: number
}

export class GetGpslogById {
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

        const data = await this.getGpslog();

        if (!data) {
            return this.handler.error(NO_DATA_EXISTS);
        }

        return this.handler.json(data);
    }

    getGpslog() {
        return Gpslog.findOne({
            where: {
                id: this.params.id,
            },
            include: [
                User,
                Area,
            ]
        })
    }
}
