import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scenario, Choice } from '@/types/game';
import { Mail, FileText, AlertTriangle, Building, User, MapPin } from 'lucide-react';
import { SecureVideoPlayer } from '../SecureVideoPlayer';

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


      {/* Training Video - NON SKIPPABLE */}
      {scenario.videoUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Training Video (Required)
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              You must watch the full video before continuing. Skipping is disabled.
            </p>
          </CardHeader>
          <CardContent>
            <SecureVideoPlayer 
              videoUrl={scenario.videoUrl}
              onComplete={() => {
                // This runs when video finishes
                console.log("User watched full video!");
                // You can save progress here later
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Response Choices */}
      <Card>
        <CardHeader>
          <CardTitle>Your Response</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose your action as a cybersecurity professional
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {scenario.choices.map((choice) => (
            <Card
              key={choice.id}
              className={`cursor-pointer transition-all ${getChoiceStyle(choice)}`}
              onClick={() => !showFeedback && onChoiceSelect(choice)}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs">
                    {String.fromCharCode(65 + scenario.choices.indexOf(choice))}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{choice.text}</h4>
                    {choice.description && (
                      <p className="text-sm text-muted-foreground">{choice.description}</p>
                    )}
                    {showFeedback && selectedChoice?.id === choice.id && (
                      <div className="mt-3 p-3 rounded-lg bg-muted">
                        <p className="text-sm font-medium text-foreground">
                          {choice.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {choice.explanation}
                        </p>
                        {choice.consequence && (
                          <p className="text-sm text-destructive mt-2">
                            <strong>Consequence:</strong> {choice.consequence}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {selectedChoice && !showFeedback && (
            <Button onClick={onSubmit} className="w-full" size="lg">
              Submit Response
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};