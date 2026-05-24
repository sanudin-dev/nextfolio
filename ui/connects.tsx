import { FaLinkedin, FaGithub, FaDev } from "react-icons/fa6";

export default function Connects() {
  return (
    <nav className="space-x-4 text-sm flex">
      <a
        className="hover:text-title transition-all transition-discrete bg-transparent flex items-center text-content"
        href="https://www.linkedin.com/in/sanudin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin size="2em" />
        <span className="sr-only">LinkedIn</span>
      </a>
      <a
        className="hover:text-title transition-all transition-discrete bg-transparent flex items-center text-content"
        href="https://github.com/sanudin-dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size="2em" />
        <span className="sr-only">Github</span>
      </a>
      <a
        className="hover:text-title transition-all transition-discrete bg-transparent flex items-center text-content"
        href="https://dev.to/sanudin-dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaDev size="2em" />
        <span className="sr-only">Dev.to</span>
      </a>
    </nav>
  );
}
