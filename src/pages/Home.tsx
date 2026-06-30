import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6">
        <Hero/>
        <About/>
        <Skills/>
        <Experience/>
        <Projects/>
        <Contact/>
        <Footer/>
      </main>
    </div>
  );
}

export default Home;
