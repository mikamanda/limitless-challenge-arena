
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, Clock } from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'todo';
  points: number;
}

interface ChallengeGridProps {
  challenges: Challenge[];
  onChallengeClick: (challengeId: number) => void;
}

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ challenges, onChallengeClick }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'current':
        return <Target className="w-6 h-6 text-yellow-400" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white">Complété</Badge>;
      case 'current':
        return <Badge className="bg-yellow-500 text-black">En cours</Badge>;
      default:
        return <Badge className="bg-gray-600 text-white">À faire</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {challenges.map((challenge) => (
        <Card
          key={challenge.id}
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
            challenge.status === 'completed'
              ? 'bg-green-500/20 border-green-400/30'
              : challenge.status === 'current'
              ? 'bg-yellow-500/20 border-yellow-400/30 animate-pulse'
              : 'bg-white/10 border-white/20'
          }`}
          onClick={() => onChallengeClick(challenge.id)}
        >
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              {getStatusIcon(challenge.status)}
            </div>
            <h3 className="text-white font-bold mb-2">{challenge.title}</h3>
            <p className="text-gray-300 text-sm mb-4">+{challenge.points} points</p>
            {getStatusBadge(challenge.status)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChallengeGrid;
