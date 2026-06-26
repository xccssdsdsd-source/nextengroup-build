import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import InView from '@/components/InView'
import dynamic from 'next/dynamic'

const StatsBar = dynamic(() => import('@/components/StatsBar'))
const SocialProofToast = dynamic(() => import('@/components/SocialProofToast'))
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
      <InView minHeight="100px"><StatsBar /></InView>
      <InView minHeight="480px"><ValueProps /></InView>
      <InView minHeight="600px"><Services /></InView>
      <InView minHeight="520px"><Process /></InView>
      <InView minHeight="580px"><Portfolio /></InView>
      <InView minHeight="400px"><Testimonials /></InView>
      <InView minHeight="520px"><FAQ /></InView>
      <InView minHeight="600px"><Contact /></InView>
      <InView minHeight="180px"><Footer /></InView>
      <SocialProofToast />
    </main>
  )
}
