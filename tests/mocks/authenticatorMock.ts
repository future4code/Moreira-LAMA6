import { UserRole } from "../../src/model/User";
import { authenticationData } from '../../src/types/authData'

export class AuthenticatorMock {  
    public generateToken = (input: authenticationData): string => {
      return "token_mockado";
    };
  
    public getTokenData(token: string) {
      return{ 
          id: "id_mockado",
          role: UserRole.NORMAL
      }
    }
  }