
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-primary/10 to-surface-primary overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            {t('home.heroTitle')}
            <span className="text-primary block">{t('home.heroSubtitle')}</span>
          </h1>
          <p className="text-xl text-text-secondary mb-10 max-w-3xl mx-auto font-medium">
            {t('home.heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto font-bold">
                  {t('home.goToDashboard')}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto font-bold">
                    {t('home.startCollecting')}
                  </Button>
                </Link>
                <Link to="/cards">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                    {t('home.browseCards')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-surface-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-text-primary mb-16">
            {t('home.featuresTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-surface-secondary hover:shadow-neumorphic transition-all duration-300 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-text-primary">
                  <div className="w-12 h-12 bg-accent-glass-010 rounded-xl flex items-center justify-center text-2xl">
                    📊
                  </div>
                  {t('home.trackCollectionTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-text-secondary">
                  {t('home.trackCollectionDesc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-surface-secondary hover:shadow-neumorphic transition-all duration-300 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-text-primary">
                  <div className="w-12 h-12 bg-accent-glass-010 rounded-xl flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  {t('home.wishlistTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-text-secondary">
                  {t('home.wishlistDesc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-surface-secondary hover:shadow-neumorphic transition-all duration-300 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-text-primary">
                  <div className="w-12 h-12 bg-accent-glass-010 rounded-xl flex items-center justify-center text-2xl">
                    🔍
                  </div>
                  {t('home.databaseTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-text-secondary">
                  {t('home.databaseDesc')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl mb-10 text-white/90 font-medium">
            {t('home.ctaDescription')}
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" variant="secondary" className="font-bold">
                {t('home.createFreeAccount')}
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
