import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { Activity } from "./api";

interface SkillChartProps {
    activities: Activity[];
}

const SkillChart = ({ activities }: SkillChartProps) => {
    // Count activities per skill
    const data = Object.entries(
        activities.reduce((acc, a) => {
            acc[a.skill] = (acc[a.skill] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    ).map(([skill, count]) => ({ skill, count }));
    //console.log("Chart data:", data);

    return (
        <div style={{ width: '100%', height: 300}}>
            <h2>Activities by Skill</h2>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill"/>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillChart;