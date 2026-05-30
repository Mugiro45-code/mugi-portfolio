import { ArrowRight } from 'lucide-react'
import { SectionShell } from '@/components/common/SectionShell'
import { HeroSection as HeroSection2 } from '@/components/ui/hero-section-2'
import heroPic from '@/assets/images/Profile-Pic-hero.jpg'
import resumePdf from '@/assets/Resume/Resume - MUGILAN S.pdf'

export const HeroSection = () => (
  <SectionShell id="hero" className="!py-0">
    <HeroSection2
      logo={{
        url: heroPic,
        alt: 'Mugilan S profile picture',
        text: 'MUGILAN S',
      }}
      slogan="SOFTWARE ENGINEER"
      title={
        <>
          MUGILAN S
        </>
      }
      subtitle="Experienced software developer specializing in Python, Laravel, React, APIs, and AI-assisted features. I build production-grade web applications, enterprise workflows, and modern interfaces with deliberate motion."
      callToAction={{
        text: 'VIEW PROJECTS',
        href: '#projects',
      }}
      secondaryAction={{
        text: 'DOWNLOAD RESUME',
        href: resumePdf,
      }}
      highlights={['Python', 'Laravel', 'React', 'FastAPI', 'PostgreSQL']}
      backgroundImage={heroPic}
      contactInfo={{
        website: 'github.com/Mugiro45-code',
        phone: '+91 8903215065',
        address: 'Karaikudi',
      }}
    />
    <a
      href="#about"
      className="mt-10 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
    >
      Scroll to explore <ArrowRight size={16} className="rotate-90" />
    </a>
  </SectionShell>
)

export default HeroSection
