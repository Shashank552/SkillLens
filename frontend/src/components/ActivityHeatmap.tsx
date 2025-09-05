import React from "react";
import CalendarHeatmap, {
	type ReactCalendarHeatmapValue,
	type TooltipDataAttrs as BaseTooltipDataAttrs,
} from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import type { Activity } from "../api";

interface TooltipDataAttrs extends BaseTooltipDataAttrs {
	"data-tooltip-id"?: string;
	"data-tooltip-content"?: string;
}

interface Props {
	activities: Activity[];
	onDateSelect?: (date: string | null) => void;
	selectedDate?: string | null;
}

const ActivityHeatmap: React.FC<Props> = ({
	activities,
	onDateSelect,
	selectedDate,
}) => {
	const dateCountMap: Record<string, number> = {};
	activities.forEach((a) => {
		const dateKey = a.date.slice(0, 10);
		dateCountMap[dateKey] = (dateCountMap[dateKey] || 0) + 1;
	});

	const values: ReactCalendarHeatmapValue<string>[] = Object.entries(
		dateCountMap
	).map(([date, count]) => ({ date, count }));

	const getTooltipDataAttrs = (
		value: ReactCalendarHeatmapValue<string> | undefined
	): TooltipDataAttrs => {
		if (!value || !value.date) return { "data-tooltip-content": "" };
		return {
			"data-tooltip-id": "activity-tooltip",
			"data-tooltip-content": `${value.count} activit${
				value.count > 1 ? "ies" : "y"
			} on ${value.date}`,
		};
	};

	return (
		<div className="p-4 bg-white rounded-2xl shadow-md">
			<h2 className="text-lg font-semibold mb-4">Activity Heatmap</h2>

			<div className="overflow-x-auto">
				<div className="inline-block transform scale-90 sm:scale-100">
					<CalendarHeatmap
						startDate={
							new Date(new Date().setFullYear(new Date().getFullYear() - 1))
						}
						endDate={new Date()}
						values={values}
						classForValue={(value) => {
							if (!value) return "color-empty";
							if (selectedDate && value.date === selectedDate)
								return "selected-date-rect";
							if (value.count >= 4) return "color-scale-4";
							return `color-scale-${value.count}`;
						}}
						tooltipDataAttrs={getTooltipDataAttrs}
						onClick={(value) => {
							if (value && value.date && onDateSelect) {
								onDateSelect(value.date);
							}
						}}
					/>
				</div>
			</div>

			<style>
				{`
          .color-empty { fill: #e5e7eb; rx: 3px; ry: 3px; } /* gray-200 */
          .color-scale-1 { fill: #bfdbfe; rx: 3px; ry: 3px; } /* blue-200 */
          .color-scale-2 { fill: #60a5fa; rx: 3px; ry: 3px; } /* blue-400 */
          .color-scale-3 { fill: #2563eb; rx: 3px; ry: 3px; } /* blue-600 */
          .color-scale-4 { fill: #1e3a8a; rx: 3px; ry: 3px; } /* blue-900 */

          /* highlight selected date */
          .selected-date-rect {
            fill: #47fa15ff !important; /* yellow-400 */
            stroke: #92400e; /* amber-800 */
            stroke-width: 1px;
            rx: 2px; ry: 2px;
          }

          /* hover effect */
          rect:hover {
            opacity: 0.5;
            stroke: #2a2b2eff; /* gray-900 */
            stroke-width: 1px;
            cursor: pointer;
          }
        `}
			</style>

			<ReactTooltip id="activity-tooltip" />
		</div>
	);
};

export default ActivityHeatmap;
