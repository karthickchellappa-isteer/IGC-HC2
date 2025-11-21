import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scenario, Choice } from '@/types/game';
import { Mail, FileText, AlertTriangle, Building, User, MapPin } from 'lucide-react';
// import { SecureVideoPlayer } from '../SecureVideoPlayer';

interface ScenarioDisplayProps {
  scenario: Scenario;
  selectedChoice: Choice | null;
  onChoiceSelect: (choice: Choice) => void;
  onSubmit: () => void;
  showFeedback: boolean;
}

export const ScenarioDisplay = ({ 
  scenario, 
  selectedChoice, 
  onChoiceSelect, 
  onSubmit, 
  showFeedback 
}: ScenarioDisplayProps) => {
  const getChoiceStyle = (choice: Choice) => {
    if (!selectedChoice || selectedChoice.id !== choice.id) {
      return "border-border hover:border-primary";
    }
    
    if (showFeedback) {
      return choice.isCorrect 
        ? "border-success bg-success/5" 
        : "border-destructive bg-destructive/5";
    }
    
    return "border-primary bg-primary/5";
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Story Context */}
      {scenario.story && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Mission Briefing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Company:</span>
                <span>{scenario.story.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Your Role:</span>
                <span>{scenario.story.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Setting:</span>
                <span>{scenario.story.setting}</span>
              </div>
            </div>
            <Separator />
            <p className="text-foreground">{scenario.context}</p>
          </CardContent>
        </Card>
      )}

      {/* Scenario Description */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{scenario.title}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">{scenario.type.replace('_', ' ')}</Badge>
              <Badge variant="secondary">{scenario.difficulty}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-foreground">{scenario.description}</p>
        </CardContent>
      </Card>

      {/* Google Quiz Link (Dynamic) */}
      {scenario.quizUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📘 Quiz Check
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Complete this quiz.
            </p>
          </CardHeader>
          <CardContent>
            <Button 
              asChild 
              variant="secondary"
              className="w-full"
            >
              <a href={scenario.quizUrl} target="_blank" rel="noopener noreferrer">
                Open Google Quiz
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Response Choices */}
      <Card>
        <CardHeader>
          <CardTitle>--</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose your quiz's as a cybersecurity professional
          </p>
        </CardHeader>
      </Card>
    </div>
  );
};