import { BaseDatabase } from "./BaseDatabase";
import Show from "../model/Show";
import { ShowByDayResponse } from "../types/showByDayResponse";
import { BandByNameResponse } from "../types/bandByNameResponse";

export default class ShowsDatabase extends BaseDatabase {
    protected TABLE_NAME = "LAMA_SHOWS"
    protected TABLE_BANDS = "LAMA_BANDAS"

    insert = async(show: Show) => {
        try {
            await this
            .connection(this.TABLE_NAME)
            .insert(show)

        } catch (error) {
            throw new Error("Erro do banco.")
        }
    }

    findByDay = async(day: string) => {
        try {
            const queryResult: ShowByDayResponse = await this
            .connection(this.TABLE_NAME)
            .select("*")
            .where({week_day: day})
            return queryResult[0]
        } catch (error) {
            throw new Error("Erro ao buscar show no banco.")
        }
    }

    findByWeekDay = async(day: string) => {
        try {
            const queryResult: ShowByDayResponse = await this
            .connection(this.TABLE_NAME)
            .select("band_id")
            .where({week_day: day})
            .orderBy("start_time")
            return queryResult
        } catch (error) {
            throw new Error("Erro ao buscar show no banco.")
        }
    }

    showsByBands = async(bandId: string) => {
        try {
               const queryResult: BandByNameResponse = await this
               .connection(this.TABLE_BANDS)
               .select("*")
               .where({id: bandId})
               return queryResult[0]
           } catch (error) {
            throw new Error("Erro ao buscar shows no banco.")
        }
    }
}