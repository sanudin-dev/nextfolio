import { getSkillset } from "@/lib/data";
import Image from "next/image";

export default function About() {
  const skillset = getSkillset();

  return (
    <section
      id="about"
      className="px-4 py-20 mt-10 bg-sky-950 text-gray-300 rounded-xl w-full"
    >
      <div className="container mx-auto text-center">
        <div className="border border-white/15 w-14 h-14 rounded-xl text-2xl flex justify-center items-center mx-auto mb-3">
          🧑‍🔧
        </div>
        <h2 className="font-bold text-2xl mb-4 text-white">About me</h2>
        <p>
          A software engineer and developer based in Indonesia, passionate about
          helping entrepreneurs create great products.
        </p>
        <p>
          My experience and skillset include both Front-end and Back-end
          Development.
        </p>
        <div className="flex justify-center gap-8 flex-wrap mt-8">
          {skillset.map((skill) => (
            <Image
              key={skill.id}
              alt={skill.name}
              width={48}
              height={48}
              src={skill.image}
            />
          ))}
        </div>
        {/* <ul>
          <li>Building scalable and maintainable software systems</li>
          <li>Designing and implementing data-driven solutions</li>
          <li>
            Collaborating with cross-functional teams to deliver high-quality
            products
          </li>
        </ul> */}
      </div>
    </section>
  );
}
