import { HttpsAdapterType } from "_/adapters/http-adapters";
import { IPrevisionService } from "_/types";

export class PrevisionService implements IPrevisionService {
    private static instance: PrevisionService;
    constructor(
        private readonly api: HttpsAdapterType,
    ) { }

    async getPrevision(nextSixHourHistory: Array<number>) {
        const response = await this.api.post('/prediction', {hour_history: nextSixHourHistory})
        console.log(`response: ${response}`)
        return response as number;
    }
}