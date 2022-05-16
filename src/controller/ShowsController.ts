import {Request, Response} from 'express';
import { ShowInputDTO } from '../model/Show';
import ShowsBusiness from '../business/ShowsBusiness'

export default class ShowsController {
    showsBusiness = new ShowsBusiness()

    createShow = async(req: Request, res:Response) => {
        const {week_day, start_time, end_time, band_id} = req.body
        const token = req.headers.authorization as string

        const input: ShowInputDTO = {
            week_day,
            start_time,
            end_time,
            band_id
        }
        try {
            const show = await this.showsBusiness.createShow(input, token)
            res.status(201).send({message: "Show cadastrado com sucesso", show})
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no signup")
        }
    }

    getShows = async(req: Request, res: Response) => {
        const weekDay = req.params.weekday as string
        try {
            const shows = await this.showsBusiness.getShowsByDay(weekDay)
            console.log(shows)
            res.status(200).send(shows)
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro na busca")
        }
    }
}