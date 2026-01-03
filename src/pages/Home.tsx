
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
    <div className="min-h-screen bg-neo-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-magox font-bold text-[#FBF4D8] mb-6">
            {t('home.heroTitle')}
            <span className="text-neo-yellow block">{t('home.heroSubtitle')}</span>
          </h1>
          <p className="text-xl text-[rgba(251,244,216,0.75)] mb-10 max-w-3xl mx-auto font-sf-pro font-medium">
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
                  <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold">
                    {t('home.browseCards')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-magox font-bold text-center text-[#FBF4D8] mb-16">
            {t('home.featuresTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-neo-black font-magox">
                  <div className="w-12 h-12 bg-neo-yellow border-2 border-white rounded-lg flex items-center justify-center text-2xl">
                    📊
                  </div>
                  {t('home.trackCollectionTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-neo-black font-sf-pro">
                  {t('home.trackCollectionDesc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-neo-black font-magox">
                  <div className="w-12 h-12 bg-neo-purple border-2 border-white rounded-lg flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  {t('home.wishlistTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-neo-black font-sf-pro">
                  {t('home.wishlistDesc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-neo-black font-magox">
                  <div className="w-12 h-12 bg-neo-green border-2 border-white rounded-lg flex items-center justify-center text-2xl">
                    🔍
                  </div>
                  {t('home.databaseTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-neo-black font-sf-pro">
                  {t('home.databaseDesc')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-neo-beige border-2 border-white rounded-lg shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] p-12">
            <h2 className="text-4xl font-magox font-bold mb-6 text-neo-black">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-xl mb-10 text-[rgba(0,0,0,0.65)] font-sf-pro font-medium">
              {t('home.ctaDescription')}
            </p>
            {!isAuthenticated && (
              <Link to="/register">
                <Button size="lg" className="font-bold">
                  {t('home.createFreeAccount')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
