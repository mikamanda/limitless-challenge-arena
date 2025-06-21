
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
  id: number;
  name: string;
  progress: string;
  status: 'active' | 'completed' | 'expired';
  points: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-white font-bold">#{index + 1}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white">Terminé</Badge>;
      case 'active':
        return <Badge className="bg-blue-500 text-white">En cours</Badge>;
      case 'expired':
        return <Badge className="bg-red-500 text-white">Expiré</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-center flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Classement Communautaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                entry.isCurrentUser
                  ? 'bg-yellow-500/30 border border-yellow-400/50 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                {getRankIcon(index)}
                <div>
                  <div className={`font-medium ${entry.isCurrentUser ? 'text-yellow-300' : 'text-white'}`}>
                    {entry.name}
                    {entry.isCurrentUser && <span className="ml-2 text-xs">(Vous)</span>}
                  </div>
                  <div className="text-sm text-gray-300">{entry.progress}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">{entry.points}pts</span>
                {getStatusBadge(entry.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
