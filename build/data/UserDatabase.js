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
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "LAMA_USERS";
        this.insert = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this
                    .connection(this.TABLE_NAME)
                    .insert(user);
            }
            catch (error) {
                throw new Error("Erro do banco.");
            }
        });
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this
                    .connection(this.TABLE_NAME)
                    .select("*")
                    .where({ email: email });
                return queryResult[0];
            }
            catch (error) {
                throw new Error("Erro ao buscar usuário no banco.");
            }
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this
                    .connection(this.TABLE_NAME)
                    .select("*")
                    .where({ id });
                return queryResult[0];
            }
            catch (error) {
                throw new Error("Erro ao buscar usuário no banco.");
            }
        });
    }
}
exports.default = UserDatabase;
