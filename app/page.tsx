import dynamic from 'next/dynamic'
const Nav = dynamic(() => import('@/components/Nav'))
const Hero = dynamic(() => import('@/components/Hero'))
const ValueProps = dynamic(() => import('@/components/ValueProps'))
const Services = dynamic(() => import('@/components/Services'))
const Process = dynamic(() => import('@/components/Process'))
const Portfolio = dynamic(() => import('@/components/Portfolio'))
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
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
