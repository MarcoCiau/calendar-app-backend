import EventModel from "../models/event";
export const executeEventCustomQuery = (query: string, from: number = 0, limit: number = 5, sort: number = 1) => {
    return new Promise((resolve, reject) => {
        let queryObj:object = {};
        if (query === "") {
            reject({error: "invalid query object"});
        }
        queryObj = {...JSON.parse(query)};
        EventModel.find(queryObj)
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