import React, { useEffect, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('about');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="about" className="min-h-screen py-20 bg-cyber-dark bg-grid-pattern relative overflow-hidden">
      {/* Background accent circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-neon-blue/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple animate-gradientFlow font-orbitron">
              <span className="relative inline-block">
                <span className="relative z-10">About Me</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple transform translate-y-1"></span>
              </span>
            </h2>
          </div>
          
          <div className="space-y-8">
            <p className={`text-lg text-gray-300 leading-relaxed transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              I'm Kieran, an Information Systems Manager who builds digital solutions that work. At my day job, I develop and maintain web platforms and IT infrastructure that transform business challenges into streamlined systems. My background in economics gives me a unique perspective - I see technology as a tool for genuine improvement, not innovation merely for its own sake.
            </p>
            
            <p className={`text-lg text-gray-300 leading-relaxed transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              This website is my first complete full-stack project - it'll be my digital laboratory where I experiment with both old and new tech. The chatbot in the bottom right corner uses my server to communicate with the ChatGPT 3.5 API... give it a go! As I continue to develop my Linux server skills, I'll be hosting more projects on my VPS, expanding this digital playground.
            </p>
            
            <p className={`text-lg text-gray-300 leading-relaxed transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              When I'm not coding, you'll find me running long distances, drinking craft beers and wild camping, or enjoying TV and cinema.
            </p>
            
            <div className={`border border-neon-blue/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm transition-all duration-500 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 group relative overflow-hidden transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '800ms'}}>
              {/* Animated border effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue rounded-lg opacity-0 group-hover:opacity-30 blur-sm"></div>
              <div className="absolute inset-0 bg-cyber-light/30 rounded-lg z-0"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-orbitron text-white mb-4 group-hover:text-neon-blue transition-colors duration-300">
                  <span className="relative inline-block">
                    Technical Arsenal
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-500"></span>
                  </span>
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["React", "Node.js", "Python", "Linux", "AI", "Rest API", "Power BI", "Excel"].map((skill, index) => (
                    <div 
                      key={skill} 
                      className={`relative border border-neon-blue/20 rounded px-4 py-2 text-center bg-cyber-dark transition-all duration-300 hover:bg-cyber-light/10 group/skill overflow-hidden cursor-pointer transform hover:-translate-y-1
                        ${index % 2 === 0 ? 'hover:border-neon-blue hover:text-neon-blue' : 
                          'hover:border-neon-purple hover:text-neon-purple'}`
                      }
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="relative z-10 font-medium">{skill}</span>
                      
                      {/* Enhanced glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                        <div className={`absolute -inset-1 rounded-lg blur-md
                          ${index % 2 === 0 ? 'bg-neon-blue/10' : 'bg-neon-purple/10'}`
                        }></div>
                        <div className={`absolute -inset-0.5 bg-gradient-to-r rounded-lg
                          ${index % 2 === 0 ? 'from-neon-blue/0 via-neon-blue/20 to-neon-blue/0' : 
                            'from-neon-purple/0 via-neon-purple/20 to-neon-purple/0'}`
                        }></div>
                      </div>
  
                      {/* Pulse effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-all duration-300 animate-pulse"></div>
                      
                      {/* Moving light effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/skill:opacity-100">
                        <div className={`absolute -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover/skill:translate-x-full transition-all duration-1000 ease-in-out`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className={`border border-neon-purple/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm transition-all duration-500 hover:border-neon-purple hover:shadow-lg hover:shadow-neon-purple/20 group cursor-default relative overflow-hidden transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '1000ms'}}>
                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-neon-purple/50 transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-neon-purple/50 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                
                <h3 className="text-xl font-orbitron text-white mb-3 group-hover:text-neon-purple transition-colors duration-300">
                  <span className="relative inline-block">
                    Background
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-purple group-hover:w-full transition-all duration-500"></span>
                  </span>
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  My tech journey started when I was about 6 years old on my first computer, a Windows 95 desktop.
                </p>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  The early web really captured my attention and threw me into a world of exploration. I loved ICT lessons at school, and took additional CISCO classes to learn more about hardware and networking. When I was around 13 I started learning how to use Photoshop, and feeling adventurous, first installed Ubuntu Linux (6.06 Dapper Drake) on my PC.
                </p>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                  During A-Levels, I picked up Computer Science and got my first taste of programming with Pascal and Visual Basic. At this time everybody wanted to be a Grime MC rather than a programmer, so I started learning how to make music on computers - starting with FruityLoops, Cubase and finally Ableton Live. I then went on to study a degree in Economics where I honed my skills with statistics and picked up an interest in data analytics.
                </p>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Throughout all of this I'd never gotten the chance to put together a full stack piece of work before - so after studying Cloud Computing, React and Node.js with IBM's Training platform I thought I'd finally build something and host it online and here we are.
                </p>
              </div>
              
              <div className={`border border-neon-blue/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm transition-all duration-500 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 group cursor-default relative overflow-hidden transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '1200ms'}}>
                {/* Ambient glow effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-neon-blue/0 via-neon-blue/0 to-neon-blue/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
                
                {/* Animated corner accents */}
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-neon-blue/50 transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-neon-blue/50 transform -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-orbitron text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
                    <span className="relative inline-block">
                      Philosophy
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-500"></span>
                    </span>
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    I believe in technology that empowers rather than restricts. The Ubuntu philosophy of "I am because we are" resonates with me - our digital landscape should be collaborative, accessible, and community-driven. This is why I value free and open-source software. The web was meant to be an open playground of ideas, not walled gardens controlled by a handful of companies. I care about digital privacy and believe people should have control over their own data and digital identities. With AI, I see an opportunity to enhance human creativity, not replace it. The most exciting applications are those that give us new tools to express ourselves and solve problems in ways we couldn't before. I'm committed to technology that amplifies our uniquely human capacity for imagination and connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cyber-dark to-transparent z-10"></div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-neon-blue/70 animate-floatUp"></div>
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-neon-purple/70 animate-floatUp" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-neon-blue/70 animate-floatUp" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-neon-purple/50 animate-floatUp" style={{animationDelay: '1.5s', animationDuration: '5s'}}></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute left-0 top-0 w-full h-0.5 bg-gradient-to-r from-neon-blue/0 via-neon-blue/50 to-neon-blue/0"></div>
        <div className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-neon-purple/0 via-neon-purple/50 to-neon-purple/0"></div>
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-neon-blue/0 via-neon-blue/50 to-neon-blue/0"></div>
        <div className="absolute right-0 top-0 h-full w-0.5 bg-gradient-to-b from-neon-purple/0 via-neon-purple/50 to-neon-purple/0"></div>
      </div>
    </section>
  );
};

export default About;