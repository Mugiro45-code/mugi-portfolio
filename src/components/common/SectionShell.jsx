import { Container } from '@/components/common/Container'
import { cn } from '@/utils/classNames'

export const SectionShell = ({ id, className = '', children }) => (
  <section id={id} className={cn('relative py-24 sm:py-28', className)}>
    <Container>{children}</Container>
  </section>
)