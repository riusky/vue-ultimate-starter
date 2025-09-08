import {
  BadgeHelp,
  BellDot,
  Boxes,
  Bug,
  CreditCard,
  LayoutDashboard,
  ListTodo,
  Palette,
  PictureInPicture2,
  Podcast,
  Settings,
  SquareUserRound,
  User,
  Users,
  Wrench,
} from 'lucide-vue-next'

import type { NavGroup } from '@/components/app-sidebar/types'

export function useSidebar() {
  const navData = ref<NavGroup[]>()

  navData.value = [
    {
      title: 'General',
      items: [
        {
          title: 'ECG Demo',
          url: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Table Demo',
          url: '/tasks',
          icon: ListTodo,
        }
      ],
    },
  ]

  const otherPages = ref<NavGroup[]>([
    // {
    //   title: 'Other',
    //   items: [
    //     {
    //       title: 'Plans & Pricing',
    //       icon: CreditCard,
    //       url: '/billing',
    //     },
    //   ],
    // },
  ])

  return {
    navData,
    otherPages,
  }
}
