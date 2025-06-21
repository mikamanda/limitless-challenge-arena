
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TimelineProps {
  currentDay: number;
  startDate: Date;
  isExpired: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ currentDay, startDate, isExpired }) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date(startDate);
    dayDate.setDate(startDate.getDate() + i);
    return {
      day: i + 1,
      date: dayDate,
      isPast: i + 1 < currentDay,
      isCurrent: i + 1 === currentDay && !isExpired,
      isFuture: i + 1 > currentDay && !isExpired,
      isExpired: isExpired && i + 1 >= currentDay
    };
  });

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-pink-400"></div>
      
      <div className="space-y-6">
        {days.map((day, index) => (
          <div key={day.day} className="relative flex items-center">
            {/* Timeline dot */}
            <div className={`
              relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${day.isPast ? 'bg-green-500 text-white' : ''}
              ${day.isCurrent ? 'bg-yellow-500 text-white animate-pulse' : ''}
              ${day.isFuture ? 'bg-gray-400 text-white' : ''}
              ${day.isExpired ? 'bg-red-500 text-white' : ''}
            `}>
              {day.day}
            </div>
            
            {/* Day info */}
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">
                    Jour {day.day}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {day.date.toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
                
                <div>
                  {day.isPast && (
                    <Badge className="bg-green-500 text-white">
                      Terminé
                    </Badge>
                  )}
                  {day.isCurrent && (
                    <Badge className="bg-yellow-500 text-white animate-pulse">
                      En cours
                    </Badge>
                  )}
                  {day.isFuture && (
                    <Badge className="bg-gray-400 text-white">
                      À venir
                    </Badge>
                  )}
                  {day.isExpired && (
                    <Badge className="bg-red-500 text-white">
                      Expiré
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <p className="text-gray-200 text-sm text-center">
          <span className="font-medium">Challenge commencé le :</span> {' '}
          {startDate.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
};

export default Timeline;
