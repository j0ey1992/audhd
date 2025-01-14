import React, { useState } from 'react';

function MemeTestPopup({ onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [result, setResult] = useState(null);

  const questions = [
    {
      text: "When you hear a song you like, do you...",
      options: [
        "Listen to it on repeat until you hate it",
        "Immediately research the artist's entire discography",
        "Forget it exists until it randomly pops up again",
        "Add it to a playlist and occasionally listen to it"
      ]
    },
    {
      text: "Your ideal weekend is...",
      options: [
        "Hyperfocusing on a new hobby for 16 hours straight",
        "Planning 47 activities but doing none of them",
        "Staring at the wall thinking about everything and nothing",
        "A balanced mix of relaxation and social activities"
      ]
    },
    {
      text: "When someone interrupts your focus...",
      options: [
        "You don't even notice because you're in the zone",
        "You get irrationally angry but hide it",
        "You completely forget what you were doing",
        "You politely acknowledge them and return to your task"
      ]
    },
    {
      text: "Your workspace looks like...",
      options: [
        "An organized chaos only you understand",
        "A museum of half-finished projects",
        "A tornado hit it but you know where everything is",
        "Neat and tidy with everything in its place"
      ]
    },
    {
      text: "When making decisions...",
      options: [
        "You overanalyze every possible outcome",
        "You impulsively choose and regret later",
        "You get paralyzed by indecision",
        "You weigh options and choose efficiently"
      ]
    }
  ];

  const diagnosisInfo = {
    autism: {
      title: "Autism",
      description: "You see patterns in everything!",
      detailedInfo: `
        Autism is a neurodevelopmental condition characterized by differences in social communication,
        sensory processing, and pattern recognition. Many autistic individuals excel in areas requiring
        attention to detail and deep focus. While social interactions may require more effort,
        autistic people often bring unique perspectives and valuable skills to any field.
      `,
      strengths: [
        "Exceptional attention to detail",
        "Strong pattern recognition skills",
        "Deep focus on special interests",
        "Honest and direct communication"
      ],
      challenges: [
        "Social communication differences",
        "Sensory sensitivities",
        "Need for routine and predictability",
        "Difficulty with change"
      ],
      resources: [
        {
          name: "Autism Self-Advocacy Network",
          url: "https://autisticadvocacy.org/",
          description: "Resources by and for autistic people"
        },
        {
          name: "Embrace Autism",
          url: "https://embrace-autism.com/",
          description: "Research-based information and tests"
        },
        {
          name: "NeuroClastic",
          url: "https://neuroclastic.com/",
          description: "Articles and resources from autistic writers"
        }
      ]
    },
    audhd: {
      title: "AuDHD",
      description: "The best (and most chaotic) of both worlds!",
      detailedInfo: `
        AuDHD refers to individuals who have both Autism and ADHD. This combination creates
        a unique neurotype that blends the strengths of both conditions while presenting
        its own set of challenges. AuDHD individuals often have remarkable creativity
        and problem-solving skills, though they may struggle with executive functioning
        and sensory processing.
      `,
      strengths: [
        "Creative problem-solving",
        "Ability to hyperfocus on passions",
        "Unique perspective on the world",
        "Adaptable thinking"
      ],
      challenges: [
        "Managing competing needs for routine and novelty",
        "Sensory overload",
        "Executive functioning difficulties",
        "Social communication differences"
      ],
      resources: [
        {
          name: "ADHD Alien Comics",
          url: "https://www.adhd-alien.com/",
          description: "Illustrated guides to understanding ADHD"
        },
        {
          name: "NeuroClastic",
          url: "https://neuroclastic.com/",
          description: "Articles and resources about neurodiversity"
        },
        {
          name: "The Autistic Advocate",
          url: "https://theautisticadvocate.com/",
          description: "Resources for autistic self-advocacy"
        }
      ]
    },
    adhd: {
      title: "ADHD",
      description: "Squirrel! Wait, what were we doing?",
      detailedInfo: `
        ADHD (Attention-Deficit/Hyperactivity Disorder) is characterized by differences
        in attention regulation, impulse control, and activity levels. People with ADHD
        often excel in creative thinking and problem-solving, though they may struggle
        with organization and time management. Their ability to think outside the box
        makes them valuable contributors in many fields.
      `,
      strengths: [
        "Creative and innovative thinking",
        "Ability to hyperfocus on interesting tasks",
        "High energy and enthusiasm",
        "Quick thinking and adaptability"
      ],
      challenges: [
        "Difficulty with focus and attention",
        "Impulsivity",
        "Time management struggles",
        "Organization difficulties"
      ],
      resources: [
        {
          name: "CHADD",
          url: "https://chadd.org/",
          description: "National resource on ADHD"
        },
        {
          name: "How to ADHD",
          url: "https://www.howtoadhd.com/",
          description: "Practical tips and resources"
        },
        {
          name: "ADHD Rewired",
          url: "https://www.adhdrewired.com/",
          description: "Podcast and community resources"
        }
      ]
    },
    neurotypical: {
      title: "Neurotypical",
      description: "How... normal of you!",
      detailedInfo: `
        Neurotypical refers to individuals whose neurological development and functioning
        are considered typical. While neurotypical individuals may find it easier to
        navigate social norms and expectations, they may miss out on the unique perspectives
        and strengths that neurodivergent individuals bring to the table.
      `,
      strengths: [
        "Strong social communication skills",
        "Ability to adapt to social norms",
        "Consistent focus and attention",
        "Good executive functioning"
      ],
      challenges: [
        "May struggle to understand neurodivergent perspectives",
        "Less likely to think outside the box",
        "May miss details neurodivergent people notice",
        "Less likely to develop deep special interests"
      ],
      resources: [
        {
          name: "Understanding Neurodiversity",
          url: "https://www.understood.org/",
          description: "Resources for understanding neurodiversity"
        },
        {
          name: "Neurodiversity Hub",
          url: "https://www.neurodiversityhub.org/",
          description: "Educational resources about neurodiversity"
        },
        {
          name: "The Neurodiversity Podcast",
          url: "https://www.neurodiversitypodcast.com/",
          description: "Exploring neurodiversity in depth"
        }
      ]
    }
  };

  const handleAnswer = (answer) => {
    setResponses([...responses, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const score = responses.reduce((acc, val) => acc + val, 0);
    if (score < 3) {
      setResult("autism");
    } else if (score < 6) {
      setResult("audhd");
    } else if (score < 9) {
      setResult("adhd");
    } else {
      setResult("neurotypical");
    }
  };

  const currentDiagnosis = diagnosisInfo[result];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="component-card max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
        {result ? (
          <div className="text-left space-y-6">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Your Diagnosis: {currentDiagnosis.title}
            </h2>
            <p className="text-xl text-text-secondary">
              {currentDiagnosis.description}
            </p>

            <div className="bg-surface/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-primary mb-2">About This Diagnosis</h3>
              <p className="text-text-secondary">
                {currentDiagnosis.detailedInfo}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface/50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-2">Strengths</h3>
                <ul className="list-disc list-inside text-text-secondary">
                  {currentDiagnosis.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface/50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-2">Challenges</h3>
                <ul className="list-disc list-inside text-text-secondary">
                  {currentDiagnosis.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-surface/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Resources to Learn More</h3>
              <div className="space-y-4">
                {currentDiagnosis.resources.map((resource, index) => (
                  <div key={index} className="space-y-1">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="feature-button text-left block"
                    >
                      {resource.name}
                    </a>
                    <p className="text-sm text-text-secondary pl-4">
                      {resource.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={onClose}
                className="feature-button bg-primary text-surface"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Neurodivergence Test
            </h2>
            <p className="text-text-secondary mb-6">
              Answer these totally scientific questions to find out your neurotype!
            </p>
            
            <div className="mb-8">
              <p className="text-xl font-medium text-primary mb-4">
                {questions[currentQuestion].text}
              </p>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="hero-button w-full text-left"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-text-secondary">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemeTestPopup;