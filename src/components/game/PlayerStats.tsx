import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Player } from '@/types/game';
import { Trophy, Star, Zap, Target, TrendingUp } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Level & XP */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Level & XP</CardTitle>
          <Star className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Level {player.level}</div>
          <p className="text-xs text-muted-foreground mb-2">
            {player.xp} / {xpForNextLevel} XP
          </p>
          <Progress value={progressToNextLevel} className="h-2" />
        </CardContent>
      </Card>

      {/* Total Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Score</CardTitle>
          <Trophy className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{player.totalScore.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {player.weeklyStats.scenariosCompleted} scenarios this week
          </p>
        </CardContent>
      </Card>

      {/* Current Streak */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Zap className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{player.currentStreak}</div>
          <p className="text-xs text-muted-foreground">
            {player.weeklyStats.correctResponses} correct this week
          </p>
        </CardContent>
      </Card>

      {/* Weekly Average */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(player.weeklyStats.averageScore)}
          </div>
          <p className="text-xs text-muted-foreground">
            {player.weeklyStats.correctResponses}/{player.weeklyStats.scenariosCompleted} success rate
          </p>
        </CardContent>
      </Card>

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

      {/* Weak Areas */}
      {player.weakAreas.length > 0 && (
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {player.weakAreas.map((area, index) => (
                <Badge key={index} variant="outline" className="text-warning border-warning">
                  {area.replace('_', ' ').toUpperCase()}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Focus on these areas to improve your cybersecurity skills
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};