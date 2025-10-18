'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, Share2, Download } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    weights: {
      creative: number;
      analytical: number;
      leadership: number;
      helping: number;
      technical: number;
      entrepreneurial: number;
    };
  }[];
}

interface CareerResult {
  title: string;
  description: string;
  organizations: string[];
  culturalFit: string;
  personality: string;
  color: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What energizes you more - solving complex problems alone or collaborating on creative solutions?",
    options: [
      { text: "Deep focus on complex problems alone", weights: { creative: 1, analytical: 3, leadership: 0, helping: 0, technical: 2, entrepreneurial: 1 } },
      { text: "Collaborative creative brainstorming", weights: { creative: 3, analytical: 1, leadership: 2, helping: 2, technical: 0, entrepreneurial: 2 } },
      { text: "Leading problem-solving teams", weights: { creative: 2, analytical: 2, leadership: 3, helping: 1, technical: 1, entrepreneurial: 2 } },
      { text: "Helping others find their solutions", weights: { creative: 1, analytical: 1, leadership: 1, helping: 3, technical: 0, entrepreneurial: 1 } }
    ]
  },
  {
    id: 2,
    question: "When facing uncertainty, do you seek structure or embrace the unknown?",
    options: [
      { text: "Create detailed plans and structures", weights: { creative: 0, analytical: 3, leadership: 2, helping: 1, technical: 2, entrepreneurial: 1 } },
      { text: "Embrace uncertainty as opportunity", weights: { creative: 3, analytical: 0, leadership: 1, helping: 1, technical: 0, entrepreneurial: 3 } },
      { text: "Guide others through uncertainty", weights: { creative: 1, analytical: 1, leadership: 3, helping: 2, technical: 0, entrepreneurial: 2 } },
      { text: "Find flexible frameworks", weights: { creative: 2, analytical: 2, leadership: 1, helping: 2, technical: 1, entrepreneurial: 2 } }
    ]
  },
  {
    id: 3,
    question: "What drives your sense of fulfillment in work?",
    options: [
      { text: "Creating something beautiful or meaningful", weights: { creative: 3, analytical: 0, leadership: 1, helping: 2, technical: 1, entrepreneurial: 2 } },
      { text: "Understanding how things work", weights: { creative: 1, analytical: 3, leadership: 0, helping: 0, technical: 3, entrepreneurial: 1 } },
      { text: "Influencing positive change", weights: { creative: 1, analytical: 1, leadership: 3, helping: 2, technical: 0, entrepreneurial: 2 } },
      { text: "Making others' lives better", weights: { creative: 1, analytical: 0, leadership: 1, helping: 3, technical: 0, entrepreneurial: 1 } }
    ]
  },
  {
    id: 4,
    question: "How do you prefer to learn and grow?",
    options: [
      { text: "Through experimentation and play", weights: { creative: 3, analytical: 1, leadership: 1, helping: 1, technical: 2, entrepreneurial: 3 } },
      { text: "Through systematic study and analysis", weights: { creative: 0, analytical: 3, leadership: 1, helping: 1, technical: 3, entrepreneurial: 1 } },
      { text: "Through mentoring and teaching others", weights: { creative: 1, analytical: 1, leadership: 2, helping: 3, technical: 1, entrepreneurial: 1 } },
      { text: "Through building and creating", weights: { creative: 2, analytical: 2, leadership: 1, helping: 1, technical: 2, entrepreneurial: 3 } }
    ]
  },
  {
    id: 5,
    question: "What role do you naturally take in group dynamics?",
    options: [
      { text: "The visionary who imagines possibilities", weights: { creative: 3, analytical: 0, leadership: 2, helping: 1, technical: 0, entrepreneurial: 3 } },
      { text: "The analyst who evaluates options", weights: { creative: 0, analytical: 3, leadership: 1, helping: 1, technical: 2, entrepreneurial: 1 } },
      { text: "The coordinator who brings people together", weights: { creative: 1, analytical: 1, leadership: 3, helping: 2, technical: 0, entrepreneurial: 2 } },
      { text: "The supporter who helps others shine", weights: { creative: 1, analytical: 1, leadership: 0, helping: 3, technical: 1, entrepreneurial: 0 } }
    ]
  },
  {
    id: 6,
    question: "What type of impact do you want to have on the world?",
    options: [
      { text: "Inspire through beauty and innovation", weights: { creative: 3, analytical: 0, leadership: 1, helping: 2, technical: 1, entrepreneurial: 2 } },
      { text: "Solve complex global challenges", weights: { creative: 1, analytical: 3, leadership: 2, helping: 2, technical: 3, entrepreneurial: 1 } },
      { text: "Lead organizations toward better futures", weights: { creative: 1, analytical: 2, leadership: 3, helping: 1, technical: 1, entrepreneurial: 3 } },
      { text: "Directly improve individual lives", weights: { creative: 1, analytical: 1, leadership: 1, helping: 3, technical: 1, entrepreneurial: 1 } }
    ]
  },
  {
    id: 7,
    question: "How do you approach challenges and setbacks?",
    options: [
      { text: "Find creative workarounds and alternatives", weights: { creative: 3, analytical: 1, leadership: 1, helping: 1, technical: 2, entrepreneurial: 3 } },
      { text: "Analyze root causes systematically", weights: { creative: 0, analytical: 3, leadership: 1, helping: 1, technical: 3, entrepreneurial: 1 } },
      { text: "Rally others and push through together", weights: { creative: 1, analytical: 1, leadership: 3, helping: 2, technical: 1, entrepreneurial: 2 } },
      { text: "Seek support and learn from others", weights: { creative: 1, analytical: 2, leadership: 1, helping: 3, technical: 1, entrepreneurial: 1 } }
    ]
  },
  {
    id: 8,
    question: "What environment helps you do your best work?",
    options: [
      { text: "Flexible, inspiring spaces with freedom to explore", weights: { creative: 3, analytical: 0, leadership: 1, helping: 1, technical: 1, entrepreneurial: 3 } },
      { text: "Quiet, organized spaces with deep focus time", weights: { creative: 1, analytical: 3, leadership: 0, helping: 1, technical: 3, entrepreneurial: 1 } },
      { text: "Dynamic spaces with lots of interaction", weights: { creative: 2, analytical: 1, leadership: 3, helping: 2, technical: 0, entrepreneurial: 2 } },
      { text: "Supportive spaces where everyone feels valued", weights: { creative: 1, analytical: 1, leadership: 2, helping: 3, technical: 1, entrepreneurial: 1 } }
    ]
  }
];

const careerResults: Record<string, CareerResult> = {
  creative: {
    title: "Creative Innovator",
    description: "You thrive in environments that value imagination, artistic expression, and innovative thinking. Your ideal role involves bringing new ideas to life and inspiring others through creative solutions.",
    organizations: ["Design agencies", "Tech startups", "Media companies", "Innovation labs", "Creative consultancies"],
    culturalFit: "Organizations with flexible work styles, emphasis on creativity, collaborative brainstorming, and tolerance for experimentation. Look for companies that celebrate unique perspectives and artistic expression.",
    personality: "You're driven by self-expression, aesthetic beauty, and the desire to create something meaningful. You work best with autonomy and in environments that encourage thinking outside the box.",
    color: "#F2A900"
  },
  analytical: {
    title: "Strategic Analyst",
    description: "You excel at breaking down complex problems, analyzing data, and creating systematic solutions. Your ideal role involves research, strategy development, and evidence-based decision making.",
    organizations: ["Consulting firms", "Research institutions", "Financial services", "Government agencies", "Technology companies"],
    culturalFit: "Organizations that value data-driven decisions, systematic approaches, and intellectual rigor. Look for companies with strong research cultures and emphasis on continuous learning.",
    personality: "You're motivated by understanding how things work, solving puzzles, and making logical connections. You thrive in structured environments that reward thoroughness and accuracy.",
    color: "#76232F"
  },
  leadership: {
    title: "Visionary Leader",
    description: "You naturally inspire and guide others toward common goals. Your ideal role involves strategic planning, team development, and driving organizational change.",
    organizations: ["Growing companies", "Non-profits", "Management consulting", "Corporate leadership", "Social enterprises"],
    culturalFit: "Organizations that value strong leadership, clear vision, and collaborative team dynamics. Look for companies undergoing growth or transformation where leadership skills are highly valued.",
    personality: "You're energized by bringing out the best in others, creating shared vision, and driving positive change. You work best in dynamic environments with opportunities for influence.",
    color: "#D22730"
  },
  helping: {
    title: "People-Centered Professional",
    description: "You're passionate about making a direct positive impact on individuals' lives. Your ideal role involves supporting, teaching, or advocating for others in meaningful ways.",
    organizations: ["Healthcare", "Education", "Non-profits", "Coaching/counseling", "Community organizations"],
    culturalFit: "Organizations with strong missions focused on human welfare, collaborative cultures, and emphasis on work-life balance. Look for companies that prioritize employee well-being and social impact.",
    personality: "You're driven by empathy, service to others, and creating positive change in people's lives. You thrive in supportive environments that value human connection and personal growth.",
    color: "#FFB81C"
  },
  technical: {
    title: "Technical Problem Solver",
    description: "You excel at building, optimizing, and maintaining complex systems. Your ideal role involves hands-on technical work, continuous learning, and solving challenging technical problems.",
    organizations: ["Technology companies", "Engineering firms", "Research labs", "Manufacturing", "Software development"],
    culturalFit: "Organizations that invest in cutting-edge technology, value technical excellence, and provide opportunities for skill development. Look for companies with strong engineering cultures.",
    personality: "You're motivated by understanding how things work, building efficient solutions, and mastering complex technical skills. You thrive in environments that reward expertise and innovation.",
    color: "#D0D3D4"
  },
  entrepreneurial: {
    title: "Innovation Catalyst",
    description: "You're driven to create new ventures, identify opportunities, and build something from the ground up. Your ideal role involves strategic thinking, risk-taking, and business development.",
    organizations: ["Startups", "Venture capital", "Business development", "Innovation departments", "Consulting"],
    culturalFit: "Organizations that embrace calculated risk-taking, rapid iteration, and entrepreneurial thinking. Look for companies that encourage initiative and reward innovative approaches.",
    personality: "You're energized by opportunity identification, strategic thinking, and building new solutions. You thrive in fast-paced environments with autonomy and growth potential.",
    color: "#000000"
  }
};

export default function CareerQuiz() {
  const [currentState, setCurrentState] = useState<'start' | 'quiz' | 'results'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({
    creative: 0,
    analytical: 0,
    leadership: 0,
    helping: 0,
    technical: 0,
    entrepreneurial: 0
  });
  const [topCareers, setTopCareers] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startQuiz = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentState('quiz');
      setIsAnimating(false);
    }, 300);
  };

  const handleAnswer = (optionIndex: number) => {
    if (isAnimating) return;
    
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    
    // Update scores
    const question = questions[currentQuestion];
    const selectedOption = question.options[optionIndex];
    const newScores = { ...scores };
    
    Object.entries(selectedOption.weights).forEach(([key, value]) => {
      newScores[key as keyof typeof newScores] += value;
    });
    
    setScores(newScores);
    
    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate results
        const sortedCareers = Object.entries(newScores)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 4)
          .map(([career]) => career);
        
        setTopCareers(sortedCareers);
        setCurrentState('results');
      }
      setIsAnimating(false);
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setAnswers(answers.slice(0, -1));
        
        // Recalculate scores
        const newScores = {
          creative: 0,
          analytical: 0,
          leadership: 0,
          helping: 0,
          technical: 0,
          entrepreneurial: 0
        };
        
        answers.slice(0, -1).forEach((answerIndex, questionIndex) => {
          const question = questions[questionIndex];
          const option = question.options[answerIndex];
          Object.entries(option.weights).forEach(([key, value]) => {
            newScores[key as keyof typeof newScores] += value;
          });
        });
        
        setScores(newScores);
        setIsAnimating(false);
      }, 300);
    }
  };

  const resetQuiz = () => {
    setCurrentState('start');
    setCurrentQuestion(0);
    setAnswers([]);
    setScores({
      creative: 0,
      analytical: 0,
      leadership: 0,
      helping: 0,
      technical: 0,
      entrepreneurial: 0
    });
    setTopCareers([]);
  };

  const shareResults = () => {
    const resultsText = `My AI Career Advisor Results:\n\n${topCareers.map((career, index) => 
      `${index + 1}. ${careerResults[career].title}`
    ).join('\n')}\n\nDiscover your career path at [Your Website]`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Career Advisor Results',
        text: resultsText,
      });
    } else {
      navigator.clipboard.writeText(resultsText);
      alert('Results copied to clipboard!');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Start Screen */}
        {currentState === 'start' && (
          <div className={`text-center transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                AI Career <span style={{ color: '#76232F' }}>Advisor</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover careers and organizations that match your authentic self, values, and working style.
                Go beyond traditional CV matching to find your true cultural fit.
              </p>
            </div>
            
            <button
              onClick={startQuiz}
              className="group relative inline-flex items-center gap-3 px-12 py-4 text-xl font-semibold text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              style={{ backgroundColor: '#D22730' }}
            >
              Start Quiz
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-8 text-gray-500">
              <p>8 philosophical questions • 3-4 minutes • Discover your path</p>
            </div>
          </div>
        )}

        {/* Quiz Screen */}
        {currentState === 'quiz' && (
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ backgroundColor: '#F2A900', width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Back Button */}
            {currentQuestion > 0 && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Question
              </button>
            )}

            {/* Question */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-6 text-left bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-gray-700 group-hover:text-gray-900">
                        {option.text}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {currentState === 'results' && (
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Career Paths</h2>
              <p className="text-xl text-gray-600">Based on your personality and values, here are your top career matches:</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <button
                onClick={shareResults}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-full text-gray-700 hover:border-gray-400 hover:shadow-md transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share Results
              </button>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 rounded-full text-white hover:shadow-lg transition-all"
                style={{ backgroundColor: '#76232F' }}
              >
                Take Quiz Again
              </button>
            </div>

            {/* Career Results */}
            <div className="grid gap-8 md:grid-cols-2">
              {topCareers.map((careerKey, index) => {
                const career = careerResults[careerKey];
                return (
                  <div
                    key={careerKey}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-l-4"
                    style={{ borderLeftColor: career.color }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: career.color }}
                      />
                      <span className="text-sm font-semibold text-gray-500">
                        #{index + 1} MATCH
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {career.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {career.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Suitable Organizations:</h4>
                        <p className="text-gray-600 text-sm">
                          {career.organizations.join(", ")}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Cultural Fit:</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {career.culturalFit}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Your Personality:</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {career.personality}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
