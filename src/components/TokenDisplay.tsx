
import React from "react";
import { useUser } from "@/context/UserContext";

const TokenDisplay: React.FC = () => {
  const { userData } = useUser();

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium uppercase opacity-70 heading-font">
          Token History
        </h3>
        <button className="text-xs text-neon-cyan">View All</button>
      </div>
      <div className="bg-white dark:bg-dark-card rounded-lg overflow-hidden">
        {userData.tokenHistory.length > 0 ? (
          userData.tokenHistory.slice(0, 5).map((transaction) => (
            <div 
              key={transaction.id} 
              className="p-3 border-b border-gray-100 dark:border-dark-surface last:border-b-0 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium">{transaction.description}</p>
                <p className="text-xs opacity-70">{transaction.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neon-green">
                  {transaction.amount.toFixed(2)} $FIXIE
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm opacity-70">
            No token transactions yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default TokenDisplay;
