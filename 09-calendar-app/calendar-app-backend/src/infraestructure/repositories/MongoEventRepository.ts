import { COMMOM_NETWORK_CODES } from "../../domain/core/constants";
import { Event } from "../../domain/entities/event";
import { NetworkErrors } from "../../domain/errors/network_errors";
import { IEventRepository } from "../../domain/repositories/event_repository";
import { EventModel } from "../database/mongoose/schemas/event_schema";

export class MongoEventRepository implements IEventRepository {
  createEvent = async (event: Event): Promise<[NetworkErrors?, Event?]> => {
    try {
      const newEvent = new EventModel({
        title: event.title,
        start: event.start,
        end: event.end,
        notes: event.notes,
        user: event.userOwner,
      });

      await newEvent.save();

      return [
        undefined,
        new Event(
          newEvent.id,
          event.title,
          event.start,
          event.end,
          event.notes,
          event.userOwner
        ),
      ];
    } catch (error) {
      return [
        NetworkErrors.httpErrorResponse(
          "Error creating event",
          COMMOM_NETWORK_CODES.BAD_REQUEST
        ),
        undefined,
      ];
    }
  };

  updateEvent = async (
    eventID: string,
    event: Event
  ): Promise<[NetworkErrors?, Event?]> => {
    try {
      const existingEvent = await EventModel.findById(eventID);

      if (!existingEvent) {
        return [
          NetworkErrors.httpErrorResponse(
            "Event not found",
            COMMOM_NETWORK_CODES.BAD_REQUEST
          ),
          undefined,
        ];
      }

      existingEvent.title = event.title;
      existingEvent.start = event.start;
      existingEvent.end = event.end;
      existingEvent.notes = event.notes ?? "";

      await existingEvent.save();

      return [
        undefined,
        new Event(
          existingEvent.id,
          event.title,
          event.start,
          event.end,
          event.notes,
          existingEvent.user?.toString()
        ),
      ];
    } catch (error) {
      return [
        NetworkErrors.httpErrorResponse(
          "Error updating event",
          COMMOM_NETWORK_CODES.BAD_REQUEST
        ),
        undefined,
      ];
    }
  };

  delete = async (eventID: string): Promise<[NetworkErrors?, Event?]> => {
    try {
      const existingEvent = await EventModel.findById(eventID).populate("user");

      if (!existingEvent) {
        return [
          NetworkErrors.httpErrorResponse(
            "Event not found",
            COMMOM_NETWORK_CODES.BAD_REQUEST
          ),
          undefined,
        ];
      }

      await EventModel.deleteOne({ _id: eventID });

      return [
        undefined,
        new Event(
          existingEvent.id,
          existingEvent.title!,
          existingEvent.start!,
          existingEvent.end!,
          existingEvent.notes,
          existingEvent.user?.id?.toString()
        ),
      ];
    } catch (error) {
      return [
        NetworkErrors.httpErrorResponse(
          "Error deleting event",
          COMMOM_NETWORK_CODES.BAD_REQUEST
        ),
        undefined,
      ];
    }
  };

  getEvent = async (eventID: string): Promise<[NetworkErrors?, Event?]> => {
    try {
      const existingEvent = await EventModel.findById(eventID).populate("user");

      if (!existingEvent) {
        return [
          NetworkErrors.httpErrorResponse(
            "Event not found",
            COMMOM_NETWORK_CODES.BAD_REQUEST
          ),
          undefined,
        ];
      }

      return [
        undefined,
        new Event(
          existingEvent.id,
          existingEvent.title!,
          existingEvent.start!,
          existingEvent.end!,
          existingEvent.notes,
          existingEvent.user?.id?.toString()
        ),
      ];
    } catch (error) {
      return [
        NetworkErrors.httpErrorResponse(
          "Error fetching event",
          COMMOM_NETWORK_CODES.BAD_REQUEST
        ),
        undefined,
      ];
    }
  };

  listEvents = async (): Promise<[NetworkErrors?, Event[]?]> => {
    try {
      const events = await EventModel.find({}).populate("user");

      return [
        undefined,
        events.map(
          (event) =>
            new Event(
              event.id,
              event.title!,
              event.start!,
              event.end!,
              event.notes,
              event.user?.id?.toString()
            )
        ),
      ];
    } catch (error) {
      return [
        NetworkErrors.httpErrorResponse(
          "Error listing events",
          COMMOM_NETWORK_CODES.BAD_REQUEST
        ),
        undefined,
      ];
    }
  };
}
