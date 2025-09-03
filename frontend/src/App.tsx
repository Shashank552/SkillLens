import { useState, useEffect } from "react";
import { getActivities, addActivity, type Activity } from "./api";

function App() { 
  const [activities, setActivities] = useState<Activity[]>([]);
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState("");

  useEffect(() => {
    getActivities().then(setActivities);
  }, []);

  const handleAdd = async () => {
    if (!title || !skill) return;
    const newActivity = await addActivity({title, skill, date: new Date().toISOString() });
    setActivities([...activities, newActivity]);
    setTitle("");
    setSkill("");
  };

  return (
    <div style = {{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
      <h1>🚀 SkillLens</h1>
      <div style={{marginBottom: '20px'}}>
        <input
          placeholder="Activity Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button onClick={handleAdd}>Add Activity</button>
      </div>
      <ul>
        {activities.map((a) => (
          <li key={a.id}>
            {a.title} - {a.skill} ({new Date(a.date).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App