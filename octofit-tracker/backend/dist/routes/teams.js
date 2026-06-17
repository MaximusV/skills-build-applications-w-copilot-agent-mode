"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
// GET /api/teams/ - list teams
router.get('/', async (req, res) => {
    const teams = await Team_1.default.find().populate('members').lean();
    res.json({ teams });
});
// POST /api/teams/ - create team
router.post('/', async (req, res) => {
    const payload = req.body;
    const team = await Team_1.default.create(payload);
    res.status(201).json({ team });
});
exports.default = router;
