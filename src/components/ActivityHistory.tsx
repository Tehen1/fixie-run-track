
import React from "react";
import { useUser } from "@/context/UserContext";
import ActivityCard from "@/components/ActivityCard";

const ActivityHistory: React.FC = () => {
  const { userData } = useUser();

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium uppercase opacity-70 heading-font">
          Recent Activities
        </h3>
        <button className="text-xs text-neon-cyan">View All</button>
      </div>
      <div className="space-y-2">
        {userData.activities.length > 0 ? (
          userData.activities.slice(0, 5).map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="p-4 text-center text-sm opacity-70 bg-white dark:bg-dark-card rounded-lg">
            No activities yet. Start your first workout!
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivityHistory;
