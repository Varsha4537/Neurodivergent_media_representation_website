import React, { useState } from 'react';
import { quizQuestions } from '../data/mockData';

const PageShell: React.FC<{children: React.ReactNode, title: string}> = ({ children, title }) => (
    <div className="animate-fade-in pt-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
            <h1 className="text-5xl font-serif text-brand-gold">{title}</h1>
            <p className="mt-4 text-lg text-medium-text max-w-3xl mx-auto">Practical steps and resources for creating authentic and respectful neurodivergent characters.</p>
        </header>
        {children}
      </div>
    </div>
);

const GuidelineCard: React.FC<{number: string, title: string, children: React.ReactNode}> = ({ number, title, children }) => (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-4">
            <span className="text-3xl font-serif text-brand-gold mr-4">{number}</span>
            <h3 className="text-xl font-bold text-light-text">{title}</h3>
        </div>
        <p className="text-medium-text">{children}</p>
    </div>
);

const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const question = quizQuestions[currentQuestionIndex];

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === question.correctOption) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    const handleRestart = () => {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
      setShowResults(false);
    };

    if (showResults) {
        return (
            <div className="text-center">
                <h3 className="text-2xl text-light-text mb-4">Quiz Complete!</h3>
                <p className="text-4xl font-bold text-brand-gold mb-6">{score} / {quizQuestions.length}</p>
                <p className="text-medium-text mb-8">You've completed the quiz. Keep learning and striving for authenticity!</p>
                <button onClick={handleRestart} className="bg-brand-gold text-black font-bold py-2 px-6 rounded-md hover:bg-yellow-300 transition-colors">
                    Restart Quiz
                </button>
            </div>
        )
    }

    return (
        <div>
            <p className="text-medium-text mb-2">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
            <h3 className="text-xl text-light-text mb-6">{question.question}</h3>
            <div className="space-y-4">
                {question.options.map((option, index) => {
                    const isCorrect = index === question.correctOption;
                    const isSelected = index === selectedOption;
                    let buttonClass = 'border-gray-600 hover:border-brand-gold hover:bg-gray-800';
                    if (isAnswered && isCorrect) {
                        buttonClass = 'border-green-500 bg-green-500/20';
                    } else if (isAnswered && isSelected && !isCorrect) {
                        buttonClass = 'border-red-500 bg-red-500/20';
                    }

                    return (
                        <button key={index} onClick={() => handleOptionSelect(index)} disabled={isAnswered}
                            className={`w-full text-left p-4 border-2 rounded-md transition-all ${buttonClass}`}>
                            {option}
                        </button>
                    )
                })}
            </div>
            {isAnswered && (
                <div className="mt-6 p-4 bg-gray-800 rounded-md animate-fade-in">
                    <p className="font-bold text-light-text mb-2">Explanation:</p>
                    <p className="text-medium-text">{question.explanation}</p>
                    <button onClick={handleNext} className="mt-4 bg-brand-gold text-black font-bold py-2 px-6 rounded-md hover:bg-yellow-300 transition-colors">
                        {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Show Results'}
                    </button>
                </div>
            )}
        </div>
    );
};


const GuidelinesPage: React.FC = () => {
    return (
        <PageShell title="Filmmaker Guidelines">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-fade-in-up">
                <GuidelineCard number="01" title="Go Beyond the Diagnosis">
                    Focus on the individual's personality, interests, and relationships. Neurodivergence is part of who they are, not their entire identity.
                </GuidelineCard>
                <GuidelineCard number="02" title="Consult Lived Experience">
                    Involve neurodivergent people in your creative process as writers, consultants, and actors. Their insights are invaluable for authenticity.
                </GuidelineCard>
                <GuidelineCard number="03" title="Avoid Harmful Tropes">
                    Be critical of stereotypes like the emotionless savant, the tragic figure, or the "magical" helper. Create characters with agency and depth.
                </GuidelineCard>
            </div>

            <section className="bg-black py-16 px-8 rounded-lg border border-gray-700 shadow-xl mb-20">
                <h2 className="text-3xl font-serif text-brand-gold mb-8 text-center">Test Your Knowledge</h2>
                <div className="max-w-2xl mx-auto">
                    <Quiz />
                </div>
            </section>
        </PageShell>
    );
};

export default GuidelinesPage;
