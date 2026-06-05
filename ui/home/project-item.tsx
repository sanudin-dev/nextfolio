import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import {
  SiJavascript,
  SiWebpack,
  SiSass,
  SiBootstrap,
  SiNotion,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPwa,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { Project } from "@/lib/definition";

const tagIconMap: Record<string, IconType> = {
  javascript: SiJavascript,
  webpack: SiWebpack,
  sass: SiSass,
  bootstrap: SiBootstrap,
  notion: SiNotion,
  typescript: SiTypescript,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  pwa: SiPwa,
};

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <article className="md:flex md:justify-center md:item-center md:gap-20 py-10 px-10">
      <div className="text-content mb-10 md:mb-0">
        <h3 className="font-bold text-xl text-primary mb-5">{project.title}</h3>
        <div className="prose prose-neutral max-w-none text-justify [&_p]:mb-3 [&_a]:text-primary [&_a]:underline">
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </div>
        <div className="mt-7.5 flex flex-wrap gap-3">
          {project.tags.map((tag, i) => {
            const Icon = tagIconMap[tag];
            if (!Icon) return null;
            return (
              <div
                key={i}
                className="flex justify-center items-center border border-content/25 p-1 rounded-md text-xs"
                title={tag}
              >
                <Icon size={20} />
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex gap-5">
          <a
            href={project.github}
            target="_blank"
            className="border border-primary text-primary bg-white px-4 py-2 rounded-lg text-sm font-semibold w-[10rem] flex justify-center items-center transition-all hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white active:scale-95"
          >
            Source Code
            <FaGithub className="inline ms-2" size="1.2em" />
          </a>
          <a
            href={project.link}
            target="_blank"
            className="border border-primary text-white bg-primary px-4 py-2 rounded-lg text-sm font-semibold w-[10rem] flex justify-center items-center hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 active:scale-95"
          >
            See Live
            <FaArrowUpRightFromSquare className="inline ms-2" size="1em" />
          </a>
        </div>
      </div>
      <Image
        className="rounded-2xl object-cover max-w-full md:max-w-[50%] shadow-xl shadow-sky-950/25"
        alt={project.title}
        width={1689}
        height={950}
        src={project.image}
      />
    </article>
  );
}
