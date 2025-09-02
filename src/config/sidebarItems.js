import { AiOutlineHome } from 'react-icons/ai';
import { BsCalendarEvent } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { MdOutlineAnalytics, MdAnalytics } from 'react-icons/md';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { FaUserPlus } from 'react-icons/fa';
import { FiTrendingUp, FiMessageSquare, FiPlusCircle } from 'react-icons/fi';



export const sidebarItems = [
  {
    label: "Dashboard",
    icon: AiOutlineHome,
    path: "/dashboard",
  },



  // Newly added items
  {
    label: "Active Demands",
    icon: FiTrendingUp,
    path: "/demands",
  },
  {
    label: "Statuses",
    icon: FiMessageSquare,
    path: "/my-quotes",
  },
  {
    label: "Post Availability",
    icon: FiPlusCircle,
    path: "/availability",
  },

  {
    label: "Shares to Buy",
    icon: FiTrendingUp,
    path: "/shares-to-buy",
  },

  {
    label: "Notifications",
    icon: IoIosNotificationsOutline,
    path: "/notifications",
  },

  {
    label: "Nested Menu",
    icon: BsCalendarEvent,
    children: [
      {
        label: "menu1",
        icon: MdOutlineAnalytics,
        path: "/menu1",
      },
      {
        label: "menu2",
        icon: FaUserPlus,
        path: "/nested/menu2",
      },
    ],
  },

  {
    label: "Profile",
    icon: CgProfile,
    path: "/profile",
  },
];
  