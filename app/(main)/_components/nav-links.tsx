import {
  IconArticle,
  IconArticleFilled,
  IconBriefcase,
  IconBriefcaseFilled,
  IconFolder,
  IconFolderFilled,
  IconHome,
  IconHomeFilled,
  IconMail,
  IconMailFilled,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-react";

export const navLinks = [
  {
    href: "/",
    label: "Home",
    icons: { active: IconHomeFilled, inactive: IconHome },
  },
  {
    href: "/about",
    label: "About",
    icons: {
      active: IconUserFilled,
      inactive: IconUser,
    },
  },
  {
    href: "/projects",
    label: "Projects",
    icons: {
      active: IconFolderFilled,
      inactive: IconFolder,
    },
  },
  {
    href: "/blog",
    label: "Blog",
    icons: {
      active: IconArticleFilled,
      inactive: IconArticle,
    },
  },
  {
    href: "/services",
    label: "Services",
    icons: {
      active: IconBriefcaseFilled,
      inactive: IconBriefcase,
    },
  },
  {
    href: "/contact",
    label: "Contact",
    icons: {
      active: IconMailFilled,
      inactive: IconMail,
    },
  },
];
