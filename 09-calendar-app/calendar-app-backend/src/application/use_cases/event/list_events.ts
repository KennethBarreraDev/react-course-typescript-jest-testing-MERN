import { Event } from "../../../domain/entities/event"
import { NetworkErrors } from "../../../domain/errors/network_errors"
import { IEventRepository } from "../../../domain/repositories/event_repository"

export class ListEvents{
    constructor(private readonly eventRepository: IEventRepository){
    }

    async list(): Promise<[NetworkErrors?, Event[]?]>{
        return await this.eventRepository.listEvents()
    }
    
}