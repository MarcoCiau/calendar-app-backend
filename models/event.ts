import { Types, Schema, model, Document } from "mongoose";


interface Event {
    title: string,
    notes: string,
    userId: Types.ObjectId,
    start: Date,
    end: Date,
}

const eventSchema: Schema<Event> = new Schema({
    title: { type: String, required: true },
    notes: { type: String },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    start: {type: Date, required: true},
    end: {type: Date, required: true},
});

eventSchema.methods.toJSON = function () {
    const { __v, ...event } = this.toObject();
    return event;
}

const EventModel = model<Event>('Events', eventSchema);

export default EventModel;