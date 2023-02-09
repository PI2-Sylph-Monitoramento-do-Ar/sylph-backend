import { HttpsAdapterType } from "_/adapters/http-adapters";
import { IPrevisionService } from "_/types";

export class PrevisionService implements IPrevisionService {
    private static instance: PrevisionService;
    constructor(
        private readonly api: HttpsAdapterType,
    ) { }

    public static getInstance(api?: HttpsAdapterType){
        if(!PrevisionService.instance){
            PrevisionService.instance = new PrevisionService(api);
        }
        return PrevisionService.instance;
    }

    async getPrevision(nextSixHourHistory: Array<number>) {
        const response = await this.api.post('/prediction', {hour_history: nextSixHourHistory})
        return response as number;
    }
}