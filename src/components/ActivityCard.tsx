
import React from "react";
import { Activity } from "@/context/UserContext";
import { formatTime } from "@/utils/trackingUtils";

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="p-3 rounded-lg bg-white dark:bg-dark-card mb-2 transition-all hover:shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-medium">{activity.type}</h4>
          <p className="text-xs opacity-70">{activity.date}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{activity.distance.toFixed(2)} km</p>
          <p className="text-xs opacity-70">{formatTime(activity.duration)}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
