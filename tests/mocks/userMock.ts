import User, { UserRole } from "../../src/model/User";

export const userMock = new User(
    "id_mockado",
    "Olivia",
    "olivia@lab.com",
    "olivia123",
    UserRole.NORMAL
)

export const userMock2 = new User(
    "id_mockado2",
    "Thor",
    "thor@lab.com",
    "thor123",
    UserRole.ADMIN
)