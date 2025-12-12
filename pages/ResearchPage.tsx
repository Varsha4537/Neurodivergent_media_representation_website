import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { researchTopics } from '../data/mockData';
import type { ResearchTopic } from '../types';
import SideNav from '../components/SideNav';

const PageShell: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => (
    <div className="animate-fade-in pt-24 min-h-screen lg:pl-64">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-serif text-brand-gold">{title}</h1>
                <p className="mt-4 text-lg text-medium-text max-w-3xl mx-auto">Insights and findings from our analysis of neurodivergent representation in media.</p>
            </header>
            {children}
        </div>
    </div>
);

const AccordionItem: React.FC<{ topic: ResearchTopic, isOpen: boolean, onClick: () => void }> = ({ topic, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-700">
            <button onClick={onClick} className="w-full text-left py-6 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-light-text">{topic.title}</h3>
                    <p className="text-medium-text mt-1">{topic.summary}</p>
                </div>
                <span className={`transform transition-transform duration-300 text-brand-gold text-2xl ${isOpen ? 'rotate-45' : 'rotate-0'}`}>+</span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-light-text pb-6 pr-8 leading-relaxed">{topic.content}</p>
            </div>
        </div>
    );
};

const topicKeywords = {
    "0": {
        label: "Daily Life & Support",
        words: ["people", "work", "school", "need", "child", "say", "help", "life", "year", "way", "time", "thing"]
    },
    "1": {
        label: "Music & Entertainment",
        words: ["music", "play", "song", "year", "new", "star", "man", "world", "game", "release", "story", "musical"]
    },
    "2": {
        label: "Emotional Cinematic Narratives",
        words: ["good", "love", "story", "great", "cry", "drama", "woo", "child", "aamir", "actor", "temple", "khan"]
    },
    "3": {
        label: "Audience Perception",
        words: ["think", "know", "feel", "time", "thing", "get", "love", "want", "good", "way", "bad", "look"]
    },
    "4": {
        label: "Identity & Representation",
        words: ["autistic", "people", "autism", "person", "autistic people", "sia", "think", "spectrum", "know", "thing", "way", "autistic person"]
    }
};

const TopicModellingDisplay: React.FC = () => {
    // Distinct themes for each topic to create visual separation
    const topicThemes = [
        { color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', pillBg: 'bg-cyan-900/30', hoverBorder: 'group-hover:border-cyan-400' },
        { color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10', pillBg: 'bg-purple-900/30', hoverBorder: 'group-hover:border-purple-400' },
        { color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', pillBg: 'bg-emerald-900/30', hoverBorder: 'group-hover:border-emerald-400' },
        { color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', pillBg: 'bg-amber-900/30', hoverBorder: 'group-hover:border-amber-400' },
        { color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10', pillBg: 'bg-rose-900/30', hoverBorder: 'group-hover:border-rose-400' },
    ];

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {Object.entries(topicKeywords).map(([key, data], index) => {
                    const theme = topicThemes[index % topicThemes.length];
                    return (
                        <div key={key} className={`relative bg-gray-900/60 border ${theme.border} rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group flex flex-col`}>
                            {/* Card Header */}
                            <div className="p-5 border-b border-gray-800 relative overflow-hidden bg-gradient-to-b from-gray-800/50 to-transparent">
                                <div className={`absolute top-0 left-0 w-1.5 h-full ${theme.bg.replace('/10', '/60')} transition-all duration-300 group-hover:w-2`}></div>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block pl-2">Topic {key}</span>
                                <h4 className={`text-lg font-serif font-bold ${theme.color} leading-tight pl-2`}>{data.label}</h4>
                            </div>

                            {/* Keywords */}
                            <div className="p-5 flex-grow bg-black/20">
                                <div className="flex flex-wrap gap-2">
                                    {data.words.map((word, i) => (
                                        <span
                                            key={i}
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide 
                                            ${theme.pillBg} ${theme.color} border border-transparent ${theme.hoverBorder}
                                            transition-all duration-300 hover:scale-110 hover:brightness-125 cursor-default
                                            shadow-sm`}
                                            style={{
                                                opacity: 0,
                                                animation: `fadeInUp 0.5s ease-out forwards ${i * 50}ms`
                                            }}
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const WordCloudAnalysis: React.FC = () => {
    const sentiments = [
        {
            title: 'Positive Sentiment',
            color: 'text-green-400',
            border: 'border-green-500/30',
            bg: 'bg-green-500/10',
            desc: "The focus is heavily on empathy, connection, and understanding. Audiences connect deeply with emotional narratives.",
            dominant: ["love", "feel", "family", "relationship"]
        },
        {
            title: 'Neutral Sentiment',
            color: 'text-gray-400',
            border: 'border-gray-500/30',
            bg: 'bg-gray-500/10',
            desc: "These discussions are largely analytical, comparing representations and discussing diagnosis criteria objectively.",
            dominant: ["autism", "spectrum", "portray", "neurotypical"]
        },
        {
            title: 'Negative Sentiment',
            color: 'text-red-400',
            border: 'border-red-500/30',
            bg: 'bg-red-500/10',
            desc: "Reflects strong disagreements with accuracy and harmful tropes. Often driven by frustration with inauthentic portrayals.",
            dominant: ["wrong", "problem", "spectrum", "bad"]
        }
    ];

    return (
        <div className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-700/50 mb-16 animate-fade-in">
            <h4 className="text-3xl font-serif text-brand-gold mb-8 text-center">Word Cloud Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sentiments.map((item, index) => (
                    <div key={index} className={`p-6 rounded-xl border ${item.border} ${item.bg} hover:bg-opacity-20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                        <h5 className={`text-xl font-bold ${item.color} mb-4 pb-2 border-b border-gray-700/30`}>{item.title}</h5>
                        <p className="text-medium-text text-base leading-relaxed mb-6 min-h-[5rem]">
                            {item.desc}
                        </p>
                        <div>
                            <h6 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Dominant Words</h6>
                            <div className="flex flex-wrap gap-2">
                                {item.dominant.map((word, i) => (
                                    <span key={i} className={`px-2 py-1 bg-black/40 border border-gray-700/50 rounded text-xs font-mono ${item.color}`}>
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const InterviewSection: React.FC = () => (
    <div id="interview" className="mt-20 animate-fade-in-up">
        <h2 className="text-3xl font-serif text-brand-gold mb-10 text-center">Interview Insights: Psychologists vs. Filmmakers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Psychologists */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-blue-900/50 hover:border-blue-500/50 transition-colors duration-300">
                <h3 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-900/50 pb-2">Psychologists’ Perspective</h3>
                <ul className="space-y-4 text-medium-text text-sm leading-relaxed">
                    <li className="flex gap-3"><span className="text-blue-500 flex-shrink-0">•</span><span>High stigma and low educational awareness continue to shape neurodivergent experiences.</span></li>
                    <li className="flex gap-3"><span className="text-blue-500 flex-shrink-0">•</span><span>Media influences public perception, but audiences <strong className="text-gray-300">can think critically</strong> if educated early.</span></li>
                    <li className="flex gap-3"><span className="text-blue-500 flex-shrink-0">•</span><span>Films like <em>Barfi</em>, <em>Taare Zameen Par</em>, <em>My Name is Khan</em> introduce neurodiversity but still rely on <strong className="text-gray-300">extreme or boxed portrayals</strong>.</span></li>
                    <li className="flex gap-3"><span className="text-blue-500 flex-shrink-0">•</span><span>Representation should move beyond simplified labels and stereotypes.</span></li>
                </ul>
            </div>

            {/* Filmmakers */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-brand-gold/30 hover:border-brand-gold/60 transition-colors duration-300">
                <h3 className="text-xl font-bold text-brand-gold mb-4 border-b border-brand-gold/30 pb-2">Filmmakers’ Perspective</h3>
                <ul className="space-y-4 text-medium-text text-sm leading-relaxed">
                    <li className="flex gap-3"><span className="text-brand-gold flex-shrink-0">•</span><span>Representation is driven by <strong className="text-gray-300">creative intent and motivation</strong>, not obligation.</span></li>
                    <li className="flex gap-3"><span className="text-brand-gold flex-shrink-0">•</span><span>Fiction does not need to be fully accurate as long as core ideas and emotions are delivered.</span></li>
                    <li className="flex gap-3"><span className="text-brand-gold flex-shrink-0">•</span><span>Some dramatization is inevitable for storytelling and commercial appeal.</span></li>
                    <li className="flex gap-3"><span className="text-brand-gold flex-shrink-0">•</span><span>Want to convey caregiver experiences and spark critical thinking.</span></li>
                </ul>
            </div>

            {/* Common Ground */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors duration-300 md:col-span-1 md:row-span-1">
                <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Common Ground</h3>
                <ul className="space-y-4 text-medium-text text-sm leading-relaxed">
                    <li className="flex gap-3"><span className="text-gray-500 flex-shrink-0">•</span><span>Both groups agree collaboration could help, but <strong className="text-gray-300">strict ethical guidelines may feel restrictive</strong>.</span></li>
                    <li className="flex gap-3"><span className="text-gray-500 flex-shrink-0">•</span><span>Creative freedom remains a priority, yet openness to expert input is increasing.</span></li>
                    <li className="flex gap-3"><span className="text-gray-500 flex-shrink-0">•</span><span>Both acknowledge the challenge of defining a single “correct” way to portray complex neurodivergence.</span></li>
                    <li className="flex gap-3"><span className="text-gray-500 flex-shrink-0">•</span><span>Preference for neurotypical actors continues due to limited industry resources for neurodivergent performers.</span></li>
                    <li className="flex gap-3"><span className="text-gray-500 flex-shrink-0">•</span><span>Ultimately, representation is shaped by creator intention — raising the question of how <strong className="text-gray-300">subjective guidelines</strong> can be.</span></li>
                </ul>
            </div>
        </div>
    </div>
);

const NetnographySection: React.FC = () => (
    <div id="netnography" className="mt-20 animate-fade-in-up">
        <h2 className="text-3xl font-serif text-brand-gold mb-8">Netnography: Audience Perspectives</h2>
        <div className="bg-gradient-to-br from-gray-900/80 to-black p-8 rounded-xl border-l-4 border-brand-gold shadow-lg">
            <ul className="space-y-8 text-lg text-medium-text">
                <li>
                    <strong className="text-brand-gold text-xl block mb-2 font-serif">Preference for Subtlety</strong>
                    <p>Audiences prefer <strong className="text-white">subtle or “coded” portrayals</strong> over explicitly labeled neurodivergent characters. Characters like <span className="text-white font-semibold">Dr. Temperance Brennan (Bones)</span> and <span className="text-white font-semibold">Dr. Spencer Reid (Criminal Minds)</span> resonate strongly without being formally diagnosed.</p>
                </li>
                <li>
                    <strong className="text-brand-gold text-xl block mb-2 font-serif">Critique of Overt Stereotypes</strong>
                    <p>Overt portrayals are often criticized for stereotypes. For example:</p>
                    <ul className="mt-3 ml-6 list-disc text-base space-y-2 text-gray-400 marker:text-brand-gold">
                        <li><em>The Good Doctor</em> → “autistic genius” trope</li>
                        <li><em>The Accountant</em>, <em>Extraordinary Attorney Woo</em> → exaggerated traits</li>
                    </ul>
                </li>
                <li>
                    <strong className="text-brand-gold text-xl block mb-2 font-serif">Clinical Accuracy Concerns</strong>
                    <p>Viewers highlight the lack of <strong className="text-white">clinical accuracy</strong>, especially around <strong className="text-white">comorbid conditions</strong>, which real-life experiences commonly include.</p>
                </li>
            </ul>
        </div>
    </div>
);

const QuantitativeSection: React.FC = () => {
    const sentimentData = [
        { name: 'Positive', value: 24220, color: '#4ade80' },
        { name: 'Neutral', value: 5800, color: '#9ca3af' },
        { name: 'Negative', value: 12200, color: '#f87171' },
    ];

    const emotionData = [
        { name: 'Positive', value: 353000 },
        { name: 'Trust', value: 222000 },
        { name: 'Negative', value: 218000 },
        { name: 'Anticipation', value: 165000 },
        { name: 'Joy', value: 150000 },
        { name: 'Fear', value: 131000 },
        { name: 'Sadness', value: 123000 },
        { name: 'Anger', value: 99000 },
        { name: 'Surprise', value: 77000 },
        { name: 'Disgust', value: 73000 },
    ];

    return (
        <div id="quantitative" className="mt-20 animate-fade-in-up">
            <h2 className="text-3xl font-serif text-brand-gold mb-8 text-center">Quantitative Findings <span className="text-xl text-gray-500 block font-sans font-normal mt-2 tracking-wide">(42,220 Comments Analysed)</span></h2>

            {/* Sentiment Analysis Section with Chart */}
            <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700/50 mb-12">
                <h4 className="text-2xl font-bold text-light-text mb-6 border-b border-gray-700 pb-3">Overall Sentiment Distribution</h4>
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    {/* Chart Area */}
                    <div className="w-full lg:w-1/2 h-80 bg-gray-900/50 rounded-lg p-4 shadow-inner">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sentimentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#D1D5DB' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#D1D5DB' }}
                                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #4B5563', borderRadius: '0.375rem' }}
                                    labelStyle={{ color: '#F9FAFB', fontWeight: 'bold' }}
                                    itemStyle={{ color: '#D4AF37' }}
                                />
                                <Bar dataKey="value" name="Comments" radius={[4, 4, 0, 0]}>
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Insights Area */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div>
                            <h5 className="text-lg font-bold text-light-text mb-2 flex items-center">
                                <span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>
                                Positive Sentiment
                            </h5>
                            <p className="text-medium-text leading-relaxed">
                                The majority of comments <strong className="text-green-400">(~57%)</strong> reflect strong positive sentiment. This indicates deep audience engagement and emotional connection with neurodivergent characters, regardless of clinical accuracy.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-lg font-bold text-light-text mb-2 flex items-center">
                                <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
                                Negative Sentiment
                            </h5>
                            <p className="text-medium-text leading-relaxed">
                                A significant portion <strong className="text-red-400">(~29%)</strong> expresses negative sentiment. This is often driven by anger or frustration towards unrealistic tropes, harmful stereotypes (like <em>Music</em>), and fear that such portrayals distort public understanding.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-lg font-bold text-light-text mb-2 flex items-center">
                                <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
                                Neutral Sentiment
                            </h5>
                            <p className="text-medium-text leading-relaxed">
                                The remaining comments are neutral, often involving objective discussions about the spectrum, diagnosis, or comparisons between different media portrayals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emotion Distribution Section */}
            <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700/50 mb-12">
                <h4 className="text-2xl font-bold text-light-text mb-6 border-b border-gray-700 pb-3">Overall Emotion Distribution in Audience Discussions</h4>
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    {/* Chart Area */}
                    <div className="w-full lg:w-3/5 h-96 bg-gray-900/50 rounded-lg p-4 shadow-inner">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={emotionData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#D1D5DB', fontSize: 12 }}
                                    tickLine={false}
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                />
                                <YAxis
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#D1D5DB' }}
                                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #4B5563', borderRadius: '0.375rem' }}
                                    labelStyle={{ color: '#F9FAFB', fontWeight: 'bold' }}
                                    itemStyle={{ color: '#5A92FA' }}
                                />
                                <Bar dataKey="value" name="Frequency" fill="#5A92FA" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Emotional Insights Area */}
                    <div className="w-full lg:w-2/5 space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-lg border border-blue-900/30">
                            <h5 className="text-lg font-bold text-blue-300 mb-4 border-b border-blue-900/50 pb-2">Emotional Response Analysis</h5>
                            <p className="text-medium-text leading-relaxed">
                                Dominant emotions: <strong className="text-blue-400">Trust</strong> and <strong className="text-blue-400">Anticipation</strong> are among the highest, suggesting audiences generally approach these narratives with openness and a desire to connect.
                                <br /><br />
                                However, the presence of <strong className="text-red-400">Anger</strong> and <strong className="text-red-400">Fear</strong> highlights the emotional toll of inaccurate representation—where bad portrayals don't just bore audiences, they actively cause distress and concern about real-world consequences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Word Cloud Analysis (Text Only) */}
            <WordCloudAnalysis />

            {/* Full Width Topic Modelling Section */}
            <div className="bg-gray-800/30 p-4 md:p-8 rounded-lg border border-gray-700/50">
                <div className="mb-8">
                    <h4 className="text-2xl font-bold text-light-text mb-2 text-center md:text-left">Topic Modelling</h4>
                    <p className="text-medium-text text-center md:text-left">Key themes identified across 5 dominant topics from the comment analysis, revealing what audiences discuss most.</p>
                </div>
                <TopicModellingDisplay />
            </div>
        </div>
    );
};

const ConclusionSection: React.FC = () => (
    <div id="conclusion" className="mt-24 mb-10 p-10 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-b border-brand-gold/20 text-center animate-fade-in-up shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <h2 className="text-3xl font-serif text-brand-gold mb-8 tracking-widest uppercase">Overall Conclusion</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-xl text-gray-400 font-light leading-relaxed">
            <p>Psychologists, filmmakers, and audiences each bring different expectations to neurodivergent representation.</p>
            <p>Despite differing views, there is growing recognition that neurodivergent individuals are <strong className="text-white font-normal">not the “abnormal other”</strong>.</p>
            <p>Representation is evolving, but <span className="text-brand-gold">accuracy</span>, <span className="text-brand-gold">nuance</span>, and <span className="text-brand-gold">inclusion</span> remain key challenges — and opportunities — for future media.</p>
        </div>
    </div>
);

const ResearchPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <PageShell title="Research Findings">
            <SideNav sections={[
                { id: 'key-topics', label: 'Key Topics' },
                { id: 'interview', label: 'Interview Insights' },
                { id: 'netnography', label: 'Netnography' },
                { id: 'quantitative', label: 'Quantitative Findings' },
                { id: 'conclusion', label: 'Conclusion' }
            ]} />
            <div id="key-topics" className="pb-12 animate-fade-in-up">
                <h2 className="text-3xl font-serif text-brand-gold mb-6">Key Topics</h2>
                <div>
                    {researchTopics.map((topic, index) => (
                        <AccordionItem key={index} topic={topic} isOpen={openIndex === index} onClick={() => handleToggle(index)} />
                    ))}
                </div>
            </div>

            {/* New Sections */}
            <InterviewSection />
            <NetnographySection />
            <QuantitativeSection />
            <ConclusionSection />

        </PageShell>
    );
};

export default ResearchPage;
