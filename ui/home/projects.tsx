import ProjectItem from "./project-item";
import { getProjects } from "@/lib/projects";

export default function projects() {
  const projects = getProjects();

  return (
    <section id="projects" className="w-full py-20 my-10">
      <div className="container mx-auto text-center">
        <div className="border border-white w-14 h-14 rounded-xl text-4xl flex justify-center items-center mx-auto bg-white/50 mb-3">
          🛠️
        </div>
        <h2 className="font-bold text-2xl mb-2 text-title">Projects</h2>
        <p className="text-content">
          A mix of work I&apos;ve built to learn, experiment, and solve real
          problems.
        </p>
      </div>

      <section id="project-list" className="mt-10">
        <div className="container mx-auto">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </section>
    </section>
  );
}
