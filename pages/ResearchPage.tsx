import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { researchTopics, researchChartData } from '../data/mockData';
import type { ResearchTopic } from '../types';

const PageShell: React.FC<{children: React.ReactNode, title: string}> = ({ children, title }) => (
    <div className="animate-fade-in pt-24 min-h-screen">
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

const ResearchPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageShell title="Research Findings">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-20">
          <div className="animate-fade-in-up">
              <h2 className="text-3xl font-serif text-brand-gold mb-6">Key Topics</h2>
              <div>
                  {researchTopics.map((topic, index) => (
                      <AccordionItem key={index} topic={topic} isOpen={openIndex === index} onClick={() => handleToggle(index)} />
                  ))}
              </div>
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <h2 className="text-3xl font-serif text-brand-gold mb-6 text-center">Prevalence of Tropes (%)</h2>
              <div className="w-full h-96 bg-gray-900/50 p-4 rounded-lg">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={researchChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
                              labelStyle={{ color: '#F9FAFB' }}
                              itemStyle={{ color: '#D4AF37' }}
                          />
                          <Legend wrapperStyle={{ color: '#E5E7EB' }} />
                          <Bar dataKey="value" fill="#D4AF37" name="Prevalence in Media" />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
        </div>
    </PageShell>
  );
};

export default ResearchPage;
