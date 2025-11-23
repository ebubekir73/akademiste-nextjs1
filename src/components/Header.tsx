'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    const dropdown = document.querySelector('.nav-dropdown');
    if (dropdown && !dropdown.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener for clicking outside
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleClickOutside);
  }

  // Handle packages link click
  const handlePackagesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're on the home page, scroll to pricing section
    if (pathname === '/') {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home page with pricing section
      router.push('/#pricing');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/" className="logo-link">
            <Image 
              src="/images/WhatsApp_Image_2025-10-18_at_15.52.54-removebg-preview.png" 
              alt="Boğaziçi Akademi" 
              className="logo-image"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <nav className="nav">
          <div className="nav-dropdown">
            <button 
              className="nav-link dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Keşfet
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link 
                  href="/kocluk" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Koçluk
                </Link>
                <Link 
                  href="/ozel-ders" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Özel Ders
                </Link>
                <Link 
                  href="/yabanci-dil" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Yabancı Dil Özel Ders
                </Link>
              </div>
            )}
          </div>
          <Link href="/ogretmenlerimiz" className="nav-link">Öğretmenlerimiz</Link>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSfUERTmGM6yTgxzo8y00V65tpN1x-vWW02Hi53IwGFRO_pOhQ/viewform" 
            target="_blank" 
            className="nav-link"
          >
            Ders&nbsp;Ver
          </a>
          <a 
            href="#pricing" 
            className="nav-link"
            onClick={handlePackagesClick}
          >
            Paketler
          </a>
        </nav>
        <div className="header-actions">
        </div>
      </div>
    </header>
  );
}
