"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
// GET /api/workouts/ - list workouts
router.get('/', async (req, res) => {
    const workouts = await Workout_1.default.find().lean();
    res.json({ workouts });
});
// POST /api/workouts/ - create workout
router.post('/', async (req, res) => {
    const payload = req.body;
    const workout = await Workout_1.default.create(payload);
    res.status(201).json({ workout });
});
exports.default = router;
