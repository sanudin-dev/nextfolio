export default function Contact() {
  return (
    <section
      id="contact"
      className="px-4 py-20 mb-10 bg-sky-950 text-gray-300 rounded-xl w-full"
    >
      <div className="container mx-auto text-center">
        <div className="border border-white/15 w-14 h-14 rounded-xl text-2xl flex justify-center items-center mx-auto mb-3">
          📧
        </div>
        <h2 className="font-bold text-2xl mb-4 text-white">
          Let&apos;s talk about your project
        </h2>
        <p>Got a project in mind?</p>
        <p>Thinking about working together?</p>
        <p>Or just want to make a new friend?</p>
        <a
          href="mailto:mailto.sanudin@gmail.com"
          className="cursor-pointer bg-primary text-white font-semibold py-3 px-10 block rounded-xl max-w-[20rem] mx-auto mt-10 hover:bg-primary/90 active:scale-95"
        >
          Let&apos;s talk
        </a>
      </div>
    </section>
  );
}
