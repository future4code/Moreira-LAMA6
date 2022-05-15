import {Request, Response} from 'express';
import BandBusiness from '../business/BandBusiness';
import { BandInputDTO } from '../model/Band';

export default class BandController {
    bandBusiness = new BandBusiness()

    createBand = async(req: Request, res:Response) => {
        const {name, music_genre, responsible} = req.body
        const token = req.headers.authorization as string

        const input: BandInputDTO = {
            name,
            music_genre,
            responsible
        }
        try {
            const banda = await this.bandBusiness.createBand(input, token)
            res.status(201).send({message: "Banda cadastrada com sucesso", banda})
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no signup")
        }
    }

    getBand = async(req: Request, res: Response) => {
        const input = req.params.nomeOuId as string
        try {
            const banda = await this.bandBusiness.getBand(input)
            res.status(200).send({banda})
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no signup")
        }
    }
}