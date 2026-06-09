import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'

const ph = (h: string) => () => <div style={{ minHeight: h }} />

const ValueProps = dynamic(() => import('@/components/ValueProps'), { loading: ph('480px') })
const Services = dynamic(() => import('@/components/Services'), { loading: ph('600px') })
const Process = dynamic(() => import('@/components/Process'), { loading: ph('520px') })
const Portfolio = dynamic(() => import('@/components/Portfolio'), { loading: ph('580px') })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { loading: ph('400px') })
const FAQ = dynamic(() => import('@/components/FAQ'), { loading: ph('520px') })
const Contact = dynamic(() => import('@/components/Contact'), { loading: ph('600px') })
const Footer = dynamic(() => import('@/components/Footer'), { loading: ph('180px') })

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
