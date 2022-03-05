import { Request, Response } from 'express';
import EventModel from '../models/event';
import UserModel from '../models/user';
import { executeEventCustomQuery } from '../util/db.queries';
import { ServerResponse } from '../util/server.response';

export const getEvents = async (req: Request, res: Response) => {
    try {
        const { from = 0, limit = 5, sort = 1 } = req.query;
        const { userId } = res.locals.jwtPayload;
        const events: any = await executeEventCustomQuery(userId, Number(from), Number(limit), Number(sort));
        if (!events) {
            res.status(400).json({ status: false, msg: ServerResponse.ERROR_DB_QUERY_FAILED })
        }
        res.json({ status: true, msg: ServerResponse.OK_PROCESS, count: events.length, events });
    } catch (error) {
        console.log('Get all Reads failed.', error);
        res.status(500).json({ status: false, msg: ServerResponse.ERROR_INTERNAL_SERVER })
    }
}

export const getEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await EventModel.findOne({ _id: id }).populate('user', 'name');
        if (!result) {
            return res.status(400).json({ status: false, msg: ServerResponse.ERROR_EVENT_NOT_FOUND});
        }
        res.status(200).json({ status: true, msg: ServerResponse.OK_PROCESS, event: result });
    } catch (error) {
        console.log('Get client failed.', error);
        res.status(500).json({ status: false, msg: ServerResponse.ERROR_INTERNAL_SERVER })
    }
}

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.jwtPayload;
        const userExists = await UserModel.findOne({ _id: userId });
        if (!userExists) return res.status(400).json({ status: false, msg: ServerResponse.ERROR_USER_NOT_FOUND });
        const newEvent = new EventModel({
            user: userId,
            ...req.body
        });
        const result = await (await newEvent.save()).populate('user', 'name');
        if (!result) return res.status(400).json({ status: false, msg: ServerResponse.ERROR_DB_QUERY_FAILED });
        res.status(200).json({ status: true, msg: ServerResponse.OK_PROCESS, event: result });
    } catch (error) {
        console.log('Create Device failed.', error);
        res.status(500).json({ status: false, msg: ServerResponse.ERROR_INTERNAL_SERVER })
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const result = await EventModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true }).populate('user', 'name');
        if (!result) {
            return res.status(400).json({ status: false, msg: ServerResponse.ERROR_EVENT_NOT_FOUND });
        }
        res.status(200).json({ status: true, msg: ServerResponse.OK_PROCESS, event: result });
    } catch (error) {
        console.log('update device failed.', error);
        res.status(500).json({ status: false, msg: ServerResponse.ERROR_INTERNAL_SERVER});
    }
}

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await EventModel.findByIdAndDelete({ _id: id }).populate('user', 'name');
        if (!result) {
            return res.status(400).json({ status: false, msg: ServerResponse.ERROR_EVENT_NOT_FOUND });
        }
        res.status(200).json({ status: true, msg: ServerResponse.OK_PROCESS, event: result });
    } catch (error) {
        console.log('Delete Read failed.', error);
        res.status(500).json({ status: false, msg: ServerResponse.ERROR_INTERNAL_SERVER });
    }
}