import request from "supertest";
import server from "../server/server";
export default request(server.getApp())