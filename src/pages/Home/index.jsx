import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { AchievementsSection } from '@/components/sections/AchievementsSection'
import { VolunteerSection } from '@/components/sections/VolunteerSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ScrollSection } from '@/components/animations/ScrollSection'

export const HomePage = () => (
  <>
    <HeroSection />
    <ScrollSection intensity={1.15} drift="up">
      <AboutSection />
    </ScrollSection>
    <ScrollSection intensity={1.2} drift="right">
      <SkillsSection />
    </ScrollSection>
    <ScrollSection intensity={1.25} drift="up">
      <ExperienceSection />
    </ScrollSection>
    <ScrollSection intensity={1.18} drift="left">
      <ProjectsSection />
    </ScrollSection>
    <ScrollSection intensity={1.08} drift="up">
      <AchievementsSection />
    </ScrollSection>
    <ScrollSection intensity={1.1} drift="right">
      <VolunteerSection />
    </ScrollSection>
    <ScrollSection intensity={1.16} drift="up">
      <ContactSection />
    </ScrollSection>
  </>
)