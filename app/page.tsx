import HeroHeader from './home_components/Video_Banner/HeroHeader';
import Navbar from "./NavBar/navbar_main";
import GetInvolvedSection from "./home_components/Get_involved/Involved";
import AboutClubSection from "./home_components/About_sec/AboutClubSection";
import CoreTeamSection from "./home_components/Core_home/core_team_sec";
import ClubAdvisorsSection from "./home_components/Club_advisor";
import CoverFlowDemo from "./home_components/Events_sec/events";
export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-white ">
      <Navbar />
      <HeroHeader />
      <GetInvolvedSection />
      <AboutClubSection/>
      <CoverFlowDemo />
      <CoreTeamSection />
      <ClubAdvisorsSection />
    </div>
  );
}

