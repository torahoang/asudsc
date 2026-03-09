import Navbar from "../NavBar/navbar_main"; 
import OurEventsSection from "../Events_components/event";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <Navbar />
      <OurEventsSection />
    </div>
  );
}