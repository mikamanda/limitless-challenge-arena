
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Award, Timer, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Limitless
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8">
            Challenge Arena - Transforme tes défis en victoires
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">
                🔥 Challenge 5 Jours Limitless
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-purple-200 text-lg">
                Rejoins le challenge gamifié et débloque une formation exclusive de 197€ !
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-6 backdrop-blur-sm">
                  <Timer className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-white font-bold mb-2">7 Jours Maximum</h3>
                  <p className="text-gray-300 text-sm">Compte à rebours en temps réel</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6 backdrop-blur-sm">
                  <Star className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-bold mb-2">5 Challenges</h3>
                  <p className="text-gray-300 text-sm">Gamification et points</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg p-6 backdrop-blur-sm">
                  <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-bold mb-2">Formation 197€</h3>
                  <p className="text-gray-300 text-sm">Déblocage à 90% de progression</p>
                </div>
              </div>

              <Button
                onClick={() => navigate('/challenge')}
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
              >
                🚀 Commencer le Challenge
              </Button>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-bold mb-4">✨ Fonctionnalités</h3>
                <ul className="text-purple-200 space-y-2 text-sm">
                  <li>• Timer d'expiration urgent</li>
                  <li>• Grille de 5 challenges interactifs</li>
                  <li>• Timeline des 7 jours</li>
                  <li>• Formulaires dynamiques par défi</li>
                  <li>• Dashboard de statistiques</li>
                  <li>• Leaderboard communautaire</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-bold mb-4">🎯 Gamification</h3>
                <ul className="text-purple-200 space-y-2 text-sm">
                  <li>• Points par challenge complété</li>
                  <li>• Système de progression</li>
                  <li>• Classement en temps réel</li>
                  <li>• Animations de succès</li>
                  <li>• Badges et récompenses</li>
                  <li>• États visuels dynamiques</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
