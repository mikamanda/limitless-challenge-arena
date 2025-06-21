
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Gift, Sparkles, Lock } from 'lucide-react';

interface RewardSectionProps {
  formationValue: string;
  progressPercentage: number;
  isUnlocked: boolean;
  onClaim?: () => void;
}

const RewardSection: React.FC<RewardSectionProps> = ({
  formationValue,
  progressPercentage,
  isUnlocked,
  onClaim
}) => {
  return (
    <Card className={`relative overflow-hidden ${
      isUnlocked 
        ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400/50' 
        : 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400/30'
    }`}>
      {/* Animation brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      
      <CardHeader className="text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          {isUnlocked ? (
            <Gift className="w-8 h-8 text-green-400" />
          ) : (
            <Lock className="w-8 h-8 text-purple-400" />
          )}
          <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
        </div>
        <CardTitle className="text-white text-2xl">
          {isUnlocked ? '🎉 Formation Débloquée !' : '🎁 Formation à Débloquer'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-2">
            {formationValue}
          </div>
          <p className="text-white font-medium">Formation Exclusive Limitless</p>
          <p className="text-gray-300 text-sm mt-2">
            Accès à vie • Contenu premium • Communauté VIP
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white">Progression</span>
            <span className={`font-bold ${isUnlocked ? 'text-green-400' : 'text-yellow-400'}`}>
              {progressPercentage}%
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className={`h-4 ${isUnlocked ? 'bg-green-900' : 'bg-purple-900'}`} 
          />
          <p className="text-center text-sm">
            {isUnlocked ? (
              <span className="text-green-400 font-medium">🎉 Félicitations ! Vous avez débloqué la formation !</span>
            ) : (
              <span className="text-gray-300">
                {90 - progressPercentage}% restant pour débloquer
              </span>
            )}
          </p>
        </div>

        {isUnlocked ? (
          <Button
            onClick={onClaim}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 animate-pulse"
          >
            🎁 Récupérer ma Formation
          </Button>
        ) : (
          <Button
            disabled
            className="w-full bg-gray-600 text-gray-400 cursor-not-allowed py-3"
          >
            <Lock className="w-4 h-4 mr-2" />
            Formation Verrouillée
          </Button>
        )}

        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <h4 className="text-white font-bold mb-2">🚀 Cette formation inclut :</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• 12 modules de formation premium</li>
            <li>• Accès à la communauté VIP</li>
            <li>• Support personnalisé</li>
            <li>• Bonus exclusifs et outils</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardSection;
