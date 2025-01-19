import { Event } from "../../../domain/entities/event"
import { NetworkErrors } from "../../../domain/errors/network_errors"
import { IEventRepository } from "../../../domain/repositories/event_repository"
import { CreateEventDTO } from "../../dtos/events/create_event.dto"
export class CreateEvent{
    constructor(private readonly eventRepository: IEventRepository){
    }

    async create(eventInfo: CreateEventDTO): Promise<[NetworkErrors?, Event?]>{
        const {title, notes, start, end} = eventInfo
        return await this.eventRepository.createEvent(new Event("", title, start, end, notes, eventInfo.user))
    }
    
}