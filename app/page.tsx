import Image from "next/image";
import HeroHeader from './components/Video_Banner/HeroHeader';
import Navbar from "./components/NavBar/navbar_main";
import GetInvolvedSection from "./components/Get_involved/Involved";
import AboutClubSection from "./components/About_sec/AboutClubSection";
export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <Navbar />
      <HeroHeader />
      <GetInvolvedSection />
      <AboutClubSection/>
      <main className="w-full max-w-3xl mx-auto py-32 px-16">
      
      </main>
    </div>
  );
}

