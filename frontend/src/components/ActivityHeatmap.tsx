import React from "react";
import CalendarHeatmap, {
  type ReactCalendarHeatmapValue,
  type TooltipDataAttrs as BaseTooltipDataAttrs,
} from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface TooltipDataAttrs extends BaseTooltipDataAttrs {
  "data-tooltip-content"?: string;
}

export interface Activity {
  id: number;
  title: string;
  skill: string;
  date: string; // ISO date string
}

interface Props {
  activities: Activity[];
}

const ActivityHeatmap: React.FC<Props> = ({ activities }) => {
  // Aggregate counts per date
  const dateCountMap: Record<string, number> = {};
  activities.forEach((a) => {
    dateCountMap[a.date] = (dateCountMap[a.date] || 0) + 1;
  });

  const values: ReactCalendarHeatmapValue<string>[] = Object.entries(dateCountMap).map(
    ([date, count]) => ({ date, count })
  );

  const getTooltipDataAttrs = (
    value: ReactCalendarHeatmapValue<string> | undefined
  ): TooltipDataAttrs => {
    if (!value || !("date" in value)) {
      return { "data-tooltip-content": "" };
    }
    return {
      "data-tooltip-content": `${value.count} activity${value.count > 1 ? "ies" : ""} on ${value.date}`,
    };
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Activity Heatmap</h2>
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={values}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count > 4) return "color-scale-4";
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={getTooltipDataAttrs}
      />

      <ReactTooltip />
      
      {/* Tailwind-based colors */}
      <style>
        {`
          .color-empty { fill: #e5e7eb; } /* gray-200 */
          .color-scale-1 { fill: #bfdbfe; } /* blue-200 */
          .color-scale-2 { fill: #60a5fa; } /* blue-400 */
          .color-scale-3 { fill: #2563eb; } /* blue-600 */
          .color-scale-4 { fill: #1e3a8a; } /* blue-900 */
        `}
      </style>
    </div>
  );
};

export default ActivityHeatmap;
