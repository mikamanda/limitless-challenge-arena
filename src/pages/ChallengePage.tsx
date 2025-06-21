
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChallengeTimer from '@/components/ChallengeTimer';
import ChallengeGrid from '@/components/ChallengeGrid';
import Timeline from '@/components/Timeline';
import ChallengeForm from '@/components/ChallengeForm';
import StatsPanel from '@/components/StatsPanel';
import Leaderboard from '@/components/Leaderboard';
import RewardSection from '@/components/RewardSection';

const ChallengePage = () => {
  const navigate = useNavigate();
  
  // Simulation de données
  const [startDate] = useState(new Date(2024, 0, 15)); // 15 janvier 2024
  const [currentDay, setCurrentDay] = useState(3);
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  
  const expirationDate = new Date(startDate);
  expirationDate.setDate(startDate.getDate() + 7);
  
  const isExpired = new Date() > expirationDate;

  const challenges = [
    { id: 1, title: '🎯 Challenge Social Media', status: 'completed' as const, points: 150 },
    { id: 2, title: '📸 Challenge Photo', status: 'completed' as const, points: 200 },
    { id: 3, title: '💪 Challenge Fitness', status: 'current' as const, points: 250 },
    { id: 4, title: '📚 Challenge Learning', status: 'todo' as const, points: 180 },
    { id: 5, title: '🌟 Challenge Final', status: 'todo' as const, points: 300 }
  ];

  const leaderboardData = [
    { id: 1, name: 'Alice Martin', progress: '5/5 challenges', status: 'completed' as const, points: 1080 },
    { id: 2, name: 'Thomas Dubois', progress: '4/5 challenges', status: 'active' as const, points: 780 },
    { id: 3, name: 'Marie Durand', progress: '3/5 challenges', status: 'active' as const, points: 600, isCurrentUser: true },
    { id: 4, name: 'Pierre Leblanc', progress: '2/5 challenges', status: 'active' as const, points: 350 },
    { id: 5, name: 'Sophie Garcia', progress: '1/5 challenges', status: 'expired' as const, points: 150 }
  ];

  const completedChallenges = challenges.filter(c => c.status === 'completed').length;
  const totalPoints = challenges.filter(c => c.status === 'completed').reduce((sum, c) => sum + c.points, 0);
  const progressPercentage = Math.round((completedChallenges / challenges.length) * 100);

  const handleChallengeClick = (challengeId: number) => {
    setSelectedChallenge(challengeId);
  };

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Ici vous pourriez traiter les données du formulaire
    setSelectedChallenge(null);
  };

  const handleClaimReward = () => {
    console.log('Reward claimed!');
    // Ici vous pourriez rediriger vers la formation
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            🔥 Challenge 7 Jours Limitless
          </h1>
          <div></div>
        </div>

        {/* Timer urgent */}
        <div className="mb-8">
          <ChallengeTimer expirationDate={expirationDate} isExpired={isExpired} />
        </div>

        {/* Stats Panel */}
        <div className="mb-8">
          <StatsPanel
            completedChallenges={completedChallenges}
            totalChallenges={challenges.length}
            totalPoints={totalPoints}
            currentDay={currentDay}
            totalDays={7}
            ranking={3}
            progressPercentage={progressPercentage}
          />
        </div>

        {/* Reward Section */}
        <div className="mb-8">
          <RewardSection
            formationValue="197€"
            progressPercentage={progressPercentage}
            isUnlocked={progressPercentage >= 90}
            onClaim={handleClaimReward}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Grille des challenges */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                🎯 Tes Challenges
              </h2>
              <ChallengeGrid challenges={challenges} onChallengeClick={handleChallengeClick} />
            </div>

            {/* Formulaire du challenge sélectionné */}
            {selectedChallenge && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  📝 Challenge du Jour
                </h2>
                <ChallengeForm
                  challengeId={selectedChallenge}
                  challengeTitle={challenges.find(c => c.id === selectedChallenge)?.title || ''}
                  onSubmit={handleFormSubmit}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Timeline */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">📅 Timeline</h2>
              <Timeline
                currentDay={currentDay}
                startDate={startDate}
                isExpired={isExpired}
              />
            </div>

            {/* Leaderboard */}
            <div>
              <Leaderboard entries={leaderboardData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
