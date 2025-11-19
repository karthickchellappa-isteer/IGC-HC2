export interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  totalScore: number;
  badges: Badge[];
  currentStreak: number;
  weeklyStats: {
    scenariosCompleted: number;
    correctResponses: number;
    averageScore: number;
  };
  weakAreas: string[];
  completedScenarios: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'bronze' | 'silver' | 'gold';
  unlockedAt: Date;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  type: 'phishing' | 'ransomware' | 'sql_injection' | 'insider_threat' | 'social_engineering' | 'malware';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  context: string;
  videoUrl?: string;
  quizUrl?: string;
  evidence?: {
    emails?: Email[];
    logs?: LogEntry[];
    alerts?: Alert[];
    images?: string[];
  };
  choices: Choice[];
  correctChoiceId: string;
  maxPoints: number;
  tags: string[];
  story?: {
    companyName: string;
    role: string;
    setting: string;
  };
}

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  suspicious: boolean;
  attachments?: string[];
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  source: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  ip?: string;
  user?: string;
}

export interface Alert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  description: string;
  source: string;
  status: 'new' | 'investigating' | 'resolved';
}

export interface Choice {
  id: string;
  text: string;
  description?: string;
  isCorrect: boolean;
  points: number;
  consequence?: string;
  explanation: string;
  followUp?: string;
}

export interface GameSession {
  currentScenario: Scenario | null;
  selectedChoice: Choice | null;
  showFeedback: boolean;
  sessionScore: number;
  scenariosCompleted: number;
  startTime: Date;
}

export interface Feedback {
  isCorrect: boolean;
  points: number;
  explanation: string;
  bestPractice: string;
  consequence?: string;
  nextSteps: string[];
  relatedTopics: string[];
  badgeEarned?: Badge;
}