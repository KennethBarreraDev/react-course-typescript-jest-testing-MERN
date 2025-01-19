import { COMMOM_NETWORK_CODES } from "../../../domain/core/constants";
import { NetworkErrors } from "../../../domain/errors/network_errors";
import { EncrytpPasswordService } from "../../../infraestructure/helpers/encrypt_password_service";
import { validateEmailHelper } from "../../helpers/regex_helper";

interface CreateUserDTOptions{
    name: string,
    email: string,
    password: string
}

export class CreateUserDTO {
    readonly name: string;
    readonly email: string;
    readonly password: string;

    constructor(options: CreateUserDTOptions) {
        this.name = options.name;
        this.email = options.email;
        this.password = options.password;
    }
    
     static async create(body: {[key: string]: any}, encriyptPasswordService: EncrytpPasswordService): Promise<[NetworkErrors?, CreateUserDTO?]> {
        const {name, email, password} = body;
        if (!name) {
            return [NetworkErrors.httpErrorResponse('Please insert a valid name', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } if (!email || !validateEmailHelper(email)) {
            return [NetworkErrors.httpErrorResponse('Please insert a valid email', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } if (!password || password.length < 1) {
            return [NetworkErrors.httpErrorResponse('Password must be greater than zero', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        }

        const hashedPassword = await encriyptPasswordService.encryptPassword(password)
        return [undefined, new CreateUserDTO({name, email, password: hashedPassword})];
    }
}
