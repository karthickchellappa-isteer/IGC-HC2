import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PlayerStats } from './PlayerStats';
import { ScenarioCard } from './ScenarioCard';
import { ScenarioDisplay } from './ScenarioDisplay';
import { FeedbackDisplay } from './FeedbackDisplay';
import { useGameState } from '@/hooks/useGameState';
import { scenarios, getRecommendedScenario } from '@/data/scenarios';
import { Scenario } from '@/types/game';
import { Shield, Play, RotateCcw, Home } from 'lucide-react';

type GameState = 'menu' | 'scenario-select' | 'playing' | 'feedback';

export const GameInterface = () => {
  const {
    player,
    session,
    startScenario,
    selectChoice,
    submitChoice,
    nextScenario,
    resetSession,
  } = useGameState();
  
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentFeedback, setCurrentFeedback] = useState(null);

  const handleStartScenario = (scenario: Scenario) => {
    startScenario(scenario);
    setGameState('playing');
  };

  const handleSubmitChoice = () => {
    const feedback = submitChoice();
    if (feedback) {
      setCurrentFeedback(feedback);
      setGameState('feedback');
    }
  };

  const handleNextScenario = () => {
    nextScenario();
    setCurrentFeedback(null);
    setGameState('scenario-select');
  };

  const handleBackToMenu = () => {
    resetSession();
    setCurrentFeedback(null);
    setGameState('menu');
  };

  const getRecommendedScenarios = () => {
    const recommended = getRecommendedScenario(player);
    const otherScenarios = scenarios.filter(s => s.id !== recommended?.id).slice(0, 5);
    return recommended ? [recommended, ...otherScenarios] : scenarios.slice(0, 6);
  };

  const renderMenu = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
            <div className="bg-cyan-400 p-4 inline-block rounded-xl shadow-lg">
              {/* The Shield icon itself, now white */}
              <Shield className="h-12 w-12 text-white" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* 2. Main Title: Updated text, with "CyberGuard" slightly darker */}
          <h1 className="text-5xl font-bold text-slate-800 tracking-tight">
            <span className="text-slate-900">CyberGuard</span> AI Awareness Coach
          </h1>
          
          {/* 3. Subtitle: Updated descriptive text */}
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your personal cybersecurity expert for healthcare. Learn to protect patient
            data, recognize threats through interactive AI coaching.
          </p>
      </div>

      <PlayerStats player={player} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setGameState('scenario-select')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Start Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Choose from various cybersecurity scenarios and test your skills
            </p>
           <Button className="w-full bg-white text-black border border-blue hover:bg-gray-100" variant="outline">
              Browse
            </Button>

          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => {
          const recommended = getRecommendedScenario(player);
          if (recommended) handleStartScenario(recommended);
        }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Quick quiz 
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Jump into a quiz tailored to your skill level and weak areas
            </p>
            <Button className="w-full" variant="outline">
              Start Recommended quiz
            </Button>
          </CardContent>
        </Card>
      </div>

      {session.scenariosCompleted > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Current Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{session.scenariosCompleted}</div>
                <div className="text-sm text-muted-foreground">Scenarios</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{session.sessionScore}</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round((session.sessionScore / (session.scenariosCompleted * 200)) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Average</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderScenarioSelect = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Choose Your Mission</h2>
          <p className="text-muted-foreground">Select a cybersecurity scenario to practice</p>
        </div>
        <Button variant="outline" onClick={handleBackToMenu}>
          <Home className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {getRecommendedScenarios().map((scenario, index) => (
          <div key={scenario.id} className="relative">
            {index === 0 && (
              <Badge className="absolute -top-2 -right-2 z-10 bg-primary">
                Recommended
              </Badge>
            )}
            <ScenarioCard
              scenario={scenario}
              onStart={handleStartScenario}
              isCompleted={player.completedScenarios.includes(scenario.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlaying = () => {
    if (!session.currentScenario) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Active Mission</h2>
            <p className="text-muted-foreground">
              Session Score: {session.sessionScore} • Scenarios: {session.scenariosCompleted}
            </p>
          </div>
          <Button variant="outline" onClick={handleBackToMenu}>
            <Home className="h-4 w-4 mr-2" />
            End Session
          </Button>
        </div>

        <ScenarioDisplay
          scenario={session.currentScenario}
          selectedChoice={session.selectedChoice}
          onChoiceSelect={selectChoice}
          onSubmit={handleSubmitChoice}
          showFeedback={session.showFeedback}
        />
      </div>
    );
  };

  const renderFeedback = () => {
    if (!currentFeedback) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Mission Complete</h2>
            <p className="text-muted-foreground">
              Session Score: {session.sessionScore} • Scenarios: {session.scenariosCompleted}
            </p>
          </div>
          <Button variant="outline" onClick={handleBackToMenu}>
            <Home className="h-4 w-4 mr-2" />
            End Session
          </Button>
        </div>

        <FeedbackDisplay
          feedback={currentFeedback}
          onNextScenario={handleNextScenario}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {gameState === 'menu' && renderMenu()}
        {gameState === 'scenario-select' && renderScenarioSelect()}
        {gameState === 'playing' && renderPlaying()}
        {gameState === 'feedback' && renderFeedback()}
      </div>
    </div>
  );
};