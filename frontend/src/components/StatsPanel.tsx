import React from "react";
import type { Activity } from "../api";

interface Props {
	activities: Activity[];
}

const StatsPanel: React.FC<Props> = ({ activities }) => {
	if (activities.length === 0) {
		return (
			<div className="p-4 bg-white rounded-2xl shadow-md text-gray-500">
				No activities found.
			</div>
		);
	}

	const totalActivities = activities.length;
	const uniqueSkills = new Set(activities.map((a) => a.skill)).size;

	// Find most practiced skill
	const skillCount: Record<string, number> = {};
	activities.forEach((a) => {
		skillCount[a.skill] = (skillCount[a.skill] || 0) + 1;
	});
	const topSkill = Object.entries(skillCount).sort((a, b) => b[1] - a[1])[0][0];

	// Calculate streak (consecutive days with at least one activity)
	const dates = Array.from(new Set(activities.map((a) => a.date.split("T")[0])))
		.sort()
		.reverse();
	let streak = 0;
	for (let i = 0; i < dates.length; i++) {
		const expected = new Date();
		expected.setDate(expected.getDate() - i);
		const expectedStr = expected.toISOString().split("T")[0];
		if (dates.includes(expectedStr)) {
			streak++;
		} else {
			break;
		}
	}

	return (
		<div className="flex flex-wrap gap-4 mb-6">
			<div className="flex-1 min-w-[200px] p-4 bg-blue-50 rounded-xl shadow">
				<h3 className="text-sm font-medium text-gray-600">Total Activities</h3>
				<p className="text-2xl font-bold text-blue-600">{totalActivities}</p>
			</div>

			<div className="flex-1 min-w-[200px] p-4 bg-green-50 rounded-xl shadow">
				<h3 className="text-sm font-medium text-gray-600">Unique Skills</h3>
				<p className="text-2xl font-bold text-green-600">{uniqueSkills}</p>
			</div>

			<div className="flex-1 min-w-[200px] p-4 bg-orange-50 rounded-xl shadow">
				<h3 className="text-sm font-medium text-gray-600">Most Active Skill</h3>
				<p className="text-sm text-gray-800"> {topSkill}</p>
			</div>
		</div>
	);
};

export default StatsPanel;
