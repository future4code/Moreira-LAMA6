import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";
import ShowsDatabase from "../data/ShowsDatabase";
import Show, { ShowInputDTO } from "../model/Show";


export default class ShowsBusiness {
  showsData = new ShowsDatabase()
  idGenerator = new IdGenerator()
  authenticator = new Authenticator()

  createShow = async (input: ShowInputDTO, token: string) => {
  
    const {week_day, start_time, end_time, band_id} = input

            
      if(!week_day || !start_time || !end_time || !band_id){
        throw new Error("Favor preencher todos os campos")
    }

    if(start_time < 8){
        throw new Error("Horário inválido, favor inserir horário compatível com o início do evento.")
    } else if (end_time > 23){
        throw new Error("Horário inválido, favor inserir horário compatível com o final do evento.")
    }

    const registeredUser = await this.showsData.findByDay(week_day)
      if(start_time >= registeredUser.start_time && start_time < registeredUser.end_time){
        throw new Error("Horário já preenchido")
    } else if (!Number.isInteger(start_time) || !Number.isInteger(end_time)){
        throw new Error("Horário inválido.")
    }

    const tokenData = this.authenticator.getTokenData(token)
      if(!tokenData){
         throw new Error("Token inválido ou não passado")
      }
      if(tokenData.role!=="ADMIN"){
         throw new Error("usuário não autorizado")
      }

    
    const id = this.idGenerator.generateId()

    const newShow = new Show(id, Show.stringToWeekDayRole(week_day), start_time, end_time, band_id)
    await this.showsData.insert(newShow)
    
    return newShow
  }

  getShowsByDay = async(weekDay:string) => {

      if(!weekDay){
        throw new Error("Favor informar o dia")
    }
    const registeredShow = await this.showsData.findByWeekDay(weekDay)

    
    const shows = registeredShow && registeredShow.map(async(show) => {
        const result = await this.showsData.showsByBands(show.band_id)
        console.log(result)
        return result
    })

    return registeredShow
    }
}