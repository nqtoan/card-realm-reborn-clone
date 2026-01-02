
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
    <header className="bg-white shadow-md border-b-2 border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary">
              <img src={logo} alt="Logo" className="w-16 h-16" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-semibold transition-colors">
              {t('header.dashboard')}
            </Link>
            <Link to="/sets" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-semibold transition-colors">
              {t('header.sets')}
            </Link>
            <Link to="/cards" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-semibold transition-colors">
              {t('header.cards')}
            </Link>
            <Link to="/dashboard/premium" className="text-yellow-600 hover:text-yellow-700 px-3 py-2 text-sm font-bold transition-colors">
              {t('header.premium')}
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
                className="pr-12 border-2 border-gray-300 focus:border-primary"
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
                  <Button variant="outline" size="sm" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                    {t('header.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                    {t('header.signup')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-gray-100 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-gray-200 bg-white">
            <div className="px-4 pt-4 pb-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder={t('header.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-12 border-2 border-gray-300 focus:border-primary"
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
                  className="block px-3 py-3 text-base font-semibold text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.dashboard')}
                </Link>
                <Link
                  to="/sets"
                  className="block px-3 py-3 text-base font-semibold text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.sets')}
                </Link>
                <Link
                  to="/cards"
                  className="block px-3 py-3 text-base font-semibold text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.cards')}
                </Link>
                <Link
                  to="/dashboard/premium"
                  className="block px-3 py-3 text-base font-bold text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.premium')}
                </Link>
              </div>

              {/* Mobile Auth Buttons and Language Selector for Unauthenticated Users */}
              {!isAuthenticated && (
                <div className="border-t-2 border-gray-200 pt-4 space-y-3">
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                        {t('header.login')}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
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
