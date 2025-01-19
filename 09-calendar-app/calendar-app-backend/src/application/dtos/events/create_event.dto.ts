import { COMMOM_NETWORK_CODES } from "../../../domain/core/constants";
import { NetworkErrors } from "../../../domain/errors/network_errors";

interface CreateEventDTOptions{
    title: string,
    notes:string,
    start: Date,
    end: Date,
    user: string
}

export class CreateEventDTO {
     readonly title: string;
     readonly notes?:string;
     readonly start: Date;
     readonly end: Date;
     readonly user: string;

    constructor(options: CreateEventDTO) {
        this.title = options.title;
        this.notes = options.notes;
        this.start = options.start;
        this.end = options.end;
        this.user = options.user
    }
    
    static create(body: {[key: string]: any}): [NetworkErrors?, CreateEventDTO?] {
        const {title, notes, start, end, user} = body;

         if (!title) {
            return [NetworkErrors.httpErrorResponse('Please insert a valid title', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } 
        if (!user) {
            return [NetworkErrors.httpErrorResponse('Please insert a valid user', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } 
        if (!start) {
            return [NetworkErrors.httpErrorResponse('Invalid event start date', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } 
        if (!end) {
            return [NetworkErrors.httpErrorResponse('Invalid event end date', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } 

        return [undefined, new CreateEventDTO({title, notes, start, end, user})];
    }
}
