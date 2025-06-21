
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Calendar, TrendingUp } from 'lucide-react';

interface StatsPanelProps {
  completedChallenges: number;
  totalChallenges: number;
  totalPoints: number;
  currentDay: number;
  totalDays: number;
  ranking: number;
  progressPercentage: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  completedChallenges,
  totalChallenges,
  totalPoints,
  currentDay,
  totalDays,
  ranking,
  progressPercentage
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border-blue-400/30">
        <CardContent className="p-4 text-center">
          <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{completedChallenges}/{totalChallenges}</div>
          <div className="text-xs text-blue-200">Challenges</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md border-yellow-400/30">
        <CardContent className="p-4 text-center">
          <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{totalPoints}</div>
          <div className="text-xs text-yellow-200">Points</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-md border-green-400/30">
        <CardContent className="p-4 text-center">
          <Calendar className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{currentDay}/{totalDays}</div>
          <div className="text-xs text-green-200">Jours</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border-purple-400/30">
        <CardContent className="p-4 text-center">
          <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">#{ranking}</div>
          <div className="text-xs text-purple-200">Classement</div>
        </CardContent>
      </Card>

      <Card className="col-span-2 md:col-span-4 bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Progression vers la récompense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Progression</span>
              <span className="text-yellow-400 font-bold">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-gray-300 text-xs text-center">
              {progressPercentage >= 90 ? 'Formation débloquée !' : '90% requis pour débloquer la formation'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
