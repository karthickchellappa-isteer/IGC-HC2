import { Scenario } from "@/types/game";


export const quickQuizScenario: Scenario = {
    id: "quickquiz-001",
    title: "Quick Cybersecurity Awareness Quiz",
    type: "quick_test",
    difficulty: "beginner",

    story: {
        companyName: "CyberSafe Academy",
        role: "Employee",
        setting: "Training Room",
    },

    context: "A short training video followed by a simple quiz.",

    description: "Watch the sample video and complete the quick quiz to test your awareness.",

    // 🔹 Static video (put an MP4 file inside public/videos/)
    videoUrl: "/videos/sample-video.mp4",

    // 🔹 Static Google Quiz link
    quizUrl: "https://forms.gle/your-google-quiz-id",

    choices: [],
    correctChoiceId: "",
    maxPoints: 0,
    tags: []
};
