# API Documentation

Calendar-Api allows us to create events tasks in our agenda. We can create, edit & update events.

## Public Endpoints

All endpoints that don't require JWT Authentication.

* [User Register](auth/signup.md) : `POST /api/v1/auth/signup`
* [User Login](auth/signin.md) : `POST /api/v1/auth/signin`
* [Refresh Token](auth/refreshToken.md) : `POST /api/v1/auth/refreshToken`
  
## Private Endpoints 

Related about all endpoints that require authentication. A valid access token (x-token) must be included in the header of the
request. 

### Events

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Create an event](event/createOne.md) : `POST /api/v1/event`
* [Get all events](event/getAll.md) : `GET /api/v1/event?from=0&limit=10&sort=-1&query={"userId":"620fd5c34bd75698efe9b1a0"}`
* [Get an event](event/getOne.md) : `GET /api/v1/event/:id`
* [Update an event status](event/updateOne.md) : `PUT /api/v1/event/:id`
* [Delete an event](event/deleteOne.md) : `DELETE /api/v1/event/:id`