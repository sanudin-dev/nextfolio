import { getSkillset } from '@/lib/data'

export default function About() {
  const skillset = getSkillset()

  return (
    <section id="about" className="px-4 py-20 mt-10 bg-sky-950 text-gray-300 rounded-xl w-full">
      <div className="container mx-auto text-center">
        <div className="border border-white w-14 h-14 rounded-xl text-4xl flex justify-center items-center mx-auto bg-white/50 mb-3">
          👨🏼‍💻
        </div>
        <h2 className="font-bold text-2xl mb-4 text-white">About</h2>
        <p>
          I&apos;m a software engineer based in Indonesia, working across the full stack but most at
          home on the backend — designing APIs, structuring data flows, and solving problems where
          the requirements are concrete.
        </p>
        <p>
          I&apos;ve spent the last several years at a Singapore-based fintech platform, working on
          complex API integrations, legacy codebases, and system architecture.
        </p>
        <p>
          Outside of work, I&apos;m learning Python, exploring distributed systems, and writing
          about what I learn.
        </p>
        <h3 className="mt-8 text-primary">Experience and skillset</h3>
        <div className="flex justify-center gap-8 flex-wrap mt-4">
          {skillset.map((skill) => (
            <skill.icon
              key={skill.id}
              title={skill.name}
              size={skill.size || 32}
              className="hover:text-primary"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
