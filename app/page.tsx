import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import InView from '@/components/InView'
import StickyCta from '@/components/StickyCta'
import dynamic from 'next/dynamic'

const Services = dynamic(() => import('@/components/Services'))
const Process = dynamic(() => import('@/components/Process'))
const Portfolio = dynamic(() => import('@/components/Portfolio'))
const Testimonials = dynamic(() => import('@/components/Testimonials'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function Home() {
  return (
    <main aria-label="Treść główna">
      <Nav />
      <Hero />
      <SocialProof />
      <InView minHeight="600px"><Services /></InView>
      <InView minHeight="520px"><Process /></InView>
      <InView minHeight="580px"><Portfolio /></InView>
      <InView minHeight="620px"><Testimonials /></InView>
      <InView minHeight="520px"><FAQ /></InView>
      <InView minHeight="960px"><Contact /></InView>
      <InView minHeight="180px"><Footer /></InView>
      <StickyCta />
    </main>
  )
}
