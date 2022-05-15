import { BaseDatabase } from "./BaseDatabase";
import Band from "../model/Band";
import { BandByNameResponse } from "../types/bandByNameResponse";

export default class BandDatabase extends BaseDatabase {
    protected TABLE_NAME = "LAMA_BANDAS"

    insert = async(banda: Band) => {
        try {
            await this
            .connection(this.TABLE_NAME)
            .insert(banda)

        } catch (error) {
            throw new Error("Erro do banco.")
        }
    }

    findByName = async(name: string) => {
        try {
            const queryResult: BandByNameResponse = await this
            .connection(this.TABLE_NAME)
            .select("*")
            .where({name})
            return queryResult[0]
        } catch (error) {
            throw new Error("Erro ao buscar banda no banco.")
        }
    }

    findById = async(id: string) => {
        try {
            const queryResult: BandByNameResponse = await this
            .connection(this.TABLE_NAME)
            .select("*")
            .where({id})
            return queryResult[0]
        } catch (error) {
            throw new Error("Erro ao buscar banda no banco.")
        }
    }
}