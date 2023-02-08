import { Measurement } from "_/models";

export type FindMeasurementQuery  = Partial<Measurement>
export type GetCsvParams = { totem_id: string }
export type GetLatestMeasurementsParams = { totem_id: string } 