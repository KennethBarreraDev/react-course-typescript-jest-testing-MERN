import { Event } from "../../../domain/entities/event"
import { NetworkErrors } from "../../../domain/errors/network_errors"
import { IEventRepository } from "../../../domain/repositories/event_repository"
import { UpdateEventDTO } from "../../dtos/events/update_event.dto"

export class UpdateEvent{
    constructor(private readonly eventRepository: IEventRepository){
    }

    async update(eventID: string, eventInfo: UpdateEventDTO): Promise<[NetworkErrors?, Event?]>{
        const {title, notes, start, end} = eventInfo
        return await this.eventRepository.updateEvent(eventID, new Event("",title, start, end, notes, undefined))
    }
    
}