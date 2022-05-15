import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";
import BandDatabase from "../data/BandDatabase"
import Band, { BandInputDTO } from "../model/Band";


export default class BandBusiness {
  bandData = new BandDatabase()
  idGenerator = new IdGenerator()
  authenticator = new Authenticator()

  createBand = async (input: BandInputDTO, token: string) => {
  
    const {name, music_genre, responsible} = input

            
      if(!name || !music_genre || !responsible){
        throw new Error("Favor preencher todos os campos")
    }

    const registeredUser = await this.bandData.findByName(name)
      if(registeredUser){
        throw new Error("Banda já cadastrada")
    }

    const tokenData = this.authenticator.getTokenData(token)
      if(!tokenData){
         throw new Error("Token inválido ou não passado")
      }
      if(tokenData.role!=="ADMIN"){
         throw new Error("usuário não autorizado")
      }

    
    const id = this.idGenerator.generateId()

    const newBand = new Band(id, name, music_genre, responsible)
    await this.bandData.insert(newBand)
    
    return newBand
  }

  getBand = async(input:string) => {
      const nomeOuId = input

      if(!nomeOuId){
        throw new Error("Favor informar nome ou id da banda")
    }

    const registeredUserName = await this.bandData.findByName(nomeOuId)
    const registeredUserId = await this.bandData.findById(nomeOuId)
      if(!registeredUserName && !registeredUserId){
        throw new Error("Banda não encontrada")
    } else if (registeredUserName){
        return registeredUserName
    } else if (registeredUserId) {
        return registeredUserId
    }
  }
}