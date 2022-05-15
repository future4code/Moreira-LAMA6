export default class Band{
    constructor(
    private id: string,
    private name: string,
    private music_genre: string,
    private responsible: string
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getGenre(){
        return this.music_genre;
    }

    getResponsible(){
        return this.responsible;
    }

    setId(id: string){
        this.id = id;
    }
}

export interface BandInputDTO{
    name: string;
    music_genre: string;
    responsible: string;
}