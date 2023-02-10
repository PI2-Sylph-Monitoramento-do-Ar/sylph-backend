export interface IPrevisionService {
    getPrevision(nextSixHourHistory: Array<number>): Promise<number | undefined>;
  }