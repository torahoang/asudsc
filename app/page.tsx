import Image from "next/image";
import HeroHeader from './components/Heroheader_GRP/HeroHeader';
import Button from './components/button';
import Navbar from "./components/navbar/navbar";
export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <Navbar />
      <HeroHeader />
      <main className="w-full max-w-3xl mx-auto py-32 px-16">
      </main>
      <Button />
    </div>
  );
}

