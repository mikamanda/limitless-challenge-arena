
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChallengeTimer from '@/components/ChallengeTimer';
import ChallengeGrid from '@/components/ChallengeGrid';
import Timeline from '@/components/Timeline';
import ChallengeForm from '@/components/ChallengeForm';
import StatsPanel from '@/components/StatsPanel';
import Leaderboard from '@/components/Leaderboard';
import RewardSection from '@/components/RewardSection';
import { Award, Star, Timer, Flag } from 'lucide-react';

const ChallengePage = () => {
  const [currentDay, setCurrentDay] = useState(4);
  const [completedChallenges, setCompletedChallenges] = useState([1, 2, 3]);
  const [totalPoints, setTotalPoints] = useState(450);
  const [progressPercentage, setProgressPercentage] = useState(78);
  
  // Challenge expiration date (7 days from start)
  const startDate = new Date('2025-06-18');
  const expirationDate = new Date(startDate);
  expirationDate.setDate(startDate.getDate() + 7);
  
  const isExpired = new Date() > expirationDate;
  const isCompleted = completedChallenges.length >= 5;

  const currentChallenge = {
    id: 4,
    title: "Partage ton évolution",
    description: "Crée un post Instagram montrant ta progression et inspire ta communauté",
    type: "social",
    points: 150
  };

  const handleChallengeSubmit = (challengeId: number, data: any) => {
    console.log('Challenge submitted:', challengeId, data);
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
      setTotalPoints(prev => prev + currentChallenge.points);
      setProgressPercentage(prev => Math.min(prev + 18, 100));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Timer */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Challenge 5 Jours Limitless
          </h1>
          <p className="text-xl text-purple-200 mb-6">
            Débloque ta formation exclusive de 197€ !
          </p>
          <ChallengeTimer expirationDate={expirationDate} isExpired={isExpired} />
        </div>

        {/* Reward Section */}
        <RewardSection 
          progressPercentage={progressPercentage}
          isCompleted={isCompleted}
          rewardValue="197€"
        />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Challenges & Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {/* Challenge Grid */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Flag className="w-5 h-5" />
                  Tes Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChallengeGrid 
                  completedChallenges={completedChallenges}
                  currentDay={currentDay}
                  isExpired={isExpired}
                />
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  Timeline - 7 Jours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline 
                  currentDay={currentDay}
                  startDate={startDate}
                  isExpired={isExpired}
                />
              </CardContent>
            </Card>

            {/* Current Challenge */}
            {!isExpired && !isCompleted && (
              <Card className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-md border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Challenge du Jour {currentDay}
                  </CardTitle>
                  <p className="text-purple-200">{currentChallenge.description}</p>
                </CardHeader>
                <CardContent>
                  <ChallengeForm 
                    challenge={currentChallenge}
                    onSubmit={handleChallengeSubmit}
                    isCompleted={completedChallenges.includes(currentChallenge.id)}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Stats & Leaderboard */}
          <div className="space-y-8">
            {/* Stats Panel */}
            <StatsPanel 
              completedChallenges={completedChallenges.length}
              totalPoints={totalPoints}
              currentDay={currentDay}
              progressPercentage={progressPercentage}
            />

            {/* Leaderboard */}
            <Leaderboard currentUserPoints={totalPoints} />
          </div>
        </div>

        {/* Success/Expiry States */}
        {isCompleted && (
          <Card className="mt-8 bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-md border-green-400/30">
            <CardContent className="text-center py-12">
              <Award className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Félicitations ! 🎉
              </h2>
              <p className="text-green-200 text-lg mb-6">
                Tu as débloqué ta formation exclusive de 197€ !
              </p>
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                Accéder à ma formation
              </Button>
            </CardContent>
          </Card>
        )}

        {isExpired && !isCompleted && (
          <Card className="mt-8 bg-gradient-to-br from-red-400/20 to-pink-500/20 backdrop-blur-md border-red-400/30">
            <CardContent className="text-center py-12">
              <Timer className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Challenge Expiré ⏰
              </h2>
              <p className="text-red-200 text-lg mb-4">
                Le temps est écoulé ! Tu as complété {completedChallenges.length}/5 challenges.
              </p>
              <p className="text-red-200">
                Points gagnés : {totalPoints}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChallengePage;
