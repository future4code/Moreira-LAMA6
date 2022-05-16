import {Request, Response} from 'express';
import UserBusiness from '../business/UserBusiness';
import { UserInputDTO } from '../model/User';
import { LoginInputDTO } from '../model/User';

export default class UserController {
    
    constructor(private userBusiness: UserBusiness){}

    public signUp = async(req: Request, res:Response) => {
        const {name, email, password, role} = req.body

        const input: UserInputDTO = {
            name,
            email,
            password,
            role
        }
        try {
            const token = await this.userBusiness.signUp(input)
            res.status(201).send({message: "Usuário cadastrado com sucesso", token})
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no signup")
        }
    }

    public login = async(req:Request, res: Response) => {
        const {email, password} = req.body
        const input: LoginInputDTO = {
            email,
            password
        }

        try {
            const token = await this.userBusiness.login(input)
            res.status(200).send({message: "Login efetuado com sucesso", token})
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no login")
        }
    }
}