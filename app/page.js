import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Showroom from '@/components/Showroom';
import Brands from '@/components/Brands';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import About from '@/components/About';
import VideoBand from '@/components/VideoBand';
import PartsLab from '@/components/PartsLab';
import Process from '@/components/Process';
import Packages from '@/components/Packages';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Brands />
      <About />
      <Services />
      <VideoBand />
      <Showroom />
      <PartsLab />
      <Process />
      <Packages />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
