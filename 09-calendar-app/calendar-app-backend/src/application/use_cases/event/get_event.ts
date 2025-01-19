import { Event } from "../../../domain/entities/event"
import { NetworkErrors } from "../../../domain/errors/network_errors"
import { IEventRepository } from "../../../domain/repositories/event_repository"

export class GetEvent{
    constructor(private readonly eventRepository: IEventRepository){
    }

    async getEvent(eventID: string): Promise<[NetworkErrors?, Event?]>{
        return await this.eventRepository.getEvent(eventID)
    }
    
}