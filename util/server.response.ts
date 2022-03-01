export enum ServerResponse {
    ERROR_USER_EXISTS = "user exists",
    ERROR_USER_NOT_FOUND = "user not found",
    ERROR_USER_BAD_PASSWORD = "invalid password",
    ERROR_EXPIRED_TOKEN = "expired Token",
    ERROR_INVALID_TOKEN = "invalid Token",
    ERROR_MISSING_TOKEN = "missing Token",
    ERROR_INTERNAL_SERVER = "an unexpected condition encountered",
    ERROR_DB_QUERY_FAILED = "DB's query failed",
    ERROR_EVENT_NOT_FOUND = "event not found with provided userId",
    ERROR_REQUEST_VALIDATOR = "request data [body, header, query or params] trouble encountered",
    OK_PROCESS = "process sucess",
}