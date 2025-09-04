import { Router } from 'express';
import { pool } from '../db';

const router = Router();

interface Activity {
    id :number;
    title: string;
    skill: string;
    date: string;
}

let activities: Activity[] = [];

// Get all activities
router.get("/", async (_req, res) =>{
    try {
        const result = await pool.query("SELECT * FROM activities ORDER BY id ASC");
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: "Database error"});
    }
});

//POST a new activity
router.post("/", async (req, res) => {
    try {
        const { title, skill, date} = req.body;
        const result = await pool.query(
            "INSERT INTO activities (title, skill, date) VALUES ($1, $2, $3) RETURNING *",
            [title, skill, date]
    );
    res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Database error"});
    }
});

export default router;
