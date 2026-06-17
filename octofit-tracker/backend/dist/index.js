"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./config/database"));
const server_1 = require("./server");
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
async function main() {
    try {
        await (0, database_1.default)();
        console.log('Connected to MongoDB');
        const app = (0, server_1.createServer)();
        (0, server_1.startServer)(app, PORT);
    }
    catch (err) {
        console.error('Error starting application:', err);
        process.exit(1);
    }
}
main();
