import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Player } from '@/types/game';
import { Trophy, Star, Zap, Target, TrendingUp, Shield,Lock, User } from 'lucide-react';

interface PlayerStatsProps {
  player: Player;
}

export const PlayerStats = ({ player }: PlayerStatsProps) => {
  const xpForCurrentLevel = player.level * 100;
  const xpForNextLevel = (player.level + 1) * 100;
  const progressToNextLevel = ((player.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'gold': return 'bg-xp-gold text-black';
      case 'silver': return 'bg-xp-silver text-black';
      case 'bronze': return 'bg-xp-bronze text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

 return (
  <div className="space-y-6">

    {/* ------------------------- */}
    {/* Dynamic Healthcare Cards */}
    {/* ------------------------- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {[
        {
          icon: Shield,
          title: "HIPAA Compliance",
          description: "Learn essential data protection practices for healthcare",
        },
        {
          icon: Lock,
          title: "Threat Awareness",
          description:
            "Identify and prevent phishing, ransomware, and social engineering",
        },
        {
          icon: User,
          title: "Personalized Coaching",
          description:
            "AI-powered guidance tailored to your role and experience",
        },
      ].map((card, index) => {
        const Icon = card.icon;

        return (
          <Card key={index}>
            <CardHeader className="flex flex-col items-start space-y-2 pb-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>

    {/* -------------------------------- */}
    {/* Badges & Weak Areas Section */}
    {/* -------------------------------- */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Badges */}
      {player.badges.length > 0 && (
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Badges Earned ({player.badges.length})
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-2">
              {player.badges.map((badge) => (
                <Badge
                  key={badge.id}
                  variant="secondary"
                  className={`${getBadgeColor(badge.rarity)} flex items-center gap-1`}
                >
                  <span>{badge.icon}</span>
                  {badge.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  </div>
);
};