import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Scenario } from "@/types/game";
import { useState, useRef, useEffect } from "react";

interface ScenarioCardProps {
  scenario: Scenario;
  onStart: (scenario: Scenario) => void;
  isCompleted?: boolean;
  activeVideo: string | null;
  setActiveVideo: (id: string | null) => void;
}

export const ScenarioCard = ({
  scenario,
  onStart,
  isCompleted = false,
  activeVideo,
  setActiveVideo,
}: ScenarioCardProps) => {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toggle play/pause when user clicks the video
  const handlePlayPause = () => {
    if (!videoRef.current) return;

    // If clicking a different video, switch active video and play
    if (activeVideo !== scenario.id) {
      setActiveVideo(scenario.id);
      videoRef.current.play();
      return;
    }

    // Toggle play/pause
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  // Pause other videos and reset completion state
  useEffect(() => {
    if (!videoRef.current) return;

    if (activeVideo !== scenario.id) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setVideoCompleted(false);
    }
  }, [activeVideo, scenario.id]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success text-success-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'F': return '🎣';
      case 'ransomware': return '🔒';
      case 'sql_injection': return '💉';
      case 'insider_threat': return '👤';
      case 'social_engineering': return '🗣️';
      case 'malware': return '🦠';
      default: return '⚠️';
    }
  };

  return (
    <Card className={`transition-all hover:shadow-lg ${isCompleted ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTypeIcon(scenario.type)}</span>
            <div>
              <CardTitle className="text-lg">{scenario.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {scenario.story?.companyName} • {scenario.story?.role}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Badge className={getDifficultyColor(scenario.difficulty)}>
              {scenario.difficulty}
            </Badge>
            {isCompleted && (
              <Badge variant="outline" className="text-success border-success">
                ✓ Completed
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-foreground">{scenario.description}</p>

        {scenario.videoUrl && (
          <div className="relative w-full rounded-lg overflow-hidden border">
            <video
              ref={videoRef}
              src={scenario.videoUrl}
              className="w-full cursor-pointer"
              controls={false}
              onClick={handlePlayPause}
              onEnded={() => setVideoCompleted(true)}
            />

            {!videoCompleted && videoRef.current?.paused && (
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black/40 cursor-pointer">
                ▶ Click to play
              </div>
            )}
          </div>
        )}

        <Button
          className="w-full"
          disabled={!videoCompleted}
          onClick={() => onStart(scenario)}
        >
          {videoCompleted ? "Start" : "Watch the video to continue"}
        </Button>
      </CardContent>
    </Card>
  );
};
