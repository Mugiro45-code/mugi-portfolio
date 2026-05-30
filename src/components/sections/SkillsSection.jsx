import { SectionShell } from '@/components/common/SectionShell'
import { SectionHeader } from '@/components/common/SectionHeader'
import DemoOrbiting from '@/components/ui/demo-orbiting'

export const SkillsSection = () => {
  return (
    <SectionShell id="skills">
      <div className="space-y-10">
        <SectionHeader
          eyebrow="Skills"
          title="Technical Skills"
          description="Core technologies I use to build reliable, production - grade applications."
        />

        <div className="flex items-center justify-center">
          <DemoOrbiting />
        </div>
      </div>
    </SectionShell>
  )
}