import fetch from "node-fetch";

/**
 * Fallback MCQs (used if AI fails)
 */
function fallbackMCQs(subject, topic, difficulty) {
  return [
    {
      question: `What is the main goal of ${topic}?`,
      options: [
        "Improve data redundancy",
        "Reduce data redundancy",
        "Increase data duplication",
        "Store unstructured data"
      ],
      correctAnswer: "Reduce data redundancy"
    },
    {
      question: `Which normal form removes partial dependency?`,
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correctAnswer: "2NF"
    },
    {
      question: `Which of the following is required for 1NF?`,
      options: [
        "No transitive dependency",
        "Atomic values",
        "No partial dependency",
        "No functional dependency"
      ],
      correctAnswer: "Atomic values"
    },
    {
      question: `Which normal form removes transitive dependency?`,
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correctAnswer: "3NF"
    },
    {
      question: `BCNF is stricter than which normal form?`,
      options: ["1NF", "2NF", "3NF", "4NF"],
      correctAnswer: "3NF"
    }
  ];
}

export async function generateQuiz(subject, topic, difficulty) {
  // 👉 If no API key is set, directly use fallback
  if (!process.env.OPENAI_API_KEY) {
    console.warn("No API key found. Using fallback MCQs.");
    return fallbackMCQs(subject, topic, difficulty);
  }

  const prompt = `
Generate 5 multiple choice questions.

Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}

Rules:
- Exactly 4 options
- One correct answer
- Return JSON only

Format:
[
  {
    "question": "",
    "options": ["", "", "", ""],
    "correctAnswer": ""
  }
]
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);

    return parsed;
  } catch (error) {
    console.error("AI generation failed. Using fallback MCQs.", error.message);
    return fallbackMCQs(subject, topic, difficulty);
  }
}
