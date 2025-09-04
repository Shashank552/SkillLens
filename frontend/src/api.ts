export interface Activity {
    id: number;
    title: string;
    skill: string;
    date: string;
}

const BASE_URL = "http://localhost:8080/api";


export const getActivities = async (): Promise<Activity[]> => {
    const res = await fetch(`${BASE_URL}/activities`);
    return res.json();
};

export const addActivity = async (activity: Activity): Promise<Activity> => {
    const res = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(activity),
    });
    return res.json();
};