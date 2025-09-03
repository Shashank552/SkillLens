import { Router } from 'express';

const router = Router();

interface Activity {
    id :number;
    title: string;
    skill: string;
    date: string;
}

let activities: Activity[] = [];

// Get all activities
router.get("/", (_req, res) =>{
    res.json(activities);
});

//POST a new activity
router.post("/", (req, res) => {
    const { title, skill, date} = req.body;
    const newActivity: Activity = {
        id: activities.length + 1,
        title,
        skill,
        date
    };
    activities.push(newActivity);
    console.log("New activity added:", newActivity);
    res.status(201).json(newActivity);
});

export default router;
