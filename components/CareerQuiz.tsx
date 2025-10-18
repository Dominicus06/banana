'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, Share2, Download, Building2, CheckCircle } from 'lucide-react';

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
  color: string;
}

interface CompanyPersonalityQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    traits: {
      innovative: number;
      collaborative: number;
      structured: number;
      autonomous: number;
      impactFocused: number;
      growthOriented: number;
    };
  }[];
}

interface Company {
  id: string;
  name: string;
  description: string;
  culture: string;
  values: string[];
  workStyle: string;
  benefits: string[];
  location: string;
  size: string;
  industry: string;
  traits: {
    innovative: number;
    collaborative: number;
    structured: number;
    autonomous: number;
    impactFocused: number;
    growthOriented: number;
  };
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
    color: "#F2A900"
  },
  analytical: {
    title: "Strategic Analyst",
    description: "You excel at breaking down complex problems, analyzing data, and creating systematic solutions. Your ideal role involves research, strategy development, and evidence-based decision making.",
    organizations: ["Consulting firms", "Research institutions", "Financial services", "Government agencies", "Technology companies"],
    color: "#76232F"
  },
  leadership: {
    title: "Visionary Leader",
    description: "You naturally inspire and guide others toward common goals. Your ideal role involves strategic planning, team development, and driving organizational change.",
    organizations: ["Growing companies", "Non-profits", "Management consulting", "Corporate leadership", "Social enterprises"],
    color: "#D22730"
  },
  helping: {
    title: "People-Centered Professional",
    description: "You're passionate about making a direct positive impact on individuals' lives. Your ideal role involves supporting, teaching, or advocating for others in meaningful ways.",
    organizations: ["Healthcare", "Education", "Non-profits", "Coaching/counseling", "Community organizations"],
    color: "#FFB81C"
  },
  technical: {
    title: "Technical Problem Solver",
    description: "You excel at building, optimizing, and maintaining complex systems. Your ideal role involves hands-on technical work, continuous learning, and solving challenging technical problems.",
    organizations: ["Technology companies", "Engineering firms", "Research labs", "Manufacturing", "Software development"],
    color: "#D0D3D4"
  },
  entrepreneurial: {
    title: "Innovation Catalyst",
    description: "You're driven to create new ventures, identify opportunities, and build something from the ground up. Your ideal role involves strategic thinking, risk-taking, and business development.",
    organizations: ["Startups", "Venture capital", "Business development", "Innovation departments", "Consulting"],
    color: "#000000"
  }
};

const companyPersonalityQuestions: CompanyPersonalityQuestion[] = [
  {
    id: 1,
    question: "What type of work environment brings out your best performance?",
    options: [
      { text: "Fast-paced, innovative spaces with cutting-edge technology", traits: { innovative: 3, collaborative: 2, structured: 0, autonomous: 2, impactFocused: 1, growthOriented: 3 } },
      { text: "Collaborative open spaces with team interaction", traits: { innovative: 1, collaborative: 3, structured: 1, autonomous: 0, impactFocused: 2, growthOriented: 2 } },
      { text: "Organized, process-driven environments with clear hierarchies", traits: { innovative: 0, collaborative: 1, structured: 3, autonomous: 1, impactFocused: 1, growthOriented: 1 } },
      { text: "Flexible spaces where I can work independently", traits: { innovative: 2, collaborative: 0, structured: 0, autonomous: 3, impactFocused: 1, growthOriented: 2 } }
    ]
  },
  {
    id: 2,
    question: "What motivates you most in your daily work?",
    options: [
      { text: "Creating breakthrough solutions and experimenting", traits: { innovative: 3, collaborative: 1, structured: 0, autonomous: 2, impactFocused: 2, growthOriented: 2 } },
      { text: "Building strong relationships and team success", traits: { innovative: 1, collaborative: 3, structured: 1, autonomous: 0, impactFocused: 2, growthOriented: 2 } },
      { text: "Meeting targets and following proven systems", traits: { innovative: 0, collaborative: 1, structured: 3, autonomous: 1, impactFocused: 1, growthOriented: 1 } },
      { text: "Having ownership and making my own decisions", traits: { innovative: 2, collaborative: 0, structured: 0, autonomous: 3, impactFocused: 1, growthOriented: 2 } }
    ]
  },
  {
    id: 3,
    question: "How do you prefer to approach new challenges?",
    options: [
      { text: "Experiment with new methods and disrupt the status quo", traits: { innovative: 3, collaborative: 1, structured: 0, autonomous: 2, impactFocused: 2, growthOriented: 3 } },
      { text: "Collaborate with team members to find solutions", traits: { innovative: 1, collaborative: 3, structured: 1, autonomous: 0, impactFocused: 2, growthOriented: 2 } },
      { text: "Follow established procedures and best practices", traits: { innovative: 0, collaborative: 1, structured: 3, autonomous: 1, impactFocused: 1, growthOriented: 1 } },
      { text: "Tackle them independently with full autonomy", traits: { innovative: 2, collaborative: 0, structured: 0, autonomous: 3, impactFocused: 1, growthOriented: 2 } }
    ]
  },
  {
    id: 4,
    question: "What kind of company mission resonates with you?",
    options: [
      { text: "Disrupting industries with innovative technology", traits: { innovative: 3, collaborative: 1, structured: 0, autonomous: 2, impactFocused: 2, growthOriented: 3 } },
      { text: "Creating positive social or environmental impact", traits: { innovative: 2, collaborative: 2, structured: 1, autonomous: 1, impactFocused: 3, growthOriented: 2 } },
      { text: "Delivering reliable, high-quality services", traits: { innovative: 0, collaborative: 2, structured: 3, autonomous: 1, impactFocused: 2, growthOriented: 1 } },
      { text: "Enabling individual freedom and creativity", traits: { innovative: 2, collaborative: 1, structured: 0, autonomous: 3, impactFocused: 1, growthOriented: 2 } }
    ]
  },
  {
    id: 5,
    question: "What's your ideal relationship with management?",
    options: [
      { text: "Minimal oversight, maximum freedom to innovate", traits: { innovative: 3, collaborative: 1, structured: 0, autonomous: 3, impactFocused: 1, growthOriented: 2 } },
      { text: "Regular check-ins and collaborative decision-making", traits: { innovative: 1, collaborative: 3, structured: 2, autonomous: 0, impactFocused: 2, growthOriented: 2 } },
      { text: "Clear direction and structured feedback", traits: { innovative: 0, collaborative: 1, structured: 3, autonomous: 0, impactFocused: 1, growthOriented: 1 } },
      { text: "Trust-based autonomy with accountability", traits: { innovative: 2, collaborative: 1, structured: 1, autonomous: 3, impactFocused: 2, growthOriented: 2 } }
    ]
  },
  {
    id: 6,
    question: "What type of growth opportunities appeal to you?",
    options: [
      { text: "Learning cutting-edge technologies and methods", traits: { innovative: 3, collaborative: 1, structured: 0, autonomous: 2, impactFocused: 1, growthOriented: 3 } },
      { text: "Developing leadership and team collaboration skills", traits: { innovative: 1, collaborative: 3, structured: 2, autonomous: 0, impactFocused: 2, growthOriented: 2 } },
      { text: "Advancing through clearly defined career paths", traits: { innovative: 0, collaborative: 1, structured: 3, autonomous: 1, impactFocused: 1, growthOriented: 2 } },
      { text: "Building diverse skills across multiple areas", traits: { innovative: 2, collaborative: 1, structured: 0, autonomous: 3, impactFocused: 1, growthOriented: 3 } }
    ]
  }
];

const companies: Company[] = [
  {
    id: "tech-innovator",
    name: "TechVision Innovations",
    description: "A cutting-edge AI and machine learning startup revolutionizing how businesses leverage data.",
    culture: "Fast-paced, innovative, and experimental. We embrace failure as learning and encourage bold thinking.",
    values: ["Innovation First", "Continuous Learning", "Data-Driven Decisions", "Calculated Risk-Taking"],
    workStyle: "Hybrid with flexible hours, autonomous project ownership, latest tech stack",
    benefits: ["Equity options", "Unlimited learning budget", "Remote work flexibility", "Latest tech equipment"],
    location: "Vilnius, Lithuania (Hybrid)",
    size: "50-100 employees",
    industry: "Technology / AI",
    traits: { innovative: 9, collaborative: 6, structured: 3, autonomous: 8, impactFocused: 7, growthOriented: 9 },
    color: "#F2A900"
  },
  {
    id: "social-impact",
    name: "Impact Global",
    description: "A mission-driven organization creating sustainable solutions for social and environmental challenges.",
    culture: "Purpose-driven, collaborative, and compassionate. We believe in collective impact and community building.",
    values: ["Social Impact", "Sustainability", "Collaboration", "Transparency", "Diversity & Inclusion"],
    workStyle: "Collaborative team environment, consensus-based decision making, flexible work arrangements",
    benefits: ["Mission-driven work", "Work-life balance", "Professional development", "Meaningful impact"],
    location: "Vilnius, Lithuania",
    size: "100-200 employees",
    industry: "Non-Profit / Social Enterprise",
    traits: { innovative: 5, collaborative: 9, structured: 5, autonomous: 4, impactFocused: 10, growthOriented: 6 },
    color: "#D22730"
  },
  {
    id: "consulting-excellence",
    name: "Strategic Partners Consulting",
    description: "A premier management consulting firm helping enterprises transform and optimize their operations.",
    culture: "Professional, structured, and excellence-oriented. We value expertise, precision, and delivering results.",
    values: ["Excellence", "Client Success", "Continuous Improvement", "Professional Development", "Integrity"],
    workStyle: "Structured project timelines, clear deliverables, mentorship programs, office-based collaboration",
    benefits: ["Competitive salary", "Career advancement", "International projects", "Mentorship programs"],
    location: "Vilnius, Lithuania",
    size: "200-500 employees",
    industry: "Consulting / Professional Services",
    traits: { innovative: 4, collaborative: 7, structured: 9, autonomous: 3, impactFocused: 6, growthOriented: 7 },
    color: "#76232F"
  },
  {
    id: "creative-agency",
    name: "Pixel & Beyond Creative",
    description: "An award-winning creative agency crafting extraordinary brand experiences and digital products.",
    culture: "Creative, autonomous, and inspiring. We trust our team to create magic with minimal constraints.",
    values: ["Creative Freedom", "Artistic Excellence", "Client Partnership", "Work-Life Balance", "Innovation"],
    workStyle: "Flexible remote work, autonomous project management, creative freedom, collaborative brainstorming",
    benefits: ["Flexible schedule", "Remote work", "Creative tools budget", "Team retreats", "Portfolio building"],
    location: "Remote-First (Vilnius Hub)",
    size: "20-50 employees",
    industry: "Creative / Design",
    traits: { innovative: 8, collaborative: 5, structured: 2, autonomous: 9, impactFocused: 5, growthOriented: 7 },
    color: "#FFB81C"
  },
  {
    id: "fintech-scale",
    name: "FinFlow Technologies",
    description: "A rapidly scaling fintech company building the future of digital payments and financial services.",
    culture: "Growth-focused, data-driven, and agile. We move fast, iterate quickly, and scale with purpose.",
    values: ["Customer First", "Data-Driven", "Rapid Innovation", "Scalability", "Financial Inclusion"],
    workStyle: "Agile methodology, cross-functional teams, hybrid work, results-oriented culture",
    benefits: ["Stock options", "Competitive compensation", "Learning & development", "Modern office space"],
    location: "Vilnius, Lithuania (Hybrid)",
    size: "150-300 employees",
    industry: "FinTech / Finance",
    traits: { innovative: 8, collaborative: 7, structured: 6, autonomous: 6, impactFocused: 7, growthOriented: 10 },
    color: "#D0D3D4"
  },
  {
    id: "research-institute",
    name: "Baltic Innovation Research Institute",
    description: "A leading research institution advancing knowledge in biotechnology and sustainable technologies.",
    culture: "Academic, collaborative, and curiosity-driven. We prioritize deep thinking and meaningful discoveries.",
    values: ["Scientific Excellence", "Collaboration", "Knowledge Sharing", "Ethical Research", "Innovation"],
    workStyle: "Flexible research schedules, autonomous project direction, collaborative peer reviews",
    benefits: ["Research funding", "Publication support", "Conference travel", "Academic freedom", "Flexible hours"],
    location: "Vilnius, Lithuania",
    size: "75-150 employees",
    industry: "Research / Biotechnology",
    traits: { innovative: 7, collaborative: 8, structured: 6, autonomous: 7, impactFocused: 8, growthOriented: 6 },
    color: "#76232F"
  }
];

export default function CareerQuiz() {
  const [currentState, setCurrentState] = useState<'start' | 'quiz' | 'results' | 'companyQuiz' | 'companyResults'>('start');
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
  
  // Company matching states
  const [companyQuestion, setCompanyQuestion] = useState(0);
  const [companyAnswers, setCompanyAnswers] = useState<number[]>([]);
  const [companyTraits, setCompanyTraits] = useState<Record<string, number>>({
    innovative: 0,
    collaborative: 0,
    structured: 0,
    autonomous: 0,
    impactFocused: 0,
    growthOriented: 0
  });
  const [matchedCompanies, setMatchedCompanies] = useState<Company[]>([]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedCareerResults = localStorage.getItem('careerQuizResults');
    const savedCompanyResults = localStorage.getItem('companyMatchResults');
    
    if (savedCareerResults) {
      const parsed = JSON.parse(savedCareerResults);
      setTopCareers(parsed.topCareers);
      setScores(parsed.scores);
    }
    
    if (savedCompanyResults) {
      const parsed = JSON.parse(savedCompanyResults);
      setMatchedCompanies(parsed.matchedCompanies);
      setCompanyTraits(parsed.traits);
    }
  }, []);

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
        
        // Save career results to localStorage
        localStorage.setItem('careerQuizResults', JSON.stringify({
          topCareers: sortedCareers,
          scores: newScores,
          timestamp: new Date().toISOString()
        }));
        
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

  // Company matching functions
  const startCompanyQuiz = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentState('companyQuiz');
      setCompanyQuestion(0);
      setCompanyAnswers([]);
      setCompanyTraits({
        innovative: 0,
        collaborative: 0,
        structured: 0,
        autonomous: 0,
        impactFocused: 0,
        growthOriented: 0
      });
      setIsAnimating(false);
    }, 300);
  };

  const handleCompanyAnswer = (optionIndex: number) => {
    if (isAnimating) return;
    
    const newAnswers = [...companyAnswers, optionIndex];
    setCompanyAnswers(newAnswers);
    
    const question = companyPersonalityQuestions[companyQuestion];
    const selectedOption = question.options[optionIndex];
    const newTraits = { ...companyTraits };
    
    Object.entries(selectedOption.traits).forEach(([key, value]) => {
      newTraits[key as keyof typeof newTraits] += value;
    });
    
    setCompanyTraits(newTraits);
    setIsAnimating(true);
    
    setTimeout(() => {
      if (companyQuestion < companyPersonalityQuestions.length - 1) {
        setCompanyQuestion(companyQuestion + 1);
      } else {
        // Calculate company matches
        const matches = companies.map(company => {
          let matchScore = 0;
          let totalPossible = 0;
          
          Object.entries(newTraits).forEach(([trait, userValue]) => {
            const companyValue = company.traits[trait as keyof typeof company.traits];
            const maxValue = Math.max(userValue, companyValue);
            const difference = Math.abs(userValue - companyValue);
            matchScore += (maxValue - difference);
            totalPossible += maxValue;
          });
          
          return {
            company,
            matchPercentage: totalPossible > 0 ? (matchScore / totalPossible) * 100 : 0
          };
        })
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        .slice(0, 3)
        .map(item => ({ ...item.company, matchPercentage: item.matchPercentage }));
        
        setMatchedCompanies(matches as Company[]);
        
        // Save to localStorage
        localStorage.setItem('companyMatchResults', JSON.stringify({
          matchedCompanies: matches,
          traits: newTraits,
          timestamp: new Date().toISOString()
        }));
        
        setCurrentState('companyResults');
      }
      setIsAnimating(false);
    }, 300);
  };

  const goBackCompanyQuiz = () => {
    if (companyQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCompanyQuestion(companyQuestion - 1);
        setCompanyAnswers(companyAnswers.slice(0, -1));
        
        const newTraits = {
          innovative: 0,
          collaborative: 0,
          structured: 0,
          autonomous: 0,
          impactFocused: 0,
          growthOriented: 0
        };
        
        companyAnswers.slice(0, -1).forEach((answerIndex, questionIndex) => {
          const question = companyPersonalityQuestions[questionIndex];
          const option = question.options[answerIndex];
          Object.entries(option.traits).forEach(([key, value]) => {
            newTraits[key as keyof typeof newTraits] += value;
          });
        });
        
        setCompanyTraits(newTraits);
        setIsAnimating(false);
      }, 300);
    }
  };

  const backToCareerResults = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentState('results');
      setIsAnimating(false);
    }, 300);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const companyProgress = ((companyQuestion + 1) / companyPersonalityQuestions.length) * 100;

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
                onClick={startCompanyQuiz}
                className="group flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                style={{ backgroundColor: '#D22730' }}
              >
                <Building2 className="w-5 h-5" />
                Find Your Company
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 rounded-full bg-white border-2 text-gray-700 hover:border-gray-400 hover:shadow-md transition-all"
                style={{ borderColor: '#D0D3D4' }}
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Company Personality Quiz Screen */}
        {currentState === 'companyQuiz' && (
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Question {companyQuestion + 1} of {companyPersonalityQuestions.length}</span>
                <span className="text-sm text-gray-600">{Math.round(companyProgress)}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ backgroundColor: '#D22730', width: `${companyProgress}%` }}
                />
              </div>
            </div>

            {/* Back Button */}
            <div className="flex items-center justify-between mb-6">
              {companyQuestion > 0 ? (
                <button
                  onClick={goBackCompanyQuiz}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Question
                </button>
              ) : (
                <button
                  onClick={backToCareerResults}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Career Results
                </button>
              )}
            </div>

            {/* Question */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-8 h-8" style={{ color: '#D22730' }} />
                <h2 className="text-2xl font-bold text-gray-800">Company Personality Match</h2>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
                {companyPersonalityQuestions[companyQuestion].question}
              </h3>
              
              <div className="space-y-4">
                {companyPersonalityQuestions[companyQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleCompanyAnswer(index)}
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

        {/* Company Results Screen */}
        {currentState === 'companyResults' && (
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Building2 className="w-10 h-10" style={{ color: '#D22730' }} />
                <h2 className="text-4xl font-bold text-gray-800">Your Perfect Company Matches</h2>
              </div>
              <p className="text-xl text-gray-600">Based on your work style and preferences, these companies are your best cultural fit:</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <button
                onClick={backToCareerResults}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 rounded-full text-gray-700 hover:border-gray-400 hover:shadow-md transition-all"
                style={{ borderColor: '#D0D3D4' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Career Results
              </button>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 rounded-full text-white hover:shadow-lg transition-all"
                style={{ backgroundColor: '#76232F' }}
              >
                Start Over
              </button>
            </div>

            {/* Company Match Cards */}
            <div className="space-y-6">
              {matchedCompanies.map((company: any, index) => (
                <div
                  key={company.id}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border-l-4"
                  style={{ borderLeftColor: company.color }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: company.color }}
                        />
                        <span className="text-sm font-semibold text-gray-500">
                          #{index + 1} MATCH
                        </span>
                        {company.matchPercentage && (
                          <span className="ml-auto text-2xl font-bold" style={{ color: company.color }}>
                            {Math.round(company.matchPercentage)}% Match
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {company.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-lg">
                        {company.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" style={{ color: company.color }} />
                            Company Culture
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {company.culture}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" style={{ color: company.color }} />
                            Work Style
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {company.workStyle}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Core Values</h4>
                          <div className="flex flex-wrap gap-2">
                            {company.values.map((value: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                style={{ backgroundColor: company.color }}
                              >
                                {value}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Benefits & Perks</h4>
                          <div className="flex flex-wrap gap-2">
                            {company.benefits.map((benefit: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Location</p>
                            <p className="text-sm font-medium text-gray-800">{company.location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Company Size</p>
                            <p className="text-sm font-medium text-gray-800">{company.size}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Industry</p>
                            <p className="text-sm font-medium text-gray-800">{company.industry}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                💾 Your results have been saved locally. You can return to this page anytime to review your matches.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
