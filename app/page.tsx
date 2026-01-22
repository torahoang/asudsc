import Image from "next/image";
import HeroHeader from './components/HeroHeader';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <HeroHeader />
      <main className="w-full max-w-3xl mx-auto py-32 px-16">
      </main>
    </div>
  );
}
