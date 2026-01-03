
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import UserMenu from './UserMenu';
import LanguageSelector from './LanguageSelector';
import logo from '@/assets/images/logo.png';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cards?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-neo-black border-b-2 border-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary">
              <img src={logo} alt="Logo" className="w-16 h-16" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-3">
            <Link to="/dashboard" className="text-[#FBF4D8] hover:text-neo-yellow px-4 py-2 text-sm font-semibold border-2 border-transparent hover:border-neo-yellow rounded-lg transition-all">
              {t('header.dashboard')}
            </Link>
            <Link to="/sets" className="text-[#FBF4D8] hover:text-neo-yellow px-4 py-2 text-sm font-semibold border-2 border-transparent hover:border-neo-yellow rounded-lg transition-all">
              {t('header.sets')}
            </Link>
            <Link to="/cards" className="text-[#FBF4D8] hover:text-neo-yellow px-4 py-2 text-sm font-semibold border-2 border-transparent hover:border-neo-yellow rounded-lg transition-all">
              {t('header.cards')}
            </Link>
            <Link to="/dashboard/premium" className="text-neo-yellow hover:text-neo-beige px-4 py-2 text-sm font-bold border-2 border-neo-yellow hover:bg-neo-yellow hover:text-neo-black rounded-lg transition-all">
              ⭐ {t('header.premium')}
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full flex items-center gap-2">
              <Input
                type="search"
                placeholder={t('header.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 h-8 w-8 p-0"
                variant="default"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="font-semibold">
                    {t('header.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="font-semibold">
                    {t('header.signup')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-neo-beige/10 p-2 text-[#FBF4D8]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-white bg-neo-black">
            <div className="px-4 pt-4 pb-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder={t('header.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-12"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 h-8 w-8 p-0"
                    variant="default"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  className="block px-3 py-3 text-base font-semibold text-[#FBF4D8] hover:text-neo-yellow hover:bg-neo-beige/10 rounded-lg transition-colors border-2 border-transparent hover:border-neo-yellow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.dashboard')}
                </Link>
                <Link
                  to="/sets"
                  className="block px-3 py-3 text-base font-semibold text-[#FBF4D8] hover:text-neo-yellow hover:bg-neo-beige/10 rounded-lg transition-colors border-2 border-transparent hover:border-neo-yellow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.sets')}
                </Link>
                <Link
                  to="/cards"
                  className="block px-3 py-3 text-base font-semibold text-[#FBF4D8] hover:text-neo-yellow hover:bg-neo-beige/10 rounded-lg transition-colors border-2 border-transparent hover:border-neo-yellow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.cards')}
                </Link>
                <Link
                  to="/dashboard/premium"
                  className="block px-3 py-3 text-base font-bold text-neo-yellow hover:text-neo-beige hover:bg-neo-yellow hover:text-neo-black rounded-lg transition-colors border-2 border-neo-yellow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ⭐ {t('header.premium')}
                </Link>
              </div>

              {/* Mobile Auth Buttons and Language Selector for Unauthenticated Users */}
              {!isAuthenticated && (
                <div className="border-t-2 border-white pt-4 space-y-3">
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full font-semibold">
                        {t('header.login')}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full font-semibold">
                        {t('header.signup')}
                      </Button>
                    </Link>
                  </div>
                  <div className="flex justify-center">
                    <LanguageSelector />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
