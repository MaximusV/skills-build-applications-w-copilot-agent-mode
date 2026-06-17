"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
exports.getCodespacesUrl = getCodespacesUrl;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
function createServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // API routes
    app.use('/api/users', users_1.default);
    app.use('/api/teams', teams_1.default);
    app.use('/api/activities', activities_1.default);
    app.use('/api/leaderboard', leaderboard_1.default);
    app.use('/api/workouts', workouts_1.default);
    app.get('/', (req, res) => {
        res.json({ message: 'OctoFit Tracker backend running' });
    });
    return app;
}
/**
 * Construct Codespaces-aware public URL when running inside GitHub Codespaces.
 * Checks for CODESPACE_NAME environment variable and builds the preview URL.
 */
function getCodespacesUrl(port) {
    const name = process.env.CODESPACE_NAME;
    if (!name)
        return null;
    // GitHub Codespaces preview URL pattern
    return `https://${name}-${port}.app.github.dev`;
}
function startServer(app, port) {
    const codespaceUrl = getCodespacesUrl(port);
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        if (codespaceUrl) {
            console.log(`Codespaces preview URL: ${codespaceUrl}`);
        }
    });
}
