import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'

const AboutMe = dynamic(() => import('@/components/AboutMe'))
const Ticker = dynamic(() => import('@/components/Ticker'), { loading: () => null })
const Services = dynamic(() => import('@/components/Services'))
const Process = dynamic(() => import('@/components/Process'))
const Portfolio = dynamic(() => import('@/components/Portfolio'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))
const StickyCta = dynamic(() => import('@/components/StickyCta'))

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <TrustBar />
      <Ticker />
      <AboutMe />
      <Process />
      <Portfolio />
      <Services />
      <FAQ />
      <Contact />
      <Footer />
      <StickyCta />
    </main>
  )
}
