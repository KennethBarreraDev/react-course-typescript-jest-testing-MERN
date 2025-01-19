import mongoose from 'mongoose';
import { title } from 'process';
import { start } from 'repl';
const { Schema } = mongoose;

const eventSchema = new Schema({
    title: String,
    notes: {type: String, default:'' },
    start: Date,
    end: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const EventModel = mongoose.model('Event', eventSchema);