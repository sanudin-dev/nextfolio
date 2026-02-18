import Header from "@/ui/layout/header";
import Hero from "@/ui/home/hero";
import About from "@/ui/home/about";
import LatestPosts from "@/ui/home/latest-posts";
import Projects from "@/ui/home/projects";
import Contact from "@/ui/home/contact";
import Footer from "@/ui/layout/footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <Hero />
        <About />
        <LatestPosts />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
