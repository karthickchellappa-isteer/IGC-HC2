import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Feedback } from '@/types/game';
import { CheckCircle, XCircle, Trophy, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';

interface FeedbackDisplayProps {
  feedback: Feedback;
  onNextScenario: () => void;
}

export const FeedbackDisplay = ({ feedback, onNextScenario }: FeedbackDisplayProps) => {
  return (
    <div className="space-y-6">
      {/* Result Header */}
      <Card className={`border-2 ${feedback.isCorrect ? 'border-success' : 'border-destructive'}`}>
        <CardHeader>
          <div className="flex items-center gap-4">
            {feedback.isCorrect ? (
              <CheckCircle className="h-8 w-8 text-success" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            <div>
              <CardTitle className="text-2xl">
                {feedback.isCorrect ? 'Excellent Work!' : 'Learning Opportunity'}
              </CardTitle>
              <p className="text-muted-foreground">
                You earned <strong>{feedback.points} points</strong> for this scenario
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Badge Earned */}
      {feedback.badgeEarned && (
        <Card className="border-xp-gold bg-gradient-to-r from-xp-gold/10 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-xp-gold" />
              New Badge Earned!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{feedback.badgeEarned.icon}</span>
              <div>
                <h3 className="font-semibold text-lg">{feedback.badgeEarned.name}</h3>
                <p className="text-muted-foreground">{feedback.badgeEarned.description}</p>
                <Badge className="mt-1 bg-xp-gold text-black">
                  {feedback.badgeEarned.rarity.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Your Decision</h4>
            <p className="text-foreground">{feedback.explanation}</p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold mb-2">Security Best Practice</h4>
            <p className="text-foreground">{feedback.bestPractice}</p>
          </div>

          {feedback.consequence && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2 text-destructive">Real-World Impact</h4>
                <p className="text-foreground">{feedback.consequence}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feedback.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <span className="text-foreground">{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Related Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Related Learning Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {feedback.relatedTopics.map((topic, index) => (
              <Badge key={index} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Consider studying these topics to enhance your cybersecurity knowledge
          </p>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button onClick={onNextScenario} size="lg" className="px-8">
          Continue to Next Mission
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};