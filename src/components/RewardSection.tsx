
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Sparkles } from 'lucide-react';

interface RewardSectionProps {
  progressPercentage: number;
  isCompleted: boolean;
  rewardValue: string;
}

const RewardSection: React.FC<RewardSectionProps> = ({
  progressPercentage,
  isCompleted,
  rewardValue
}) => {
  return (
    <Card className={`
      ${isCompleted 
        ? 'bg-gradient-to-br from-green-400/30 to-emerald-500/30 border-green-400/50 animate-pulse' 
        : 'bg-gradient-to-br from-yellow-400/30 to-orange-500/30 border-yellow-400/50'
      } 
      backdrop-blur-md relative overflow-hidden
    `}>
      {/* Sparkle animation overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-8 animate-ping">
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </div>
        <div className="absolute top-12 right-12 animate-ping delay-500">
          <Star className="w-3 h-3 text-orange-300" />
        </div>
        <div className="absolute bottom-8 left-16 animate-ping delay-1000">
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </div>
        <div className="absolute bottom-4 right-8 animate-ping delay-700">
          <Star className="w-4 h-4 text-orange-300" />
        </div>
      </div>

      <CardContent className="p-8 text-center relative z-10">
        <div className="mb-6">
          <Award className={`w-16 h-16 mx-auto mb-4 ${
            isCompleted ? 'text-green-400' : 'text-yellow-400'
          }`} />
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Formation Exclusive
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-red-500 text-white font-bold text-lg px-4 py-2">
              Valeur {rewardValue}
            </Badge>
            <Badge className="bg-green-500 text-white font-bold text-lg px-4 py-2">
              GRATUITE
            </Badge>
          </div>
          
          <p className="text-gray-200 max-w-md mx-auto">
            "Les Secrets de la Croissance Limitless" - Formation avancée pour passer au niveau supérieur
          </p>
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          {isCompleted ? (
            <div className="space-y-4">
              <div className="text-green-300 text-xl font-bold animate-bounce">
                🎉 FORMATION DÉBLOQUÉE ! 🎉
              </div>
              <Progress value={100} className="h-4 bg-white/20" />
              <p className="text-green-200">
                Félicitations ! Ta formation t'attend dans ton espace membre.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Progression vers le déblocage</span>
                <span className="text-yellow-300 font-bold">{progressPercentage}%</span>
              </div>
              
              <Progress 
                value={progressPercentage} 
                className="h-4 bg-white/20"
              />
              
              <div className="text-yellow-200">
                {progressPercentage >= 90 ? (
                  <span className="animate-pulse font-medium">
                    ✨ Plus qu'un challenge pour débloquer ! ✨
                  </span>
                ) : (
                  <span>
                    {Math.ceil((90 - progressPercentage) / 18)} challenges restants 
                    <span className="text-yellow-400 font-medium"> (90% requis)</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Reward Features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-yellow-400 font-medium">🎯 Stratégies avancées</div>
            <div className="text-gray-300">Techniques exclusives</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-yellow-400 font-medium">🚀 Cas d'études</div>
            <div className="text-gray-300">Exemples concrets</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-yellow-400 font-medium">💡 Templates</div>
            <div className="text-gray-300">Outils prêts à l'emploi</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardSection;
