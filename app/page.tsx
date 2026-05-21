import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
const Ticker = dynamic(() => import('@/components/Ticker'), { loading: () => null })
const Services = dynamic(() => import('@/components/Services'))
const Process = dynamic(() => import('@/components/Process'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
<Ticker />
      <Process />
      <Services />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
