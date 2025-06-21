
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface ChallengeTimerProps {
  expirationDate: Date;
  isExpired: boolean;
}

const ChallengeTimer: React.FC<ChallengeTimerProps> = ({ expirationDate, isExpired }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = expirationDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationDate]);

  if (isExpired) {
    return (
      <Card className="bg-red-500/20 backdrop-blur-md border-red-400/30 max-w-md mx-auto">
        <CardContent className="text-center p-6">
          <Clock className="w-8 h-8 text-red-300 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-white mb-2">EXPIRÉ</h3>
          <p className="text-red-100">Le challenge est terminé</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-red-500/30 to-orange-500/30 backdrop-blur-md border-orange-400/30 max-w-md mx-auto animate-pulse">
      <CardContent className="text-center p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-white" />
          <h3 className="text-lg font-bold text-white">TEMPS RESTANT</h3>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="bg-white/30 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-xs text-white font-medium">JOURS</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/30 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-xs text-white font-medium">HEURES</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/30 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-xs text-white font-medium">MIN</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/30 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-xs text-white font-medium">SEC</div>
            </div>
          </div>
        </div>
        
        <p className="text-white text-sm font-medium">
          Challenge expire le {expirationDate.toLocaleDateString('fr-FR')} à {expirationDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </CardContent>
    </Card>
  );
};

export default ChallengeTimer;
