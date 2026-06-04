'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoAlert from '@/components/PromoAlert';
import LoginForm from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-primary">
      <PromoAlert />
      <Header />

      <main className="flex-1 flex flex-col justify-center">
        <section className="py-12 md:py-20 lg:py-24">
          <div className="premium-container">
            <LoginForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
