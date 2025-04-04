import React from "react";
import SectionTransition, { EFFECTS } from "../../UI/SectionTransition";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 bg-cyber-dark bg-grid-pattern relative overflow-hidden">
      {/* Background accent circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-neon-blue/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionTransition 
            effect={EFFECTS.FADE_UP} 
            duration={0.8}
            threshold={0.2}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple animate-gradientFlow font-orbitron">
              <span className="relative inline-block">
                <span className="relative z-10">About Me</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple transform translate-y-1"></span>
              </span>
            </h2>
          </SectionTransition>
          
          <div className="space-y-8">
            <SectionTransition effect={EFFECTS.FADE_UP} delay={0.2}>
              <h3 className="text-2xl font-orbitron text-white mb-2">
                Welcome — I'm Kieran.
              </h3>
            </SectionTransition>
            
            <SectionTransition effect={EFFECTS.FADE_UP} delay={0.3}>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm an Information Systems Manager and developer specialising in user-friendly, digital infrastructure. My background in economics, particularly behavioural economics, uniquely informs my approach to technology. It helps me understand not just how systems work, but how people interact with them. By combining these insights with technical expertise, I develop solutions that genuinely streamline processes, improve user experience, and drive commercial success.
              </p>
            </SectionTransition>
            
            <SectionTransition effect={EFFECTS.FADE_UP} delay={0.4}>
              <h3 className="text-2xl font-orbitron text-white mb-2">
                This Website
              </h3>
            </SectionTransition>
            
            <SectionTransition effect={EFFECTS.FADE_UP} delay={0.5}>
              <p className="text-lg text-gray-300 leading-relaxed">
                Think of this site as my digital workshop—a space to design, build, and deploy.<br />
                This project represents my first full-stack development journey: a custom React frontend with Python Flask components running on a Linux VPS, and a backend integration with a ChatGPT-powered assistant. As I continue developing my skills, this site will evolve into a portfolio of practical tools and experiments.
              </p>
            </SectionTransition>
            
            <SectionTransition effect={EFFECTS.FADE_UP} delay={0.6}>
              <h3 className="text-2xl font-orbitron text-white mb-2">
                Life, Unplugged
              </h3>
            </SectionTransition>
            
            <SectionTransition effect={EFFECTS.FADE_UP} delay={0.7}>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm away from the screen, I enjoy long-distance running, a good craft beer, and the occasional wild camping trip. Indoors, you'll usually find me watching films, reading about technology, or playing Wordle or chess.
              </p>
            </SectionTransition>
            
            <SectionTransition effect={EFFECTS.ZOOM_IN} delay={0.8} duration={0.7}>
              <div className="border border-neon-blue/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm transition-all duration-500 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 group cursor-default relative overflow-hidden">
                {/* Animated corner accents */}
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-neon-blue/50 transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-neon-blue/50 transform -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-orbitron text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
                    <span className="relative inline-block">
                      Technical Skills
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-500"></span>
                    </span>
                  </h3>
                  
                  <SectionTransition 
                    effect={EFFECTS.FADE_UP} 
                    stagger={true} 
                    staggerChildren={0.05} 
                    delay={0.2} 
                    threshold={0.1}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        "Excel",
                        "Python",
                        "Akeneo PIM",
                        "A.I.",
                        "Power BI",
                        "Ubuntu Desktop",
                        "Linux Server",
                        "Windows",
                        "HTML & CSS",
                        "JavaScript",
                        "REST APIs",
                        "Prompt Engineering",
                        "React",
                        "Flask",
                        "VPS Management",
                        "WordPress"
                      ].map((skill, index) => (
                        <div 
                          key={skill} 
                          className={`relative border border-neon-blue/20 rounded px-4 py-2 text-center bg-cyber-dark transition-all duration-300 hover:bg-cyber-light/10 group/skill overflow-hidden cursor-pointer transform hover:-translate-y-1
                            ${index % 2 === 0 ? 'hover:border-neon-blue hover:text-neon-blue' : 
                              'hover:border-neon-purple hover:text-neon-purple'}`
                          }
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
                  </SectionTransition>
                </div>
              </div>
            </SectionTransition>
            
            <div className="flex flex-col gap-6">
              <SectionTransition effect={EFFECTS.FADE_LEFT} delay={1.0} duration={0.7}>
                <div className="border border-neon-purple/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm transition-all duration-500 hover:border-neon-purple hover:shadow-lg hover:shadow-neon-purple/20 group cursor-default relative overflow-hidden">
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
                    My passion for technology began at age six, exploring the early web on my first Windows 95 computer.
                  </p>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                    At school, I developed a strong interest in ICT and networking, enrolling in additional Cisco classes and experimenting with Ubuntu Linux by age 13. I also explored graphic design through Photoshop, alongside digital audio production with FruityLoops, Cubase, and Ableton Live.
                  </p>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Later, studying Economics at university, I developed expertise in behavioural economics and data analysis. Today, these interests converge in my work, particularly in product information management, where understanding consumer behaviour and optimising user experience are central to effective e-commerce solutions.
                  </p>
                </div>
              </SectionTransition>
              
              <SectionTransition effect={EFFECTS.FADE_RIGHT} delay={1.2} duration={0.7}>
                <div className="border border-neon-blue/30 rounded-lg p-6 bg-cyber-light/30 backdrop-blur-sm transition-all duration-500 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 group cursor-default relative overflow-hidden">
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
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                      I believe that technology should empower people, not complicate their lives.
                    </p>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-4">
                      The principle behind open-source software—that ideas should be shared, improved, and available to all—resonates deeply with me. I value transparency, privacy, and digital autonomy.
                    </p>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      With AI, I see opportunities not in replacement, but in augmentation. The most promising developments enhance how we think, create, and solve problems—without diminishing our humanity.
                    </p>
                  </div>
                </div>
              </SectionTransition>
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