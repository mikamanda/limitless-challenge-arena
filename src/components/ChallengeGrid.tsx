
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Timer, Award, Star, Flag } from 'lucide-react';

interface ChallengeGridProps {
  completedChallenges: number[];
  currentDay: number;
  isExpired: boolean;
}

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ 
  completedChallenges, 
  currentDay, 
  isExpired 
}) => {
  const challenges = [
    { id: 1, title: "Définir ses objectifs", icon: Flag, day: 1 },
    { id: 2, title: "Créer sa routine", icon: Timer, day: 2 },
    { id: 3, title: "Premier milestone", icon: Star, day: 3 },
    { id: 4, title: "Partager son évolution", icon: Award, day: 4 },
    { id: 5, title: "Célébrer sa victoire", icon: Check, day: 5 }
  ];

  const getChallengeStatus = (challengeId: number, day: number) => {
    if (completedChallenges.includes(challengeId)) {
      return 'completed';
    } else if (day === currentDay && !isExpired) {
      return 'current';
    } else if (day < currentDay || isExpired) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bgClass: 'bg-gradient-to-br from-green-400/30 to-emerald-500/30 border-green-400/50',
          iconClass: 'text-green-400',
          badgeClass: 'bg-green-500',
          badgeText: '✅ Complété'
        };
      case 'current':
        return {
          bgClass: 'bg-gradient-to-br from-yellow-400/30 to-orange-500/30 border-yellow-400/50 animate-pulse',
          iconClass: 'text-yellow-400',
          badgeClass: 'bg-yellow-500',
          badgeText: '🎯 En cours'
        };
      case 'available':
        return {
          bgClass: 'bg-gradient-to-br from-blue-400/20 to-purple-500/20 border-blue-400/30',
          iconClass: 'text-blue-400',
          badgeClass: 'bg-blue-500',
          badgeText: '📝 À faire'
        };
      default:
        return {
          bgClass: 'bg-white/5 border-white/10',
          iconClass: 'text-gray-500',
          badgeClass: 'bg-gray-500',
          badgeText: '🔒 Verrouillé'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {challenges.map((challenge) => {
        const status = getChallengeStatus(challenge.id, challenge.day);
        const config = getStatusConfig(status);
        const IconComponent = challenge.icon;

        return (
          <Card 
            key={challenge.id}
            className={`${config.bgClass} backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer`}
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <IconComponent className={`w-8 h-8 ${config.iconClass}`} />
                </div>
                <h3 className="text-white font-semibold mb-2">
                  Challenge {challenge.id}
                </h3>
                <p className="text-gray-200 text-sm mb-3">
                  {challenge.title}
                </p>
                <Badge className={`${config.badgeClass} text-white text-xs`}>
                  {config.badgeText}
                </Badge>
              </div>
              
              {status === 'completed' && (
                <div className="text-green-400 text-sm font-medium">
                  +150 points
                </div>
              )}
              
              {status === 'current' && (
                <div className="text-yellow-400 text-sm font-medium animate-bounce">
                  Jour {challenge.day} - Action !
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ChallengeGrid;
