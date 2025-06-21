
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Upload } from 'lucide-react';

interface ChallengeFormProps {
  challenge: {
    id: number;
    title: string;
    description: string;
    type: string;
    points: number;
  };
  onSubmit: (challengeId: number, data: any) => void;
  isCompleted: boolean;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({ 
  challenge, 
  onSubmit, 
  isCompleted 
}) => {
  const [formData, setFormData] = useState({
    url: '',
    comment: '',
    screenshot: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompleted) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      onSubmit(challenge.id, formData);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, screenshot: file }));
    }
  };

  if (isCompleted) {
    return (
      <Card className="bg-green-500/20 border-green-400/30">
        <CardContent className="p-6 text-center">
          <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-300 mb-2">
            Challenge Complété ! 🎉
          </h3>
          <p className="text-green-200 mb-4">
            Bravo ! Tu as gagné {challenge.points} points
          </p>
          <Badge className="bg-green-500 text-white">
            +{challenge.points} points
          </Badge>
        </CardContent>
      </Card>
    );
  }

  // Different form fields based on challenge type
  const renderFormFields = () => {
    switch (challenge.type) {
      case 'social':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="url" className="text-white">
                URL de ton post Instagram *
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://instagram.com/p/..."
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="screenshot" className="text-white">
                Screenshot de ton post
              </Label>
              <div className="relative">
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-white/10 border-white/20 text-white file:bg-purple-500 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
                />
                <Upload className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
              {formData.screenshot && (
                <p className="text-green-400 text-sm">
                  ✓ Fichier sélectionné: {formData.screenshot.name}
                </p>
              )}
            </div>
          </>
        );
        
      case 'reflection':
        return (
          <div className="space-y-2">
            <Label htmlFor="reflection" className="text-white">
              Partage tes réflexions *
            </Label>
            <Textarea
              id="reflection"
              placeholder="Décris ton objectif principal et pourquoi il est important pour toi..."
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              required
            />
          </div>
        );
        
      default:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="url" className="text-white">
                Lien de validation
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="Partage un lien en rapport avec le challenge..."
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="screenshot" className="text-white">
                Screenshot/Preuve
              </Label>
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-white/10 border-white/20 text-white file:bg-purple-500 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Challenge Video Placeholder */}
      <Card className="bg-black/30 border-white/10">
        <CardContent className="p-6">
          <div className="aspect-video bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
              </div>
              <p className="text-white font-medium">Vidéo du Challenge {challenge.id}</p>
              <p className="text-gray-300 text-sm">{challenge.title}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderFormFields()}
        
        <div className="space-y-2">
          <Label htmlFor="comment" className="text-white">
            Commentaire (optionnel)
          </Label>
          <Textarea
            id="comment"
            placeholder="Ajoute un commentaire sur ton expérience..."
            value={formData.comment}
            onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-yellow-400 font-medium">
            💰 +{challenge.points} points à gagner
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Envoi en cours...
              </>
            ) : (
              'Valider le Challenge'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeForm;
