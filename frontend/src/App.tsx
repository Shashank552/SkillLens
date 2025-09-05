// src/App.tsx
import { useEffect, useState } from "react";
import { getActivities, addActivity, type Activity } from "./api";
import SkillChart from "./SkillChart";
import ActivityHeatmap from "./components/ActivityHeatmap";
import StatsPanel from "./components/StatsPanel";

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [title, setTitle] = useState("");
	const [skill, setSkill] = useState("");
	const [selectedSkill, setSelectedSkill] = useState<string>("All");
	const [selectedDate, setSelectedDate] = useState<string | null>(null);

	useEffect(() => {
		getActivities().then(setActivities);
	}, []);

	const handleAdd = async () => {
		if (!title || !skill) return;
		const newActivity = await addActivity({
			title,
			skill,
			date: new Date().toISOString(),
			id: 0, // backend will replace with actual id
		});
		setActivities((prev) => [...prev, newActivity]);
		setTitle("");
		setSkill("");
	};

	// Unique skills (used in the dropdown)
	const uniqueSkills = Array.from(
		new Set(activities.map((a) => a.skill))
	).sort();

	// Activities that should be shown in charts + list
	const filteredActivities = activities.filter((a) => {
		const skillMatch = selectedSkill === "All" || a.skill === selectedSkill;
		const dateKey = a.date.slice(0, 10);
		const dateMatch = !selectedDate || dateKey === selectedDate;
		return skillMatch && dateMatch;
	});

	// Activities passed to heatmap should be already filtered by skill,
	// but the heatmap click will set selectedDate in App (so list + charts respect it).
	const heatmapActivities = activities.filter(
		(a) => selectedSkill === "All" || a.skill === selectedSkill
	);

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>🚀 SkillLens</h1>

			<div style={{ marginBottom: "12px" }}>
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

			<div
				style={{
					marginBottom: "12px",
					display: "flex",
					gap: 8,
					alignItems: "center",
				}}
			>
				<label style={{ fontWeight: 600 }}>Filter by skill:</label>
				<select
					value={selectedSkill}
					onChange={(e) => {
						setSelectedSkill(e.target.value);
						setSelectedDate(null);
					}}
				>
					<option value="All">All</option>
					{uniqueSkills.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>

				{selectedSkill !== "All" && (
					<button
						onClick={() => {
							setSelectedSkill("All");
							setSelectedDate(null);
						}}
					>
						Clear
					</button>
				)}

				{selectedDate && (
					<div style={{ marginLeft: 12 }}>
						<strong>Filtered day:</strong> {selectedDate}{" "}
						<button
							onClick={() => setSelectedDate(null)}
							style={{ marginLeft: 8 }}
						>
							Clear date
						</button>
					</div>
				)}
			</div>

			{/* list uses filteredActivities so it respects both skill and date filters */}
			<ul>
				{filteredActivities.map((a) => (
					<li key={a.id}>
						{a.title} - {a.skill} ({new Date(a.date).toLocaleDateString()})
					</li>
				))}
			</ul>

			{/* charts and heatmap receive the filteredActivities / heatmapActivities */}
			<StatsPanel activities={filteredActivities} />
			<SkillChart activities={filteredActivities} />

			<ActivityHeatmap
				activities={heatmapActivities}
				onDateSelect={setSelectedDate}
				selectedDate={selectedDate}
			/>
		</div>
	);
}

export default App;
