import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from 'lucide-vue-next'

import { useSidebar } from '@/composables/use-sidebar'

import type { SidebarData, Team, User } from '../types'

const user: User = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
}

const teams: Team[] = [
  {
    name: 'ECG_LEAD_II',
    logo: AudioWaveform,
    plan: 'ECG waveform samples',
  },
  {
    name: 'ECG_LEAD_III',
    logo: AudioWaveform,
    plan: 'ECG waveform samples',
  },
]

const { navData } = useSidebar()

export const sidebarData: SidebarData = {
  user,
  teams,
  navMain: navData.value!,
}
