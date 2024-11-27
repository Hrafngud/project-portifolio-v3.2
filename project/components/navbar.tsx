'use client';

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitch } from "./language-switch";
import { useLanguage } from "@/context/language-context";
import { dictionary } from "@/lib/dictionary";
import { Menu, X } from "lucide-react"; // Using lucide-react for icons
import { useState } from "react";
import { AiOutlineHome } from 'react-icons/ai';

export function Navbar() {
  const { language } = useLanguage();
  const t = dictionary[language].navigation;
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false); // Close menu after clicking
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/25 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <AiOutlineHome className="w-5 h-5" />
            Portfolio
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent/50 rounded-lg"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex flex-1 ml-8">
            <ul className="flex gap-8">
              <li>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {t.projects}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('articles')}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {t.articles}
                </button>
              </li>
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <nav className="pt-4 pb-3">
              <ul className="flex flex-col gap-4">
                <li>
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="text-sm font-medium hover:text-primary transition-colors w-full text-left"
                  >
                    {t.projects}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('articles')}
                    className="text-sm font-medium hover:text-primary transition-colors w-full text-left"
                  >
                    {t.articles}
                  </button>
                </li>
              </ul>
              <div className="flex items-center gap-4 pt-4 border-t mt-4">
                <ThemeToggle />
                <LanguageSwitch />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
