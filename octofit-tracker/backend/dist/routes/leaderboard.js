"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const router = (0, express_1.Router)();
// GET /api/leaderboard/ - leaderboard summary
router.get('/', async (req, res) => {
    const entries = await LeaderboardEntry_1.default.find().populate('user team').sort({ score: -1 }).lean();
    res.json({ leaderboard: entries });
});
exports.default = router;
