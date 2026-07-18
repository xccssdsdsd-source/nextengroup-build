import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import InView from '@/components/InView'
import StickyCta from '@/components/StickyCta'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import ReactDOM from 'react-dom'
import Footer from '@/components/Footer'
import { shaderChunks } from '@/lib/shaderPreload'

export default function Home() {
  shaderChunks().forEach((src) => ReactDOM.preload(src, { as: 'script' }))

  return (
    <main aria-label="Treść główna">
      <link rel="preload" as="fetch" href="/shader-hdr/city.hdr" crossOrigin="anonymous" />
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
