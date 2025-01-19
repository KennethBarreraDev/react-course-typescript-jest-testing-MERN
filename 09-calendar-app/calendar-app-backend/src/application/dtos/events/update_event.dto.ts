import { COMMOM_NETWORK_CODES } from "../../../domain/core/constants";
import { NetworkErrors } from "../../../domain/errors/network_errors";

interface UpdateEventDTOptions{
    title: string,
    notes:string,
    start: Date,
    end: Date,
}

export class UpdateEventDTO {
     readonly title: string;
     readonly notes?:string;
     readonly start: Date;
     readonly end: Date;

    constructor(options: UpdateEventDTO) {
        this.title = options.title;
        this.notes = options.notes;
        this.start = options.start;
        this.end = options.end;
    }
    
    static create(eventID: string, body: {[key: string]: any}): [NetworkErrors?, UpdateEventDTO?] {
        const {title, start, end, notes} = body;

        if (!eventID) {
            return [NetworkErrors.httpErrorResponse('Invalid event ID', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        }
         if (!title) {
            return [NetworkErrors.httpErrorResponse('Please insert a valid title', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } 
        if (!start) {
            return [NetworkErrors.httpErrorResponse('Invalid event start date', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } 
        if (!end) {
            return [NetworkErrors.httpErrorResponse('Invalid event end date', COMMOM_NETWORK_CODES.BAD_REQUEST), undefined];
        } 

        return [undefined, new UpdateEventDTO({title, notes, start, end})];
    }
}
