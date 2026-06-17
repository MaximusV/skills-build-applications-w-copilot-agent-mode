"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
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
// Construct Codespaces-aware public URL when running inside Codespaces
function codespacesUrl(port) {
    const name = process.env.CODESPACE_NAME || process.env.CODESPACE; // fallback
    if (!name)
        return null;
    // GitHub Codespaces preview pattern (may vary) — provide the common preview host
    return `https://${name}-${port}.githubpreview.dev`;
}
mongoose_1.default.connect(MONGO_URL)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        const external = codespacesUrl(PORT);
        if (external) {
            console.log(`Codespaces preview URL: ${external}`);
        }
    });
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
