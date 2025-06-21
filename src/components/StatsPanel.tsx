
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Award, Clock, Star, Timer } from 'lucide-react';

interface StatsPanelProps {
  completedChallenges: number;
  totalPoints: number;
  currentDay: number;
  progressPercentage: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  completedChallenges,
  totalPoints,
  currentDay,
  progressPercentage
}) => {
  const stats = [
    {
      icon: Award,
      label: 'Challenges',
      value: `${completedChallenges}/5`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: Star,
      label: 'Points',
      value: totalPoints.toLocaleString(),
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      icon: Clock,
      label: 'Jours',
      value: `${currentDay}/7`,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: Timer,
      label: 'Progression',
      value: `${progressPercentage}%`,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ];

  const getRank = (points: number) => {
    if (points >= 750) return { rank: 'Champion', color: 'text-yellow-400', badge: '🏆' };
    if (points >= 600) return { rank: 'Expert', color: 'text-purple-400', badge: '⭐' };
    if (points >= 450) return { rank: 'Avancé', color: 'text-blue-400', badge: '🔥' };
    if (points >= 300) return { rank: 'Intermédiaire', color: 'text-green-400', badge: '💪' };
    return { rank: 'Débutant', color: 'text-gray-400', badge: '🌱' };
  };

  const currentRank = getRank(totalPoints);

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Award className="w-5 h-5" />
          Tes Statistiques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-lg p-4 backdrop-blur-sm`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-gray-300 text-sm">{stat.label}</span>
                </div>
                <div className={`text-xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Progression vers la récompense</span>
            <span className="text-white font-medium">{progressPercentage}%</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-white/10"
          />
          <p className="text-xs text-gray-400">
            {progressPercentage >= 90 ? '🎉 Récompense débloquée !' : `${90 - progressPercentage}% restant pour débloquer`}
          </p>
        </div>

        {/* Current Rank */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">{currentRank.badge}</div>
            <Badge className={`${currentRank.color} bg-transparent border border-current`}>
              {currentRank.rank}
            </Badge>
            <p className="text-gray-300 text-sm mt-2">
              Ton niveau actuel
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-white font-medium text-sm">Actions rapides</h4>
          <div className="grid gap-2">
            <button className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-lg p-3 text-left transition-all">
              <div className="text-white text-sm font-medium">Voir mon classement</div>
              <div className="text-gray-400 text-xs">Position dans le leaderboard</div>
            </button>
            <button className="bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 rounded-lg p-3 text-left transition-all">
              <div className="text-white text-sm font-medium">Historique des points</div>
              <div className="text-gray-400 text-xs">Détail de tes gains</div>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
