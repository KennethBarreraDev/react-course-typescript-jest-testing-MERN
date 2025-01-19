import { User } from "../entities/user";
import { NetworkErrors } from "../errors/network_errors";

type UserCredentials = {
    email: string, 
    password: string
}

export interface IUserRepository{
    createUser: (user: User) => Promise<[NetworkErrors?, User?]>
    loginUser: (UserCredentials: UserCredentials) => Promise<[NetworkErrors?, User?]>
}