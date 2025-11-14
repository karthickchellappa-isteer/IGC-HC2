import { useState, useCallback, useEffect } from 'react';
import { Player, Scenario, GameSession, Choice, Feedback, Badge } from '@/types/game';
import { toast } from '@/hooks/use-toast';

const INITIAL_PLAYER: Player = {
  id: 'player-1',
  name: 'Cyber Defender',
  level: 1,
  xp: 0,
  totalScore: 0,
  badges: [],
  currentStreak: 0,
  weeklyStats: {
    scenariosCompleted: 0,
    correctResponses: 0,
    averageScore: 0,
  },
  weakAreas: [],
  completedScenarios: [],
};

const INITIAL_SESSION: GameSession = {
  currentScenario: null,
  selectedChoice: null,
  showFeedback: false,
  sessionScore: 0,
  scenariosCompleted: 0,
  startTime: new Date(),
};

export const useGameState = () => {
  const [player, setPlayer] = useState<Player>(INITIAL_PLAYER);
  const [session, setSession] = useState<GameSession>(INITIAL_SESSION);

  // Load player data from localStorage
  useEffect(() => {
    const savedPlayer = localStorage.getItem('cyberDefenderPlayer');
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer));
    }
  }, []);

  // Save player data to localStorage
  useEffect(() => {
    localStorage.setItem('cyberDefenderPlayer', JSON.stringify(player));
  }, [player]);

  const calculateXPForLevel = useCallback((level: number) => {
    return level * 100; // Simple XP calculation
  }, []);

  const checkLevelUp = useCallback((currentXP: number, currentLevel: number) => {
    const xpNeeded = calculateXPForLevel(currentLevel + 1);
    return currentXP >= xpNeeded;
  }, [calculateXPForLevel]);

  const checkBadgeEarning = useCallback((player: Player, scenario: Scenario, choice: Choice): Badge | null => {
    // Check for various badge conditions
    if (choice.isCorrect && scenario.difficulty === 'advanced' && 
        !player.badges.some(b => b.id === 'advanced-defender')) {
      return {
        id: 'advanced-defender',
        name: 'Advanced Defender',
        description: 'Successfully handled an advanced threat',
        icon: '🛡️',
        rarity: 'gold',
        unlockedAt: new Date(),
      };
    }

    if (player.currentStreak >= 5 && !player.badges.some(b => b.id === 'streak-master')) {
      return {
        id: 'streak-master',
        name: 'Streak Master',
        description: 'Achieved a 5-scenario winning streak',
        icon: '🔥',
        rarity: 'silver',
        unlockedAt: new Date(),
      };
    }

    if (scenario.type === 'phishing' && choice.isCorrect && 
        !player.badges.some(b => b.id === 'phishing-hunter')) {
      return {
        id: 'phishing-hunter',
        name: 'Phishing Hunter',
        description: 'Correctly identified a phishing attempt',
        icon: '🎣',
        rarity: 'bronze',
        unlockedAt: new Date(),
      };
    }

    return null;
  }, []);

  const startScenario = useCallback((scenario: Scenario) => {
    setSession(prev => ({
      ...prev,
      currentScenario: scenario,
      selectedChoice: null,
      showFeedback: false,
    }));
  }, []);

  const selectChoice = useCallback((choice: Choice) => {
    setSession(prev => ({
      ...prev,
      selectedChoice: choice,
    }));
  }, []);

  const submitChoice = useCallback((): Feedback | null => {
    if (!session.currentScenario || !session.selectedChoice) return null;

    const { currentScenario, selectedChoice } = session;
    const isCorrect = selectedChoice.isCorrect;
    const points = isCorrect ? selectedChoice.points : Math.max(1, Math.floor(selectedChoice.points * 0.3));

    // Check for badge earning
    const badgeEarned = checkBadgeEarning(player, currentScenario, selectedChoice);

    // Update player stats
    setPlayer(prev => {
      const newXP = prev.xp + points;
      const newLevel = checkLevelUp(newXP, prev.level) ? prev.level + 1 : prev.level;
      const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const newBadges = badgeEarned ? [...prev.badges, badgeEarned] : prev.badges;

      const updatedWeeklyStats = {
        scenariosCompleted: prev.weeklyStats.scenariosCompleted + 1,
        correctResponses: prev.weeklyStats.correctResponses + (isCorrect ? 1 : 0),
        averageScore: (prev.weeklyStats.averageScore * prev.weeklyStats.scenariosCompleted + points) / 
                     (prev.weeklyStats.scenariosCompleted + 1),
      };

      // Track weak areas
      const newWeakAreas = [...prev.weakAreas];
      if (!isCorrect && !newWeakAreas.includes(currentScenario.type)) {
        newWeakAreas.push(currentScenario.type);
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        totalScore: prev.totalScore + points,
        currentStreak: newStreak,
        badges: newBadges,
        weeklyStats: updatedWeeklyStats,
        weakAreas: newWeakAreas.slice(-5), // Keep only recent weak areas
        completedScenarios: [...prev.completedScenarios, currentScenario.id],
      };
    });

    // Update session
    setSession(prev => ({
      ...prev,
      showFeedback: true,
      sessionScore: prev.sessionScore + points,
      scenariosCompleted: prev.scenariosCompleted + 1,
    }));

    // Show notifications
    if (badgeEarned) {
      toast({
        title: "Badge Earned! 🎉",
        description: `${badgeEarned.name}: ${badgeEarned.description}`,
      });
    }

    if (checkLevelUp(player.xp + points, player.level)) {
      toast({
        title: "Level Up! 📈",
        description: `Congratulations! You've reached level ${player.level + 1}`,
      });
    }

    const feedback: Feedback = {
      isCorrect,
      points,
      explanation: selectedChoice.explanation,
      bestPractice: getBestPracticeForScenario(currentScenario),
      consequence: selectedChoice.consequence,
      nextSteps: getNextStepsForChoice(selectedChoice, currentScenario),
      relatedTopics: getRelatedTopics(currentScenario),
      badgeEarned,
    };

    return feedback;
  }, [session, player, checkBadgeEarning, checkLevelUp]);

  const nextScenario = useCallback(() => {
    setSession(prev => ({
      ...prev,
      currentScenario: null,
      selectedChoice: null,
      showFeedback: false,
    }));
  }, []);

  const resetSession = useCallback(() => {
    setSession(INITIAL_SESSION);
  }, []);

  return {
    player,
    session,
    startScenario,
    selectChoice,
    submitChoice,
    nextScenario,
    resetSession,
  };
};

// Helper functions
const getBestPracticeForScenario = (scenario: Scenario): string => {
  const practices = {
    phishing: "Always verify sender identity through separate communication channels before clicking links or providing credentials.",
    ransomware: "Maintain regular backups, keep systems updated, and implement network segmentation to limit damage.",
    sql_injection: "Use parameterized queries, input validation, and principle of least privilege for database access.",
    insider_threat: "Implement proper access controls, monitor user behavior, and maintain clear security policies.",
    social_engineering: "Verify requests through official channels and be skeptical of urgent requests for sensitive information.",
    malware: "Keep antivirus updated, avoid suspicious downloads, and use application whitelisting when possible.",
  };
  return practices[scenario.type] || "Follow your organization's security policies and procedures.";
};

const getNextStepsForChoice = (choice: Choice, scenario: Scenario): string[] => {
  if (choice.isCorrect) {
    return [
      "Document the incident for future reference",
      "Share lessons learned with your team",
      "Review and update security procedures if needed",
    ];
  } else {
    return [
      "Review the correct response procedure",
      "Practice similar scenarios to improve",
      `Study more about ${scenario.type} attacks`,
      "Consult with security team for guidance",
    ];
  }
};

const getRelatedTopics = (scenario: Scenario): string[] => {
  const topics = {
    phishing: ["Email Security", "Social Engineering", "Identity Verification"],
    ransomware: ["Backup Strategies", "Incident Response", "Network Security"],
    sql_injection: ["Web Security", "Database Security", "Input Validation"],
    insider_threat: ["Access Control", "User Monitoring", "Security Awareness"],
    social_engineering: ["Human Psychology", "Verification Procedures", "Security Culture"],
    malware: ["Endpoint Protection", "Network Monitoring", "Threat Intelligence"],
  };
  return topics[scenario.type] || ["General Security"];
};