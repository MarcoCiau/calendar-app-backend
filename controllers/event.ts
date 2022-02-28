import { Request, Response } from 'express';
import EventModel from '../models/event';
import UserModel from '../models/user';
import { executeEventCustomQuery } from '../util/db.queries';

export const getEvents = async (req: Request, res: Response) => {
    try {
        const { query = "", from = 0, limit = 5, sort = 1 } = req.query;
        const events: any = await executeEventCustomQuery(query.toString(), Number(from), Number(limit), Number(sort));
        if (!events) {
            res.status(400).json({ status: false, msg: 'Get all Reads failed.', })
        }
        res.json({ status: true, msg: 'success', count: events.length, events });
    } catch (error) {
        console.log('Get all Reads failed.', error);
        res.status(500).json({ status: false, msg: 'something went wrong.', error })
    }
}

export const getEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await EventModel.findOne({ _id: id }).populate('user', 'name');
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Event doesn\'t exists' });
        }
        res.status(200).json({ status: true, msg: 'success', event: result });
    } catch (error) {
        console.log('Get client failed.', error);
        res.status(500).json({ status: false, msg: 'something went wrong.' })
    }
}

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.jwtPayload;
        const userExists = await UserModel.findOne({ _id: userId });
        if (!userExists) return res.status(400).json({ status: false, msg: 'Invalid User' });
        const newEvent = new EventModel({
            user: userId,
            ...req.body
        });
        const result = await (await newEvent.save()).populate('user', 'name');
        if (!result) return res.status(400).json({ status: false, msg: 'Creating new event failed' });
        res.status(200).json({ status: true, msg: 'success', event: result });
    } catch (error) {
        console.log('Create Device failed.', error);
        res.status(500).json({ status: false, msg: 'something went wrong.' })
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const result = await EventModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true }).populate('user', 'name');
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Updating Event failed' });
        }
        res.status(200).json({ status: true, msg: 'success', event: result });
    } catch (error) {
        console.log('update device failed.', error);
        res.status(500).json({ status: false, msg: 'something went wrong.' });
    }
}

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await EventModel.findByIdAndDelete({ _id: id }).populate('user', 'name');
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Event doesn\'t exists' });
        }
        res.status(200).json({ status: true, msg: 'success', event: result });
    } catch (error) {
        console.log('Delete Read failed.', error);
        res.status(500).json({ status: false, msg: 'something went wrong.' });
    }
}