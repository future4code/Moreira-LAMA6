import { UserRole } from "../model/User"

export type FindByEmailResponse = {
    id: string
    name: string
    email: string
    password: string
    role: UserRole
}[]