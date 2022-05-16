import UserDatabase from "../data/UserDatabase";
import User from "../model/User";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";
import { LoginInputDTO } from "../model/User";
import { UserInputDTO } from "../model/User";


export default class UserBusiness {
  // userData = new UserDatabase()
  // idGenerator = new IdGenerator()
  // authenticator = new Authenticator()
  // hashManager = new HashManager()

  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager
 ) { }

  signUp = async (input: UserInputDTO) => {
  
    const {name, email, password, role} = input

            
      if(!name || !email || !password || !role){
        throw new Error("Favor preencher todos os campos")
    }

    const registeredUser = await this.userDatabase.findByEmail(email)
      if(registeredUser){
        throw new Error("Email já cadastrado")
    }
    
    const id = this.idGenerator.generateId()
    const hashPassword = await this.hashManager.hash(password)

    const newUser = new User(id, name, email, hashPassword, User.stringToUserRole(role))
    await this.userDatabase.insert(newUser)

    const newRole = User.stringToUserRole(role)
    
    const token = this.authenticator.generateToken({id, role})
    return token
  }

  login = async (input: LoginInputDTO) => {
    const {email, password} = input
            
      if(!email || !password){
        throw new Error("Favor informar email e senha")
    }

    const registeredUser = await this.userDatabase.findByEmail(email)
    if(!registeredUser){
      throw new Error("Este email não está cadastrado.")
  }
    const passwordIsCorrect = await this.hashManager.compare(password, registeredUser.password)
    if(!passwordIsCorrect){
      throw new Error("Email ou senha incorretos")
    }

    const token = this.authenticator.generateToken({id: registeredUser.id, role: registeredUser.role})
    return token
  }
}