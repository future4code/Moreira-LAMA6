/**
 * Teste 1: Erro que deve retornar quando o nome está vazio
 * Teste 2: Erro que deve retornar quando o email é inválido
 * Teste 3: Erro que deve retornar quando a senha é inválida
 * Teste 4: Erro que deve retornar quando o tipo de usuário é inválido
 * Teste 5: Sucesso no cadastro e verificação do token de acesso 
 */


import  UserBusiness  from "../src/business/UserBusiness"
import { CustomError } from "../src/errors/CustomError"
import { HashManagerMock } from "./mocks/hashManagerMock"
import { IdGeneratorMock } from "./mocks/idGeneratorMock"
import { UserDatabaseMock } from "./mocks/userDatabaseMock"
import { AuthenticatorMock } from "./mocks/authenticatorMock"
import { LoginInputDTO, UserInputDTO } from "../src/model/User"

const userBusinessMock = new UserBusiness(
    new UserDatabaseMock() as any,
    new IdGeneratorMock(),
    new AuthenticatorMock(),
    new HashManagerMock()
)

describe("Teste de signUp", () => {
    test("Erro que deve retornar quando o nome está vazio", async () => {
        expect.assertions
        try {
            const input1: UserInputDTO = {
                name:"",
                email: "olivia@lab.com",
                password: "olivia123",
                role: "ADMIN"
            }
            await userBusinessMock.signUp(input1)
        } catch (error) {
            //422, "Missing input"
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Missing input")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })
    test("Erro que deve retornar quando o email é inválido", async () => {
        expect.assertions
        try {
            const input2: UserInputDTO = {
                name:"Olivia",
                email: "olivia@lab.com",
                password: "olivia123",
                role: "ADMIN"
            }
            await userBusinessMock.signUp(input2)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid email")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })
    test("Erro que deve retornar quando a senha é inválida", async () => {
        expect.assertions
        try {
            const input3: UserInputDTO = {
                name:"Thor",
                email: "thor@lab.com",
                password: "12345",
                role: "ADMIN"
            }
            await userBusinessMock.signUp(input3)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid password")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })
    test("Erro que deve retornar quando o tipo de usuário é inválido", async () => {
        expect.assertions
        try {
            const input4: UserInputDTO = {
                name:"Thor",
                email: "thor@lab.com",
                password: "thor123",
                role: "adm"
            }
            await userBusinessMock.signUp(input4)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid user role")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })
    test("Sucesso no cadastro e verificação do token de acesso", async () => {
        expect.assertions
        try {
            const input5: UserInputDTO = {
                name:"Thor",
                email: "thor@lab.com",
                password: "hor123",
                role: "ADMIN"
            }
            const accessToken = await userBusinessMock.signUp(input5)
            expect(accessToken).toEqual({
                "accessToken": "token_mockado"
            })
        } catch (error) {
            console.log(error)
        }
    })
})

/**
 * Teste 1: Erro que deve retornar quando o email fornecido não existe 
 * Teste 2: Erro que deve retornar quando a senha está errada
 * Teste 3: Sucesso no login e verificação do token de acesso
 */

describe("Teste de login", () => {
    test("Erro que deve retornar quando o email fornecido não existe", async () => {
        expect.assertions
        try {
            const loginInput1: LoginInputDTO = {
                email:"pimpa@lab.com",
                password: "olivia123"
            }
            await userBusinessMock.login(loginInput1)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid credentials")
                expect(error.statusCode).toEqual(401)
            } else {
                console.log(error)
            }
        }
    })
    test("Erro que deve retornar quando a senha está errada", async () => {
        expect.assertions
        try {
            const loginInput2: LoginInputDTO = {
                email:"olivia@lab.com",
                password: "olivia321"
            }
            await userBusinessMock.login(loginInput2)
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid credentials")
                expect(error.statusCode).toEqual(401)
            } else {
                console.log(error)
            }
        }
    })
    test("Sucesso no login e verificação do token de acesso", async () => {
        expect.assertions
        try {
            const loginInput3: LoginInputDTO = {
                email:"olivia@lab.com",
                password: "olivia123"
            }
            const result = await userBusinessMock.login(loginInput3)
            expect(result).toEqual({ "accessToken": "token_mockado" })
        } catch (error) {
            console.log(error)
        }
    })
})