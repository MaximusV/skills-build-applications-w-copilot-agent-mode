"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoUrl = getMongoUrl;
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const DEFAULT_URL = 'mongodb://localhost:27017/octofit_db';
function getMongoUrl() {
    return process.env.MONGO_URL || DEFAULT_URL;
}
async function connectDB() {
    const url = getMongoUrl();
    await mongoose_1.default.connect(url);
    return mongoose_1.default;
}
async function disconnectDB() {
    await mongoose_1.default.disconnect();
}
exports.default = connectDB;
