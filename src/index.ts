import UserBusiness from './business/UserBusiness';
import { app } from './controller/app';
import BandController from './controller/BandController';
import ShowsController from './controller/ShowsController';
import UserController from './controller/UserController';
import UserDatabase from './data/UserDatabase';
import Authenticator from './services/Authenticator';
import HashManager from './services/HashManager';
import IdGenerator from './services/IdGenerator';

const userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new Authenticator(),
    new HashManager()
)
const userController = new UserController(userBusiness)
const bandController = new BandController()
const showController = new ShowsController()

app.post("/users/signup", userController.signUp)
app.post("/users/login", userController.login)

app.get("/band/:nomeOuId", bandController.getBand)
app.post("/band/create", bandController.createBand)

app.get("/show/:weekday", showController.getShows)
app.post("/show/create", showController.createShow)
