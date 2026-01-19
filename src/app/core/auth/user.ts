export interface User {
    id: number,
    username: String,
    role: Role
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}