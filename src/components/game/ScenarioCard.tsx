import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scenario } from '@/types/game';
import { Shield, AlertTriangle, Target } from 'lucide-react';
import { useState, useRef } from 'react';

interface ScenarioCardProps {
  scenario: Scenario;
  onStart: (scenario: Scenario) => void;
  isCompleted?: boolean;
}

export const ScenarioCard = ({ scenario, onStart, isCompleted = false }: ScenarioCardProps) => {

  // -------------------------
  // VIDEO CONTROL LOGIC
  // -------------------------
  const [videoCompleted, setVideoCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  // -------------------------

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

  const getThreatLevel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Low';
      case 'intermediate': return 'Medium';
      case 'advanced': return 'High';
      default: return 'Unknown';
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

        {/* <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span>Threat: {getThreatLevel(scenario.difficulty)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>Max Points: {scenario.maxPoints}</span>
          </div>
        </div> */}

        {/* <div className="flex flex-wrap gap-1">
          {scenario.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {scenario.evidence && (
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Evidence Available:</span>
            </div>
            <ul className="list-disc list-inside ml-6 mt-1">
              {scenario.evidence.emails && <li>{scenario.evidence.emails.length} email(s)</li>}
              {scenario.evidence.logs && <li>{scenario.evidence.logs.length} log entr(y/ies)</li>}
              {scenario.evidence.alerts && <li>{scenario.evidence.alerts.length} alert(s)</li>}
            </ul>
          </div>
        )} */}

        {/* ------------------------------
            LOCAL VIDEO & START CONTROL
        -------------------------------- */}
        {scenario.videoUrl && (
          <div className="w-full rounded-lg overflow-hidden border">

            <video
              ref={videoRef}
              src={scenario.videoUrl}
              className="w-full h-full cursor-pointer"
              controls={false}                 // no default controls
              onClick={handleVideoPlay}         // user must click to start
              onEnded={() => setVideoCompleted(true)} // enable start when done
            />

            {!videoCompleted && (
              <p className="text-xs text-center text-muted-foreground mt-1">
               
              </p>
            )}
          </div>
        )}

        {/* START BUTTON (now controlled by video end) */}
        <Button 
          onClick={() => onStart(scenario)} 
          className="w-full"
          disabled={!videoCompleted}   // disabled until video fully watched
        >
          {videoCompleted ? 'Start' : 'Watch the video to continue'}
        </Button>

      </CardContent>
    </Card>
  );
};
