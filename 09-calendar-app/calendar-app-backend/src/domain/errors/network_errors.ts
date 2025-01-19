import { COMMOM_NETWORK_CODES } from "../core/constants";

export class NetworkErrors{
    constructor(public readonly message: string, public readonly code: COMMOM_NETWORK_CODES){}

    static httpErrorResponse(message: string, code: COMMOM_NETWORK_CODES): NetworkErrors {
        return new NetworkErrors(message, code);
    }
}