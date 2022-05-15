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
const UserBusiness_1 = __importDefault(require("../business/UserBusiness"));
class UserController {
    constructor() {
        this.userBusiness = new UserBusiness_1.default();
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = req.body;
            const input = {
                name,
                email,
                password,
                role
            };
            try {
                const token = yield this.userBusiness.signUp(input);
                res.status(201).send({ message: "Usuário cadastrado com sucesso", token });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro no signup");
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const input = {
                email,
                password
            };
            try {
                const token = yield this.userBusiness.login(input);
                res.status(200).send({ message: "Login efetuado com sucesso", token });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro no login");
            }
        });
    }
}
exports.default = UserController;
