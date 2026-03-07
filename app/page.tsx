import HeroHeader from './components/Video_Banner/HeroHeader';
import Navbar from "./components/NavBar/navbar_main";
import GetInvolvedSection from "./components/Get_involved/Involved";
import AboutClubSection from "./components/About_sec/AboutClubSection";
import CoreTeamSection from "./components/Core_home/core_team_sec";
import ClubAdvisorsSection from "./components/Club_advisor";
export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <Navbar />
      <HeroHeader />
      <GetInvolvedSection />
      <AboutClubSection/>
      <CoreTeamSection />
      <ClubAdvisorsSection />
    </div>
  );
}

