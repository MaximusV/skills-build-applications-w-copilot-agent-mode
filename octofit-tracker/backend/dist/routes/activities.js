"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
// GET /api/activities/ - list activities
router.get('/', async (req, res) => {
    const activities = await Activity_1.default.find().populate('user team workout').lean();
    res.json({ activities });
});
// POST /api/activities/ - log activity
router.post('/', async (req, res) => {
    const payload = req.body;
    const activity = await Activity_1.default.create(payload);
    res.status(201).json({ activity });
});
exports.default = router;
