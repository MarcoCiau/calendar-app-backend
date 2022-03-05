import EventModel from "../models/event";
export const executeEventCustomQuery = (userId: string, from: number = 0, limit: number = 5, sort: number = 1) => {
    return new Promise((resolve, reject) => {
        EventModel.find({userId})
            .populate('user', 'name')
            .skip(from)
            .limit(limit)
            .sort({ start: sort })
            .exec(function (err, events) {
                if (err) {
                    console.log("Error while querying reads collection!");
                    reject(err);
                };
                resolve(events);
            });

    });
}