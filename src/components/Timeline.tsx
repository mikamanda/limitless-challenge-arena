
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
              ${day.isCurrent ? 'bg-yellow-500 text-black animate-pulse' : ''}
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
                  <p className="text-gray-200 text-sm">
                    {day.date.toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
                
                <div>
                  {day.isPast && (
                    <Badge className="bg-green-500 text-white border-0">
                      Terminé
                    </Badge>
                  )}
                  {day.isCurrent && (
                    <Badge className="bg-yellow-500 text-black border-0 animate-pulse">
                      En cours
                    </Badge>
                  )}
                  {day.isFuture && (
                    <Badge className="bg-gray-600 text-white border-0">
                      À venir
                    </Badge>
                  )}
                  {day.isExpired && (
                    <Badge className="bg-red-500 text-white border-0">
                      Expiré
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
        <p className="text-white text-sm text-center font-medium">
          <span className="font-semibold">Challenge commencé le :</span> {' '}
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
