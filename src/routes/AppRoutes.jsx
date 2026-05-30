import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { HomePage } from '@/pages/Home'
import { AboutPage } from '@/pages/About'
import { ProjectsPage } from '@/pages/Projects'
import { ExperiencePage } from '@/pages/Experience'
import { ContactPage } from '@/pages/Contact'
import { ScrollDemoPage } from '@/pages/ScrollDemo'

export const AppRoutes = () => (
  <Routes>
    <Route element={<SiteLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="experience" element={<ExperiencePage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="scroll-demo" element={<ScrollDemoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
)