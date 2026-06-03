import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'

const ValueProps = dynamic(() => import('@/components/ValueProps'))
const Services = dynamic(() => import('@/components/Services'))
const Process = dynamic(() => import('@/components/Process'))
const Portfolio = dynamic(() => import('@/components/Portfolio'))
const Testimonials = dynamic(() => import('@/components/Testimonials'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ValueProps />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
