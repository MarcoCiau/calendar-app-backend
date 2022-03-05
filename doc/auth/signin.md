# User Signin

User Login.

**URL** : `/api/v1/auth/signin`

**Method** : `POST`

**Auth required** : NO

**Request Body**
```javascript
{
    "email":"user@mail.com",
    "password":"12345678"
}
```
Note: **password** min length is 8

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": true,
    "msg": "process sucess",
    "user": {
        "name": "user name",
        "email": "user@mail.com",
        "_id": "62237a78c03523c03ef014de"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjIzN2E3OGMwMzUyM2MwM2VmMDE0ZGUiLCJpYXQiOjE2NDY0OTIyODAsImV4cCI6MTY0NjQ5MjM0MH0.-_ZJG7kx_NCiRUTba0h0GodBX57ehuSs_rN17fDfufI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjIzN2E3OGMwMzUyM2MwM2VmMDE0ZGUiLCJpYXQiOjE2NDY0OTIyODAsImV4cCI6MTY0NjQ5NTg4MH0.JvCESJUotnXsSu2AoTEtXTxX2qpi2gbGvghdFM-wuoU"
}
```

## Error Responses

**Condition** : If 'password' length is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": false,
    "msg": "request data [body, header, query or params] trouble encountered",
    "errors": [
        {
            "value": "1234567",
            "msg": "Invalid value",
            "param": "password",
            "location": "body"
        }
    ]
}
```

---

**Condition** : If 'email' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": false,
    "msg": "user not found"
}
```