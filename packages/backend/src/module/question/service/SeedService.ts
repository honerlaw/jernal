import { Injectable } from "@nestjs/common";
import { createConnection } from "typeorm";
import * as ormConfig from '../../../../ormconfig.json'
import { SeedQuestions1599525875577 } from "../../../migration/1599525875577-SeedQuestions"
import { AppEntities } from "../../../module/AppEntities";

@Injectable()
export class SeedService {

    public async seed(): Promise<void> {
        const conn = await createConnection({
            ...ormConfig,
            entities: AppEntities,
            name: "seed-service",
            migrations: [SeedQuestions1599525875577]
        })

        await conn.runMigrations({
            transaction: "all"
        })

        await conn.close()
    }

}
