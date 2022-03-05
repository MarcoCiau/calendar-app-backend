# API Documentation

Calendar-API allows us to create events tasks  which can be in the state of completed or not completed.

Also we can create a 'blocked-hour event tasks', this means that no events can be created at this specified hour.

## Open Endpoints

Open endpoints require no JWT Authentication.

* [User Register](auth/signup.md) : `POST /api/v1/auth/signup`
* [User Login](auth/signin.md) : `POST /api/v1/auth/signin`

## Endpoints that require Authentication

Closed endpoints require a valid Bearer Token to be included in the header of the
request. 

### Events

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Create an event](event/createOne.md) : `POST /api/v1/event`
* [Get all events](event/getAll.md) : `GET /api/v1/event`
* [Get events from a range of date ](event/getAllDay.md) : `GET /api/v1/event/range`
* [Get an event](event/getOne.md) : `GET /api/v1/event/:id`
* [Update an event status](event/updateOne.md) : `PUT /api/v1/event/:id`
* [Delete an event](event/deleteOne.md) : `DELETE /api/v1/event/:id`

### Block Events

When the user wants to block some date-hour in the calendar, this api will create a default event setting the `enabled` value to `false`.

* [Create a block event](event/createOneBlockedEvent.md) : `POST /api/v1/event/block`
* [Delete a block event](event/deleteBlockEvent.md) : `GET /api/v1/event/block/:id`