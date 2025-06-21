
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  currentUserPoints: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUserPoints }) => {
  const leaderboardData = [
    {
      id: 1,
      name: 'Sarah M.',
      challenges: 5,
      points: 750,
      status: 'terminé',
      isCurrentUser: false
    },
    {
      id: 2,
      name: 'Alexandre D.',
      challenges: 4,
      points: 600,
      status: 'en cours',
      isCurrentUser: false
    },
    {
      id: 3,
      name: 'Toi',
      challenges: 3,
      points: currentUserPoints,
      status: 'en cours',
      isCurrentUser: true
    },
    {
      id: 4,
      name: 'Marie L.',
      challenges: 3,
      points: 420,
      status: 'en cours',
      isCurrentUser: false
    },
    {
      id: 5,
      name: 'Thomas R.',
      challenges: 2,
      points: 300,
      status: 'en cours',
      isCurrentUser: false
    }
  ];

  // Sort by points
  const sortedData = [...leaderboardData].sort((a, b) => b.points - a.points);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-400" />;
      default:
        return <div className="w-5 h-5 flex items-center justify-center text-gray-400 font-bold">#{rank}</div>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'terminé':
        return <Badge className="bg-green-500 text-white text-xs">Terminé</Badge>;
      case 'en cours':
        return <Badge className="bg-blue-500 text-white text-xs">En cours</Badge>;
      case 'expiré':
        return <Badge className="bg-red-500 text-white text-xs">Expiré</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedData.map((user, index) => {
            const rank = index + 1;
            return (
              <div
                key={user.id}
                className={`
                  rounded-lg p-4 backdrop-blur-sm transition-all hover:scale-[1.02]
                  ${user.isCurrentUser 
                    ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-400/50 ring-2 ring-yellow-400/20' 
                    : 'bg-white/5 hover:bg-white/10'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getRankIcon(rank)}
                      <span className="text-gray-300 text-sm font-medium">
                        #{rank}
                      </span>
                    </div>
                    
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-purple-500 text-white text-sm">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className={`font-medium ${user.isCurrentUser ? 'text-yellow-300' : 'text-white'}`}>
                        {user.name}
                        {user.isCurrentUser && (
                          <span className="ml-2 text-yellow-400 text-xs">👈</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {user.challenges}/5 challenges
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-bold">
                      {user.points.toLocaleString()} pts
                    </div>
                    <div className="mt-1">
                      {getStatusBadge(user.status)}
                    </div>
                  </div>
                </div>
                
                {/* Progress bar for incomplete challenges */}
                {user.status === 'en cours' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progression</span>
                      <span>{Math.round((user.challenges / 5) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          user.isCurrentUser 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                            : 'bg-gradient-to-r from-blue-400 to-purple-500'
                        }`}
                        style={{ width: `${(user.challenges / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-3 bg-purple-500/20 rounded-lg backdrop-blur-sm">
          <p className="text-center text-purple-200 text-sm">
            🔥 Continue pour grimper dans le classement !
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
