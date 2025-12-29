
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import MouseGlow from './components/MouseGlow';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
        <ThreeBackground />
        <MouseGlow />
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}

export default App;