import { COMMOM_NETWORK_CODES } from "../../../domain/core/constants";
import { NetworkErrors } from "../../../domain/errors/network_errors";
import { validateEmailHelper } from "../../helpers/regex_helper";

interface LoginUserDTOptions{
    email: string,
    password: string
}

export class LoginUserDTO {
    readonly email: string;
    readonly password: string;

    constructor(options: LoginUserDTOptions) {
        this.email = options.email;
        this.password = options.password;
    }
    
    static create(body: {[key: string]: any}): [NetworkErrors?, LoginUserDTO?] {
        const {email, password} = body;

         if (!email || !validateEmailHelper(email)) {
            return [NetworkErrors.httpErrorResponse('Please insert a valid email', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } if (!password || password.length < 1) {
            return [NetworkErrors.httpErrorResponse('Password must be greater than zero', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        }

        return [undefined, new LoginUserDTO({email, password})];
    }
}
