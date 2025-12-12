
import React, { useState } from 'react';
import { quizQuestions } from '../data/mockData';
import SideNav from '../components/SideNav';

const PageShell: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => (
    <div className="animate-fade-in pt-24 min-h-screen lg:pl-64">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-serif text-brand-gold">{title}</h1>
                <p className="mt-4 text-lg text-medium-text max-w-3xl mx-auto">Ethical standards and practical steps for authentic representation in media.</p>
            </header>
            {children}
        </div>
    </div>
);

const Chapter: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
        <div className="flex items-baseline mb-6 border-b border-gray-800 pb-4">
            <span className="text-2xl md:text-3xl font-serif text-brand-gold mr-3 opacity-80 shrink-0">Chapter-{number}</span>
            <h3 className="text-xl md:text-2xl font-bold text-light-text">{title}</h3>
        </div>
        <div className="space-y-6 text-medium-text">
            {children}
        </div>
    </div>
);

const SubSection: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-4">
        {title && <h4 className="text-lg font-bold text-gray-200 mb-3 block border-l-2 border-brand-gold pl-3">{title}</h4>}
        {children}
    </div>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="space-y-3">
        {items.map((item, idx) => (
            <li key={idx} className="flex items-start text-base leading-relaxed text-gray-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 mr-3 flex-shrink-0"></span>
                <span>{item}</span>
            </li>
        ))}
    </ul>
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
            <SideNav sections={[
                { id: 'overview', label: 'Overview' },
                { id: 'chapters', label: 'Guidelines' },
                { id: 'quiz', label: 'Test Your Knowledge' }
            ]} />

            {/* Overview Section */}
            <section id="overview" className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 rounded-xl border-l-4 border-brand-gold shadow-lg animate-fade-in-up">
                <h2 className="text-2xl font-serif text-brand-gold mb-4">Overview</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                    How the entertainment industry shows neurodivergent people (those with conditions like Autism, ADHD, Dyslexia, and others) can shape public attitudes, either positively or negatively. Historically, these portrayals have relied on stereotypes or inaccuracies, damaging real lives by spreading stigma and misunderstanding. To correct this, new guidelines call for portrayals that are respectful, accurate, and involve neurodivergent people at every stage.
                </p>
            </section>

            {/* Chapters Grid */}
            <div id="chapters" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 animate-fade-in-up" style={{ animationDelay: '100ms' }}>

                <Chapter number="1" title="Who Should Follow These Guidelines?">
                    <SubSection>
                        <BulletList items={[
                            "Applies to all media: Films, TV, ads, web series, podcasts, theatre, etc.",
                            "Targets everyone involved: producers, writers, directors, actors, agencies, and more."
                        ]} />
                    </SubSection>
                    <SubSection title="Core Principles">
                        <BulletList items={[
                            "Show dignity, respect, and complexity for neurodivergent characters.",
                            "Make stories authentic, based on real research, not stereotypes.",
                            "Directly involve neurodivergent people or experts in creating content.",
                            "Never reinforce stigma or use harmful language.",
                            "Protect the privacy and well-being of neurodivergent people.",
                            "Avoid using outdated or offensive terms."
                        ]} />
                    </SubSection>
                </Chapter>

                <Chapter number="2" title="Best Practices for Creating Content">
                    <SubSection>
                        <BulletList items={[
                            "Research the specific neurotype accurately; don’t just rely on external behaviours.",
                            "Train actors, especially neurotypical actors, with guidance from neurodivergent consultants.",
                            "Don’t use a neurodivergent character for shock, pity, or just to win awards.",
                            "Avoid harmful tropes (like being childlike, unpredictable, or using them only as a plot device).",
                            "Sensitively depict difficult experiences, like meltdown or sensory overload."
                        ]} />
                    </SubSection>
                    <SubSection title="On-Set and Behind the Scenes">
                        <BulletList items={[
                            "Treat neurodivergent people respectfully as neurodivergent team members.",
                            "Consultants should help supervise sensitive scenes."
                        ]} />
                    </SubSection>
                </Chapter>

                <Chapter number="3" title="For Writers and Directors">
                    <SubSection>
                        <BulletList items={[
                            "Create full, complex characters who have stories beyond their neurotypes.",
                            "Avoid over-medicalising or infantilising characters.",
                            "Don’t exaggerate traits for drama or comedy."
                        ]} />
                    </SubSection>
                    <SubSection title="For Advertising and Digital Media">
                        <BulletList items={[
                            "Never use neurodivergence as a tool for emotional manipulation or to evoke pity.",
                            "Avoid making comparisons to what’s considered 'normal.'"
                        ]} />
                    </SubSection>
                    <SubSection title="Training and Oversight">
                        <BulletList items={[
                            "Provide regular training about neurodiversity to all staff.",
                            "Keep detailed records of consultant contributions and use their feedback."
                        ]} />
                    </SubSection>
                </Chapter>

                <Chapter number="4" title="Dealing with Mistakes">
                    <SubSection>
                        <BulletList items={[
                            "Any content that misrepresents or exploits neurodivergent people should be corrected. This might involve further training, issuing public clarifications or editing/removing content."
                        ]} />
                    </SubSection>
                    <SubSection title="Complaints & Accountability">
                        <BulletList items={[
                            "Anyone can file a complaint if a portrayal is harmful, aiming for correction or higher scrutiny from platforms, commissions, or professional associations."
                        ]} />
                    </SubSection>
                </Chapter>

                <Chapter number="5" title="Industry Recommendations">
                    <SubSection>
                        <BulletList items={[
                            "Cast neurodivergent actors when possible and ensure the workplace is accessible for all.",
                            "Encourage internal oversight within organisations to ensure ongoing compliance."
                        ]} />
                    </SubSection>
                </Chapter>

                <Chapter number="6" title="Prioritising Public Awareness">
                    <SubSection>
                        <BulletList items={[
                            "Educate audiences about neurodiversity through behind-the-scenes content and responsible media coverage."
                        ]} />
                    </SubSection>
                </Chapter>

                <div className="lg:col-span-2">
                    <Chapter number="7" title="Disclaimers and Credits">
                        <SubSection>
                            <BulletList items={[
                                "All productions must display a disclaimer clearly stating the steps taken for ethical depiction, and properly credit neurodiversity consultants (with their permission).",
                                "Failure to do so may lead to required corrections and could impact the industry’s standing."
                            ]} />
                        </SubSection>
                    </Chapter>
                </div>
            </div>

            {/* Conclusion */}
            <div className="max-w-4xl mx-auto mb-20 text-center bg-gray-900/30 p-8 rounded-lg border border-gray-800 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h3 className="text-2xl font-serif text-brand-gold mb-4">Conclusion</h3>
                <p className="text-xl text-light-text font-light leading-relaxed">
                    By following these guidelines, the industry can ensure that neurodivergent individuals are represented fairly, resulting in a more informed, respectful, and inclusive society.
                </p>
            </div>

            {/* Quiz Section */}
            <section id="quiz" className="bg-black py-16 px-8 rounded-lg border border-gray-700 shadow-xl mb-20 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h2 className="text-3xl font-serif text-brand-gold mb-8 text-center">Test Your Knowledge</h2>
                <div className="max-w-2xl mx-auto">
                    <Quiz />
                </div>
            </section>
        </PageShell>
    );
};

export default GuidelinesPage;
