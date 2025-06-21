
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

interface ChallengeFormProps {
  challengeId: number;
  challengeTitle: string;
  onSubmit: (data: FormData) => void;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({ challengeId, challengeTitle, onSubmit }) => {
  const [formData, setFormData] = useState({
    url: '',
    comment: '',
    file: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('challengeId', challengeId.toString());
    data.append('url', formData.url);
    data.append('comment', formData.comment);
    if (formData.file) {
      data.append('file', formData.file);
    }
    onSubmit(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-center">
          {challengeTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">URL (Post Instagram, etc.)</Label>
            <Input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://instagram.com/p/..."
              className="bg-white/20 border-white/30 text-white placeholder-gray-300"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Upload Screenshot</Label>
            <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-white mx-auto mb-2" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-white hover:text-yellow-400"
              >
                Cliquez pour uploader une image
              </label>
              {formData.file && (
                <p className="text-green-400 mt-2">{formData.file.name}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-white mb-2 block">Commentaire</Label>
            <Textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Décrivez votre réalisation..."
              className="bg-white/20 border-white/30 text-white placeholder-gray-300"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold"
          >
            Soumettre le Challenge
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChallengeForm;
