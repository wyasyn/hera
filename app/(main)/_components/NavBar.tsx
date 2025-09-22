// components/NavBar.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconChevronDown,
  IconChevronUp,
  IconSun,
  IconMoon,
  IconBrandX,
} from "@tabler/icons-react";

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

const navLinks = [
  {
    href: "/",
    label: "Home",
    icons: { active: IconHomeFilled, inactive: IconHome },
  },
  {
    href: "/about",
    label: "About",
    icons: { active: IconUserFilled, inactive: IconUser },
  },
  {
    href: "/projects",
    label: "Projects",
    icons: { active: IconFolderFilled, inactive: IconFolder },
  },
  {
    href: "/blog",
    label: "Blog",
    icons: { active: IconArticleFilled, inactive: IconArticle },
  },
  {
    href: "/services",
    label: "Services",
    icons: { active: IconBriefcaseFilled, inactive: IconBriefcase },
  },
  {
    href: "/contact",
    label: "Contact",
    icons: { active: IconMailFilled, inactive: IconMail },
  },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/yasin-walum",
    icon: IconBrandLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://x.com/wyasyn",
    icon: IconBrandX,
    label: "Twitter",
  },
  {
    href: "https://www.instagram.com/yasynwlm",
    icon: IconBrandInstagram,
    label: "Instagram",
  },
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(
    navLinks.find((l) => l.href === pathname) || navLinks[0]
  );

  const ActiveIcon = selected.icons.active;

  // Scroll visibility logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close dropdown on route change
  useEffect(() => {
    setOpen(false);
    setSelected(navLinks.find((l) => l.href === pathname) || navLinks[0]);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -40,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-6 px-6 py-3 rounded-full",
        "bg-card/80 backdrop-blur-xl",
        "border border-border/50",
        "shadow-lg",
        "transition-all duration-300"
      )}
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Left dropdown */}
      <div className="relative" ref={dropdownRef}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen((p) => !p)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full",
            "bg-muted/50 hover:bg-muted/80",
            "text-foreground",
            "transition-all duration-200",
            "border border-border/30",
            "shadow-sm shadow-black/5"
          )}
          aria-label={`Navigate to ${selected.label}`}
          aria-expanded={open}
          aria-haspopup="true"
        >
          <ActiveIcon size={18} className="text-foreground" />
          <span className="font-medium text-sm">{selected.label}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {open ? (
              <IconChevronUp size={16} className="text-muted-foreground" />
            ) : (
              <IconChevronDown size={16} className="text-muted-foreground" />
            )}
          </motion.span>
        </motion.button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "absolute left-0 mt-3 w-48",
                "bg-popover/95 backdrop-blur-xl",
                "border border-border/50",
                "rounded-xl shadow-lg",
                "overflow-hidden",
                "ring-1 ring-black/5"
              )}
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              role="menu"
            >
              {navLinks.map((link) => {
                const Icon =
                  pathname === link.href
                    ? link.icons.active
                    : link.icons.inactive;
                const isActive = pathname === link.href;

                return (
                  <motion.button
                    key={link.href}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      setSelected(link);
                      router.push(link.href);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 w-full text-left",
                      "text-sm font-medium",
                      "transition-colors duration-150",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                    role="menuitem"
                    aria-label={`Navigate to ${link.label}`}
                  >
                    <Icon
                      size={18}
                      className={cn(
                        isActive
                          ? "text-accent-foreground"
                          : "text-muted-foreground"
                      )}
                    />
                    {link.label}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-border" />

      {/* Right socials + theme toggle */}
      <div className="flex items-center gap-2">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <motion.a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "p-2.5 rounded-xl",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-muted/60",
              "transition-all duration-200",
              "border border-transparent hover:border-border/30"
            )}
            aria-label={`Visit ${label}`}
          >
            <Icon size={20} />
          </motion.a>
        ))}

        {/* Separator before theme toggle */}
        <div className="w-px h-6 bg-border/60 mx-1" />

        {/* Theme toggle */}
        <motion.button
          whileHover={{ rotate: 15, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={cn(
            "p-2.5 rounded-xl",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-muted/60",
            "transition-all duration-200",
            "border border-transparent hover:border-border/30"
          )}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IconSun size={20} className="text-amber-500" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IconMoon
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.nav>
  );
}
