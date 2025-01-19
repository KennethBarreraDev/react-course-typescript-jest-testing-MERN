import { Event } from "../entities/event";
import { NetworkErrors } from "../errors/network_errors";

export interface IEventRepository{
    createEvent: (event: Event)=>Promise<[NetworkErrors?, Event?]>,
    updateEvent: (eventID: string, event: Event)=>Promise<[NetworkErrors?, Event?]>,
    delete: (eventID: string)=>Promise<[NetworkErrors?, Event?]>,
    getEvent: (eventID: string)=>Promise<[NetworkErrors?, Event?]>,
    listEvents: ()=>Promise<[NetworkErrors?, Event[]?]>
}