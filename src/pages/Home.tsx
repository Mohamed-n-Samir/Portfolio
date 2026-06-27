import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";

function Home() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6">
        <Hero/>
        <About/>
        <Skills/>
      </main>
    </div>
  );
}

export default Home;
