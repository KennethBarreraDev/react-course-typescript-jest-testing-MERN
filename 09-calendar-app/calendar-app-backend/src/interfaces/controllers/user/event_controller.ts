import { Request, Response } from "express";
import { COMMOM_NETWORK_CODES } from "../../../domain/core/constants";
import { HttpResponse } from "../../../domain/basic_http_response/basic_http_response";
import { IEventRepository } from "../../../domain/repositories/event_repository";
import { CreateEventDTO } from "../../../application/dtos/events/create_event.dto";
import { CreateEvent } from "../../../application/use_cases/event/create_event";
import { UpdateEventDTO } from "../../../application/dtos/events/update_event.dto";
import { UpdateEvent } from "../../../application/use_cases/event/update_event";
import { DeleteEvent } from "../../../application/use_cases/event/delete_event";
import { GetEvent } from "../../../application/use_cases/event/get_event";
import { ListEvents } from "../../../application/use_cases/event/list_events";

export class EventController {
    constructor(private readonly eventRepository: IEventRepository) {
    }

    async create(req: Request, res: Response) {
        try {
            const [error, eventInfo] = CreateEventDTO.create(req.body);
            if (error) {
                res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
            }
            else if (eventInfo) {
                const [error, newEvent] = await new CreateEvent(this.eventRepository).create(eventInfo);
                if (error) {
                    res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
                }
                else if (newEvent) {
                    res.status(COMMOM_NETWORK_CODES.SUCCESS_CREATE).json(newEvent)
                }
            }
        } catch (error) {
            console.log(error);
            res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("Error creating event"))
        }
    }

    async update(req: Request, res: Response) {
        try {
            const eventId = req.params.id;
            const [error, eventInfo] = UpdateEventDTO.create(eventId, req.body);
            if (error) {
                res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
            }
            else if (eventInfo) {
                const [error, newEvent] = await new UpdateEvent(this.eventRepository).update(eventId, eventInfo);
                if (error) {
                    res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
                }
                else if (newEvent) {
                    res.status(COMMOM_NETWORK_CODES.SUCCESS_CREATE).json(newEvent)
                }
            }
        } catch (error) {
            console.log(error);
            res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("Error creating event"))
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const eventId = req.params.id;
            if (!eventId) {
                res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("Missing event ID"))
            }
            const [error, event] = await new DeleteEvent(this.eventRepository).delete(eventId);
            if (error) {
                res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
            }
            else if (event) {
                res.status(COMMOM_NETWORK_CODES.SUCCESS_CREATE).json(event)
            }
        } catch (error) {
            console.log(error);
            res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("Error deleting event"))
        }
    }


    async get(req: Request, res: Response) {
        try {
            const eventId = req.params.id;
            if (!eventId) {
                res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("Missing event ID"))
            }
            const [error, event] = await new GetEvent(this.eventRepository).getEvent(eventId);
            if (error) {
                res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
            }
            else if (event) {
                res.status(COMMOM_NETWORK_CODES.SUCCESS_CREATE).json(event)
            }
        } catch (error) {
            console.log(error);
            res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("Error fetching event"))
        }
    }

    async list(req: Request, res: Response) {
        try {
            const [error, allEvent] = await new ListEvents(this.eventRepository).list();
            if (error) {
                res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(error)
            }
            else if (allEvent) {
                res.status(COMMOM_NETWORK_CODES.SUCCESS_CREATE).json(allEvent)
            }
        } catch (error) {
            console.log(error);
            res.status(COMMOM_NETWORK_CODES.BAD_REQUEST).json(new HttpResponse("Error fetching events"))
        }
    }


}