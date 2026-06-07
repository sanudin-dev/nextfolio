import { LuSend } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa6";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-4 py-20 mb-10 bg-sky-950 text-gray-300 rounded-xl w-full"
    >
      <div className="container mx-auto text-center">
        <div className="border border-white w-14 h-14 rounded-xl text-4xl flex justify-center items-center mx-auto mb-3 bg-white/50">
          💌
        </div>
        <h2 className="font-bold text-2xl mb-4 text-white">Contact</h2>
        <p>
          I&apos;m currently focused on my full-time role, but I&apos;m always
          open to thoughtful conversations
        </p>
        <p>
          — about engineering, collaboration, or just connecting with people who
          build things.
        </p>
        <p>Feel free to reach out if you&apos;d like to connect.</p>
        <div className="flex justify-center items-center gap-5 mt-6">
          <a
            href="mailto:hello.sanudin@gmail.com"
            className="bg-primary text-white text-sm font-semibold py-2 px-5 block rounded-lg max-w-[20rem] hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 active:scale-95"
          >
            Send an email <LuSend className="inline ms-2" size="1.2em" />
          </a>
          <a
            href="https://www.linkedin.com/in/sanudin/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white text-sm font-semibold py-2 px-5 block rounded-lg max-w-[20rem] hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 active:scale-95"
          >
            Find me on LinkedIn{" "}
            <FaLinkedin className="inline ms-2" size="1.2em" />
          </a>
        </div>
      </div>
    </section>
  );
}
