import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

function Home() {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6">
        <Hero/>
      </main>
    </div>
  );
}

export default Home;
