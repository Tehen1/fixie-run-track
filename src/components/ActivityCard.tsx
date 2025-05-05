
import React from "react";
import { Activity } from "@/context/UserContext";
import { formatTime, formatDistance } from "@/utils/trackingUtils";

interface ActivityCardProps {
  activity: Activity;
  onClick?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  return (
    <div 
      className="p-3 rounded-lg bg-white dark:bg-dark-card mb-2 transition-all hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
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
      {activity.syncedFrom && (
        <div className="mt-1 pt-1 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs opacity-60 flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-400 mr-1"></span>
            Synced from {activity.syncedFrom}
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
