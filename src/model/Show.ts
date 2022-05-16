export default class Show{
    constructor(
    private id: string,
    private week_day: WeekDay,
    private start_time: number,
    private end_time: number,
    private band_id: string
    ){}

    getId(){
        return this.id;
    }

    getWeekDay(){
        return this.week_day
    }

    getStartTime(){
        return this.start_time
    }

    getEndTime(){
        return this.end_time
    }

    getBandId(){
        return this.band_id
    }

    setId(id: string){
        this.id = id;
    }

    static stringToWeekDayRole(input: string): WeekDay{
        switch (input) {
            case "SEXTA":
              return WeekDay.SEXTA;
            case "SABADO":
              return WeekDay.SABADO;
            case "DOMINGO":
              return WeekDay.DOMINGO;
            default:
              throw new Error("Invalid user role");
          }
    }

    static toUserModel(show: any): Show {
        return new Show(show.id, Show.stringToWeekDayRole(show.week_day), show.start_time, show.end_time,show.band_id);
      }
}

export interface ShowInputDTO{
    week_day: string;
    start_time: number;
    end_time: number;
    band_id: string;
}

export enum WeekDay{
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}