import { Scenario } from '@/types/game';

export const scenarios: Scenario[] = [
  {
    id: 'phishing-001',
    title: 'Suspicious IT Support Email',
    description: 'You receive an urgent email from IT support requesting password reset',
    type: 'phishing',
    difficulty: 'beginner',
    context: 'You work as a financial analyst at TechCorp Industries. It\'s Monday morning and you\'ve just arrived at the office.',
    videoUrl: "videos/Fake_IT_Support_Email_Targeting_Healthcare_Staff.mp4",
    quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdRSjMPOU3BYB1Oi-4clCw1u-oKf9rDXcUnk2PUreLp2lAF2g/viewform?usp=header",
    story: {
      companyName: 'TechCorp Industries',
      role: 'Financial Analyst',
      setting: 'Corporate Office Environment',
    },
    evidence: {
      emails: [{
        id: 'email-001',
        from: 'it-support@techc0rp-industries.com',
        to: 'you@techcorp.com',
        subject: 'URGENT: Security Breach - Password Reset Required',
        body: 'Dear Employee,\n\nWe have detected suspicious activity on your account. For your security, please click the link below to reset your password immediately.\n\nReset Password: http://techcorp-secure.net/reset\n\nFailure to reset within 24 hours will result in account suspension.\n\nBest regards,\nIT Support Team',
        timestamp: new Date(),
        suspicious: true,
      }],
    },
    choices: [
      {
        id: 'choice-001-a',
        text: 'Click the reset link immediately',
        description: 'Follow the instructions and reset your password',
        isCorrect: false,
        points: 0,
        consequence: 'Your credentials have been compromised! The attacker now has access to your account and company systems.',
        explanation: 'This was a phishing attempt. The email contained several red flags: suspicious sender domain (techc0rp instead of techcorp), urgent language, and an unverified link.',
      },
      {
        id: 'choice-001-b',
        text: 'Report to SOC team and verify independently',
        description: 'Forward the email to security team and contact IT through official channels',
        isCorrect: true,
        points: 100,
        explanation: 'Excellent decision! You correctly identified the phishing attempt by verifying through official channels instead of clicking suspicious links.',
      },
      {
        id: 'choice-001-c',
        text: 'Ignore the email',
        description: 'Delete the email and continue with your work',
        isCorrect: false,
        points: 30,
        explanation: 'While you avoided falling for the phish, ignoring it means others might fall victim. The security team should be notified of phishing attempts.',
      },
      {
        id: 'choice-001-d',
        text: 'Forward to colleagues for their opinion',
        description: 'Ask your coworkers what they think about this email',
        isCorrect: false,
        points: 10,
        consequence: 'By forwarding the phishing email, you\'ve potentially exposed more colleagues to the threat.',
        explanation: 'Forwarding suspicious emails can spread the threat. Always report to security teams instead of circulating potentially malicious content.',
      },
    ],
    correctChoiceId: 'choice-001-b',
    maxPoints: 100,
    tags: ['email-security', 'phishing', 'social-engineering'],
  },
  
  {
    id: 'ransomware-001',
    title: 'Encrypted Files Alert',
    description: 'Multiple users report they cannot access their files, and strange messages appear on screens',
    type: 'ransomware',
    difficulty: 'intermediate',
    context: 'You are the IT Security Specialist at MedTech Solutions. It\'s Tuesday afternoon when multiple help desk tickets start flooding in.',
    videoUrl: "public/videos/Ransomware_Infection_Affecting_Clinical_Files.mp4",
    quizUrl:  "https://docs.google.com/forms/d/e/1FAIpQLSexfwoCiJ1AQtKMl7JvjxIT_Wg7QeUcfcnTd6YzwbmiKjh_OA/viewform?usp=dialog",
    story: {
      companyName: 'MedTech Solutions',
      role: 'IT Security Specialist',
      setting: 'Healthcare Technology Company',
    },
    evidence: {
      alerts: [{
        id: 'alert-001',
        title: 'Multiple File Encryption Events Detected',
        severity: 'critical',
        timestamp: new Date(),
        description: 'Unusual file system activity detected across 25 workstations. Files being renamed with .encrypted extension.',
        source: 'Endpoint Detection System',
        status: 'new',
      }],
      logs: [
        {
          id: 'log-001',
          timestamp: new Date(),
          source: 'DC-01',
          level: 'critical',
          message: 'Mass file modification detected from user: jsmith@medtech.com',
          ip: '192.168.1.45',
          user: 'jsmith',
        },
        {
          id: 'log-002',
          timestamp: new Date(),
          source: 'Firewall',
          level: 'warning',
          message: 'Outbound connection to suspicious IP: 185.234.72.45 on port 443',
          ip: '185.234.72.45',
        },
      ],
    },
    choices: [
      {
        id: 'choice-002-a',
        text: 'Immediately isolate affected systems',
        description: 'Disconnect infected machines from the network to prevent spread',
        isCorrect: true,
        points: 150,
        explanation: 'Correct! Network isolation is the first critical step to prevent ransomware from spreading to other systems and encrypt more data.',
      },
      {
        id: 'choice-002-b',
        text: 'Try to decrypt the files immediately',
        description: 'Attempt to reverse the encryption using available tools',
        isCorrect: false,
        points: 20,
        consequence: 'While you attempt decryption, the ransomware continues spreading across the network, encrypting critical patient data.',
        explanation: 'Containment must come before recovery. Attempting immediate decryption while the threat is active allows further damage.',
      },
      {
        id: 'choice-002-c',
        text: 'Pay the ransom to get files back quickly',
        description: 'Contact the attackers and arrange payment for decryption keys',
        isCorrect: false,
        points: 0,
        consequence: 'Payment doesn\'t guarantee file recovery and funds criminal operations. The company faces regulatory penalties for not following proper incident response.',
        explanation: 'Paying ransoms is never recommended. It funds criminal activity, doesn\'t guarantee recovery, and violates many organizational policies.',
      },
      {
        id: 'choice-002-d',
        text: 'Restore from backups immediately',
        description: 'Begin restoring systems from the most recent backup',
        isCorrect: false,
        points: 50,
        consequence: 'Without isolating the threat first, restored systems become infected again, and you lose your backup data too.',
        explanation: 'Backup restoration is important but must be done after containment. Otherwise, restored systems can be reinfected.',
      },
    ],
    correctChoiceId: 'choice-002-a',
    maxPoints: 150,
    tags: ['ransomware', 'incident-response', 'containment'],
  },

  {
    id: 'insider-threat-001',
    title: 'Impersonation Call Targeting Healthcare Leadership',
    description: 'Security monitoring detects abnormal data access by a trusted employee',
    type: 'insider_threat',
    difficulty: 'advanced',
    context: 'You are the Chief Security Officer at DataSecure Inc. Your threat detection system has flagged concerning behavior from a senior database administrator.',
    videoUrl: "public/videos/Impersonation_Call_Targeting_Healthcare_Leadership.mp4",
    quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdlqxm7Okpun1194nyAonCadsQiW850JvvCCEZdzQZUkSmabw/viewform?usp=publish-editor",
    story: {
      companyName: 'DataSecure Inc',
      role: 'Chief Security Officer',
      setting: 'Data Security Consulting Firm',
    },
    evidence: {
      logs: [
        {
          id: 'log-003',
          timestamp: new Date(),
          source: 'Database Audit',
          level: 'warning',
          message: 'User mchen accessed customer database outside business hours (02:30 AM)',
          ip: '192.168.1.100',
          user: 'mchen',
        },
        {
          id: 'log-004',
          timestamp: new Date(),
          source: 'DLP System',
          level: 'error',
          message: 'Large data export detected: 50GB customer records downloaded by mchen',
          user: 'mchen',
        },
        {
          id: 'log-005',
          timestamp: new Date(),
          source: 'VPN Gateway',
          level: 'info',
          message: 'VPN connection from unusual location: Tokyo, Japan for user mchen',
          ip: '203.45.67.89',
          user: 'mchen',
        },
      ],
      alerts: [{
        id: 'alert-002',
        title: 'Insider Threat Score Elevated',
        severity: 'high',
        timestamp: new Date(),
        description: 'Employee risk score increased to 85/100 based on recent anomalous activities',
        source: 'User Behavior Analytics',
        status: 'new',
      }],
    },
    choices: [
      {
        id: 'choice-003-a',
        text: 'Immediately disable the employee\'s access',
        description: 'Revoke all system access and begin investigation',
        isCorrect: false,
        points: 70,
        consequence: 'Hasty action alerts the employee and may destroy evidence if they are indeed malicious. However, you\'ve prevented further data loss.',
        explanation: 'While swift action prevents further damage, immediate access revocation can alert malicious insiders and compromise evidence gathering.',
      },
      {
        id: 'choice-003-b',
        text: 'Covertly monitor and gather more evidence',
        description: 'Increase monitoring while allowing normal access to collect evidence',
        isCorrect: true,
        points: 200,
        explanation: 'Excellent approach! Covert monitoring allows evidence collection while maintaining operational security. This builds a stronger case for any necessary actions.',
      },
      {
        id: 'choice-003-c',
        text: 'Confront the employee directly',
        description: 'Call the employee in for questioning about their activities',
        isCorrect: false,
        points: 30,
        consequence: 'Direct confrontation alerts them to your suspicions. If malicious, they may destroy evidence or accelerate their activities.',
        explanation: 'Direct confrontation without sufficient evidence can compromise the investigation and alert potential bad actors.',
      },
      {
        id: 'choice-003-d',
        text: 'Report to law enforcement immediately',
        description: 'Contact authorities and report suspected data theft',
        isCorrect: false,
        points: 40,
        consequence: 'Premature law enforcement involvement without proper evidence gathering weakens the case and may not be actionable.',
        explanation: 'While eventual law enforcement involvement may be necessary, proper evidence gathering and internal investigation should typically precede external reporting.',
      },
    ],
    correctChoiceId: 'choice-003-b',
    maxPoints: 200,
    tags: ['insider-threat', 'investigation', 'monitoring'],
  },
  {
    id: 'sql-injection-002',
    title: 'Cybersecurity in healthcare',
    description: 'Your web application firewall detects suspicious database queries',
    type: 'sql_injection',
    difficulty: 'intermediate',
    context: 'You are a DevSecOps Engineer at RetailPlus, an e-commerce company. The WAF has flagged multiple suspicious requests to your customer portal.',
    videoUrl: "videos/Cybersecurity_in_healthcare_with_compilance_with_H.mp4",
    quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfMooKf9RBn0KYFhunuNaVNAIxf8TnTSWZch954qoaDlBBCZQ/viewform?usp=dialog",
    story: {
      companyName: 'RetailPlus',
      role: 'DevSecOps Engineer',
      setting: 'E-commerce Technology Division',
    },
    evidence: {
      logs: [
        {
          id: 'log-006',
          timestamp: new Date(),
          source: 'WAF',
          level: 'critical',
          message: 'SQL injection attempt detected: \' OR 1=1 -- in login form',
          ip: '203.45.67.123',
        },
        {
          id: 'log-007',
          timestamp: new Date(),
          source: 'Database',
          level: 'warning',
          message: 'Unusual query pattern detected: UNION SELECT statements from customer_portal',
          ip: '203.45.67.123',
        },
      ],
      alerts: [{
        id: 'alert-003',
        title: 'Potential Data Exfiltration Attempt',
        severity: 'high',
        timestamp: new Date(),
        description: 'Multiple SQL injection attempts detected from single IP address targeting user database',
        source: 'Web Application Firewall',
        status: 'new',
      }],
    },
    choices: [
      {
        id: 'choice-004-a',
        text: 'Block the attacking IP address',
        description: 'Add the suspicious IP to the blacklist immediately',
        isCorrect: false,
        points: 60,
        explanation: 'Blocking the IP is a good immediate response, but it doesn\'t address the underlying vulnerability that allows SQL injection.',
      },
      {
        id: 'choice-004-b',
        text: 'Take the application offline immediately',
        description: 'Shut down the web application to prevent data loss',
        isCorrect: false,
        points: 40,
        consequence: 'Taking the application offline protects data but severely impacts business operations unnecessarily.',
        explanation: 'While this prevents further attacks, it\'s an extreme measure that significantly impacts business without first trying less disruptive solutions.',
      },
      {
        id: 'choice-004-c',
        text: 'Implement input validation and parameterized queries',
        description: 'Fix the vulnerability by implementing proper coding practices',
        isCorrect: true,
        points: 180,
        explanation: 'Perfect! Addressing the root cause by implementing parameterized queries and input validation is the proper long-term solution to prevent SQL injection.',
      },
      {
        id: 'choice-004-d',
        text: 'Monitor and collect more attack data',
        description: 'Continue monitoring to understand the attack patterns better',
        isCorrect: false,
        points: 20,
        consequence: 'While you gather data, the attacker continues attempting to access sensitive customer information.',
        explanation: 'Monitoring is important, but active attacks against customer data require immediate defensive action.',
      },
    ],
    correctChoiceId: 'choice-004-c',
    maxPoints: 180,
    tags: ['sql-injection', 'web-security', 'vulnerability-management'],
  },
  {
    id: 'sql-injection-001',
    title: 'Web Application Vulnerability Alert',
    description: 'Your web application firewall detects suspicious database queries',
    type: 'malware',
    difficulty: 'intermediate',
    context: 'You are a DevSecOps Engineer at RetailPlus, an e-commerce company. The WAF has flagged multiple suspicious requests to your customer portal.',
    videoUrl: "videos/In_todays_digital_world_healthcare_organizations_d.mp4",
    quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe8jkUoA0qnj-6ABz-Cu3Yn1X_CfSD-XC7u0HLTmSaKs0SXPA/viewform?usp=dialog",
    story: {
      companyName: 'RetailPlus',
      role: 'DevSecOps Engineer',
      setting: 'E-commerce Technology Division',
    },
    evidence: {
      logs: [
        {
          id: 'log-006',
          timestamp: new Date(),
          source: 'WAF',
          level: 'critical',
          message: 'SQL injection attempt detected: \' OR 1=1 -- in login form',
          ip: '203.45.67.123',
        },
        {
          id: 'log-007',
          timestamp: new Date(),
          source: 'Database',
          level: 'warning',
          message: 'Unusual query pattern detected: UNION SELECT statements from customer_portal',
          ip: '203.45.67.123',
        },
      ],
      alerts: [{
        id: 'alert-003',
        title: 'Potential Data Exfiltration Attempt',
        severity: 'high',
        timestamp: new Date(),
        description: 'Multiple SQL injection attempts detected from single IP address targeting user database',
        source: 'Web Application Firewall',
        status: 'new',
      }],
    },
    choices: [
      {
        id: 'choice-004-a',
        text: 'Block the attacking IP address',
        description: 'Add the suspicious IP to the blacklist immediately',
        isCorrect: false,
        points: 60,
        explanation: 'Blocking the IP is a good immediate response, but it doesn\'t address the underlying vulnerability that allows SQL injection.',
      },
      {
        id: 'choice-004-b',
        text: 'Take the application offline immediately',
        description: 'Shut down the web application to prevent data loss',
        isCorrect: false,
        points: 40,
        consequence: 'Taking the application offline protects data but severely impacts business operations unnecessarily.',
        explanation: 'While this prevents further attacks, it\'s an extreme measure that significantly impacts business without first trying less disruptive solutions.',
      },
      {
        id: 'choice-004-c',
        text: 'Implement input validation and parameterized queries',
        description: 'Fix the vulnerability by implementing proper coding practices',
        isCorrect: true,
        points: 180,
        explanation: 'Perfect! Addressing the root cause by implementing parameterized queries and input validation is the proper long-term solution to prevent SQL injection.',
      },
      {
        id: 'choice-004-d',
        text: 'Monitor and collect more attack data',
        description: 'Continue monitoring to understand the attack patterns better',
        isCorrect: false,
        points: 20,
        consequence: 'While you gather data, the attacker continues attempting to access sensitive customer information.',
        explanation: 'Monitoring is important, but active attacks against customer data require immediate defensive action.',
      },
    ],
    correctChoiceId: 'choice-004-c',
    maxPoints: 180,
    tags: ['sql-injection', 'web-security', 'vulnerability-management'],
  },

  {
    id: 'social-engineering-001',
    title: 'The Cybersecurity Awarness coach With HIPAA Compilance',
    description: 'You receive a call from someone claiming to be the CEO requesting sensitive information',
    type: 'social_engineering',
    difficulty: 'beginner',
    context: 'You work as an HR Coordinator at GlobalTech Corp. You receive an urgent phone call during lunch break.',
    videoUrl: "public/videos/The_Cyber_security_Coach_and_HIPAA_compilance_3min.mp4",
    quizUrl:  "https://docs.google.com/forms/d/e/1FAIpQLSfMooKf9RBn0KYFhunuNaVNAIxf8TnTSWZch954qoaDlBBCZQ/viewform?usp=dialog",
    story: {
      companyName: 'GlobalTech Corp',
      role: 'HR Coordinator',
      setting: 'Corporate Human Resources Department',
    },
    evidence: {
      // No digital evidence for this social engineering scenario
    },
    choices: [
      {
        id: 'choice-005-a',
        text: 'Provide the requested information immediately',
        description: 'The CEO seems urgent, so comply with the request',
        isCorrect: false,
        points: 0,
        consequence: 'You\'ve provided sensitive employee data to an attacker who was impersonating the CEO. This could lead to identity theft and further attacks.',
        explanation: 'Social engineers often use authority and urgency to pressure victims. Always verify the identity of callers requesting sensitive information.',
      },
      {
        id: 'choice-005-b',
        text: 'Ask for verification and call back on official number',
        description: 'Request verification details and call the CEO\'s office directly',
        isCorrect: true,
        points: 120,
        explanation: 'Excellent! Verification through official channels is the correct response to unexpected requests for sensitive information, regardless of claimed authority.',
      },
      {
        id: 'choice-005-c',
        text: 'Ask colleagues if they\'ve received similar calls',
        description: 'Check with other HR team members about similar requests',
        isCorrect: false,
        points: 50,
        explanation: 'While consulting colleagues shows good instincts, the proper procedure is to verify directly through official channels first.',
      },
      {
        id: 'choice-005-d',
        text: 'Hang up immediately',
        description: 'End the call without providing any information',
        isCorrect: false,
        points: 70,
        explanation: 'Hanging up protects the information but doesn\'t help identify the threat or follow proper verification procedures that might be needed for legitimate requests.',
      },
    ],
    correctChoiceId: 'choice-005-b',
    maxPoints: 120,
    tags: ['social-engineering', 'verification', 'human-psychology'],
  },
];

export const getScenariosByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  return scenarios.filter(scenario => scenario.difficulty === difficulty);
};

export const getScenariosByType = (type: string) => {
  return scenarios.filter(scenario => scenario.type === type);
};

export const getRandomScenario = (excludeIds: string[] = []) => {
  const availableScenarios = scenarios.filter(scenario => !excludeIds.includes(scenario.id));
  if (availableScenarios.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableScenarios.length);
  return availableScenarios[randomIndex];
};

export const getRecommendedScenario = (player: { level: number; completedScenarios: string[]; weakAreas: string[] }) => {
  // Prioritize weak areas
  if (player.weakAreas.length > 0) {
    const weaknessScenarios = scenarios.filter(scenario => 
      player.weakAreas.includes(scenario.type) && 
      !player.completedScenarios.includes(scenario.id)
    );
    if (weaknessScenarios.length > 0) {
      return weaknessScenarios[Math.floor(Math.random() * weaknessScenarios.length)];
    }
  }

  // Otherwise, match difficulty to player level
  let targetDifficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  if (player.level >= 10) targetDifficulty = 'advanced';
  else if (player.level >= 5) targetDifficulty = 'intermediate';

  const difficultyScenarios = scenarios.filter(scenario => 
    scenario.difficulty === targetDifficulty && 
    !player.completedScenarios.includes(scenario.id)
  );

  if (difficultyScenarios.length === 0) {
    return getRandomScenario(player.completedScenarios);
  }

  return difficultyScenarios[Math.floor(Math.random() * difficultyScenarios.length)];
};
