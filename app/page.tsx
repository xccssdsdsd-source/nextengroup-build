import dynamic from 'next/dynamic'
const Nav = dynamic(() => import('@/components/Nav'))
const Hero = dynamic(() => import('@/components/Hero'))
const ValueProps = dynamic(() => import('@/components/ValueProps'))
const Services = dynamic(() => import('@/components/Services'))
const Process = dynamic(() => import('@/components/Process'))
const FreeConsultation = dynamic(() => import('@/components/FreeConsultation'))
const Portfolio = dynamic(() => import('@/components/Portfolio'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const Contact = dynamic(() => import('@/components/Contact'))
const InquiryForm = dynamic(() => import('@/components/InquiryForm'))
const Footer = dynamic(() => import('@/components/Footer'))
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ValueProps />
      <Services />
      <Process />
      <FreeConsultation />
      <Portfolio />
      <FAQ />
      <Contact />
      <InquiryForm />
      <Footer />
    </main>
  )
}
