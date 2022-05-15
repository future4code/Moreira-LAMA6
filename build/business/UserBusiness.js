"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDatabase_1 = __importDefault(require("../data/UserDatabase"));
const User_1 = __importDefault(require("../model/User"));
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const HashManager_1 = __importDefault(require("../services/HashManager"));
const IdGenerator_1 = __importDefault(require("../services/IdGenerator"));
class UserBusiness {
    constructor() {
        this.userData = new UserDatabase_1.default();
        this.idGenerator = new IdGenerator_1.default();
        this.authenticator = new Authenticator_1.default();
        this.hashManager = new HashManager_1.default();
        this.signUp = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = input;
            if (!name || !email || !password || !role) {
                throw new Error("Favor preencher todos os campos");
            }
            const registeredUser = yield this.userData.findByEmail(email);
            if (registeredUser) {
                throw new Error("Email já cadastrado");
            }
            const id = this.idGenerator.generateId();
            const hashPassword = yield this.hashManager.hash(password);
            const newUser = new User_1.default(id, name, email, hashPassword, User_1.default.stringToUserRole(role));
            yield this.userData.insert(newUser);
            const token = this.authenticator.generateToken({ id });
            return token;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            if (!email || !password) {
                throw new Error("Favor informar email e senha");
            }
            const registeredUser = yield this.userData.findByEmail(email);
            if (!registeredUser) {
                throw new Error("Este email não está cadastrado.");
            }
            const passwordIsCorrect = yield this.hashManager.compare(password, registeredUser.password);
            if (!passwordIsCorrect) {
                throw new Error("Email ou senha incorretos");
            }
            const token = this.authenticator.generateToken({ id: registeredUser.id });
            return token;
        });
    }
}
exports.default = UserBusiness;
