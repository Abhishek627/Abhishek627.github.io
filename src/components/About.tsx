
const About = () => {
  const skills = [
    { name: "Python", level: 90 },
    { name: "Golang", level: 85 },
    { name: "Java", level: 80 },
    { name: "Kubernetes and Docker", level: 75 },
    { name: "Ansible", level: 70 },
    { name: "Terraform", level: 50 }
  ];

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Cisco",
      period: "Feb 2020- Present",
      description: "Leading backend development initiatives and mentoring junior developers."
    },
    {
      title: "Software Engineer 2",
      company: "Juniper Networks",
      period: "Jul 2016 - Jan 2020",
      description: "Developed and maintained infrastructure for ATOM, a new platform unifying all Juniper server software."
    },
    {
      title: "Software Intern",
      company: "Grey Orange Pvt Ltd.",
      period: "Jul 2015- Dec 2015",
      description: "Worked on improving camera module performance and linear sorted emulator."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer with 9+ years of experience creating scalable solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
              <p className="text-gray-400 leading-relaxed mb-4"> I'm an experienced Software Engineer with close to 9 years of hands-on experience in building scalable, distributed backend systems. My journey in software development has evolved from a passion for solving complex problems to a deep specialization in debugging software bugs and optimizing systems for peak performance. </p> 
              <p className="text-gray-400 leading-relaxed"> Skilled in Python, Golang, C++, NoSQL databases, and a wide range of distributed architecture components, I’ve worked with modern microservice architectures and cloud technologies to deliver robust solutions. I hold an MSc (Tech) in Information Systems (IS) from Birla Institute of Technology and Science (BITS) Pilani, which laid the foundation for my strong technical expertise. When I'm not diving deep into code, you can find me exploring new technologies, contributing to open-source projects, or sharing insights with the developer community. </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Experience</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-6 relative">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-2 top-2"></div>
                    <h4 className="text-lg font-semibold text-white">{exp.title}</h4>
                    <p className="text-blue-400 text-sm">{exp.company} • {exp.period}</p>
                    <p className="text-gray-400 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Skills & Technologies</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-3">Quick Facts</h4>
              <ul className="space-y-2 text-gray-400">
                <li>🎓 Computer Science Graduate</li>
                <li>💼 9+ Years of Experience</li>
                <li>🌍 Based in India</li>
                <li>☕ Coffee Enthusiast</li>
                <li>🎮 Gaming & Tech Explorer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
