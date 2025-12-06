import React from 'react';

const PageShell: React.FC<{children: React.ReactNode, title: string}> = ({ children, title }) => (
    <div className="animate-fade-in pt-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
            <h1 className="text-5xl font-serif text-brand-gold">{title}</h1>
            <p className="mt-4 text-lg text-medium-text max-w-3xl mx-auto">Meet the team behind this project and learn more about our mission.</p>
        </header>
        {children}
      </div>
    </div>
);

const teamMembers = [
    { name: 'Dr. Evelyn Reed', role: 'Project Supervisor & Professor', email: 'e.reed@university.edu' },
    { name: 'Alex Chen', role: 'Student Lead & Researcher', email: 'a.chen@university.edu' },
    { name: 'Ben Carter', role: 'Lead Developer & UX Designer', email: 'b.carter@university.edu' },
    { name: 'Casey Rodriguez', role: 'Content Strategist & Writer', email: 'c.rodriguez@university.edu' },
    { name: 'Dana Washington', role: 'Visual Designer & Media Analyst', email: 'd.washington@university.edu' },
];


const ContactPage: React.FC = () => {
    return (
        <PageShell title="Get In Touch">
            <div className="max-w-4xl mx-auto mb-20 text-center">
                
                <section className="bg-gray-900/50 p-8 rounded-lg border border-gray-700 mb-16 animate-fade-in-up">
                    <h2 className="text-3xl font-serif text-brand-gold mb-4">About The Project</h2>
                    <p className="text-lg text-medium-text leading-relaxed text-left">
                        This website is the culmination of an Interdisciplinary Major Project (IMP), where a dedicated team of five students and a supervising professor came together. Our mission was to research the state of neurodivergent representation in media and develop a resource that is both educational and impactful for filmmakers, students, and the general public.
                    </p>
                </section>

                <section className="animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <h2 className="text-3xl font-serif text-brand-gold mb-10">Meet the Team</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 w-full sm:w-80 text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-light-text">{member.name}</h3>
                                <p className="text-brand-gold mb-2">{member.role}</p>
                                <a href={`mailto:${member.email}`} className="text-medium-text hover:text-brand-gold transition-colors break-all">{member.email}</a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </PageShell>
    );
};

export default ContactPage;