import { Event } from "../../../domain/entities/event"
import { NetworkErrors } from "../../../domain/errors/network_errors"
import { IEventRepository } from "../../../domain/repositories/event_repository"

export class DeleteEvent{
    constructor(private readonly eventRepository: IEventRepository){
    }

    async delete(eventID: string): Promise<[NetworkErrors?, Event?]>{
        return await this.eventRepository.delete(eventID)
    }
    
}