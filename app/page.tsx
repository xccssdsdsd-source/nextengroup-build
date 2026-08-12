import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import InView from '@/components/InView'
import StickyCta from '@/components/StickyCta'
import Problem from '@/components/sections/Problem'
import Solution from '@/components/sections/Solution'
import Proces from '@/components/sections/Proces'
import Przewagi from '@/components/sections/Przewagi'
import Realizacje from '@/components/sections/Realizacje'
import Opinie from '@/components/sections/Opinie'
import Pakiety from '@/components/sections/Pakiety'
import Obiekcje from '@/components/sections/Obiekcje'
import Kontakt from '@/components/sections/Kontakt'
import Stopka from '@/components/sections/Stopka'

export default function Home() {
  return (
    <main aria-label="Treść główna">
      <Nav />
      <Hero />
      <TrustStrip />
      <InView minHeight="700px"><Problem /></InView>
      <InView minHeight="720px"><Solution /></InView>
      <InView minHeight="760px"><Proces /></InView>
      <InView minHeight="760px"><Przewagi /></InView>
      <InView minHeight="900px"><Realizacje /></InView>
      <InView minHeight="520px"><Opinie /></InView>
      <InView minHeight="820px"><Pakiety /></InView>
      <InView minHeight="700px"><Obiekcje /></InView>
      <InView minHeight="820px"><Kontakt /></InView>
      <InView minHeight="320px"><Stopka /></InView>
      <StickyCta />
    </main>
  )
}
