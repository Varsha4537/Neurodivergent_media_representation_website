
import React from 'react';
import SideNav from '../components/SideNav';

const PageShell: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => (
    <div className="animate-fade-in pt-24 min-h-screen lg:pl-64">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-serif text-brand-gold">{title}</h1>
                <p className="mt-4 text-lg text-medium-text max-w-3xl mx-auto">Meet the team behind this project and learn more about our mission.</p>
            </header>
            {children}
        </div>
    </div>
);

const mentors = [
    { name: 'Professor Gangaraju Saldi', role: 'Mentor' },
    { name: 'Professor Sasi Kiran RM', role: 'Subject Matter Expert' },
];

const teamMembers = [
    { name: 'Anushka Shyam Nair', role: 'Group Representative' },
    { name: 'Alina Mirchandani', role: 'Group Member' },
    { name: 'Diksha Takale', role: 'Group Member' },
    { name: 'Nandini Tara Sachdeva', role: 'Group Member' },
    { name: 'Varsha Gunturu', role: 'Group Member' },
];


const ContactPage: React.FC = () => {
    return (
        <PageShell title="Get In Touch">
            <SideNav sections={[
                { id: 'about', label: 'About' },
                { id: 'mentors', label: 'Mentors' },
                { id: 'team', label: 'The Team' },
                { id: 'workshops', label: 'Workshops' }
            ]} />
            <div className="max-w-4xl mx-auto mb-20 text-center">

                <section id="about" className="bg-gray-900/50 p-8 rounded-lg border border-gray-700 mb-16 animate-fade-in-up">
                    <h2 className="text-3xl font-serif text-brand-gold mb-4">About The Project</h2>
                    <p className="text-lg text-medium-text leading-relaxed text-left">
                        This website is the culmination of an Interdisciplinary Major Project (IMP), where a dedicated team of students came together under expert guidance. Our mission was to research the state of neurodivergent representation in media and develop a resource that is both educational and impactful for filmmakers, students, and the general public.
                    </p>
                </section>

                <section id="mentors" className="animate-fade-in-up mb-16" style={{ animationDelay: '100ms' }}>
                    <h2 className="text-3xl font-serif text-brand-gold mb-10">Mentors</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {mentors.map((member, index) => (
                            <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 w-full sm:w-80 text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-light-text">{member.name}</h3>
                                <p className="text-brand-gold mt-2">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="team" className="animate-fade-in-up mb-16" style={{ animationDelay: '200ms' }}>
                    <h2 className="text-3xl font-serif text-brand-gold mb-10">The Team</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 w-full sm:w-80 text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-light-text">{member.name}</h3>
                                <p className="text-brand-gold mt-2">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Workshop Information */}
                <section id="workshops" className="animate-fade-in-up bg-gray-900/50 p-8 rounded-lg border border-gray-700" style={{ animationDelay: '300ms' }}>
                    <h2 className="text-3xl font-serif text-brand-gold mb-6">Workshops & Inquiries</h2>
                    <div className="space-y-4">
                        <p className="text-lg text-medium-text leading-relaxed">
                            Interested in workshops regarding neurodivergent representation in media?
                        </p>
                        <div className="pt-4">
                            <p className="text-gray-400 mb-2">Contact:</p>
                            <a href="mailto:anushka.nair@flame.edu.in" className="text-xl md:text-2xl font-bold text-white hover:text-brand-gold transition-colors duration-300">
                                anushka.nair@flame.edu.in
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </PageShell>
    );
};

export default ContactPage;