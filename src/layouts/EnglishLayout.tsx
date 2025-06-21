import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import LeadCapture from '../components/LeadCapture';
import Footer from '../components/Footer';

const EnglishLayout: React.FC = () => {
  useEffect(() => {
    // Update meta tags for English version
    document.title = "SilverCare by GOFA | AI-Powered Fall Prevention for Seniors";
    document.documentElement.lang = 'en';
    
    // Update meta descriptions
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join our founding community! Be one of the first 100 members to shape the future of fall prevention. AI-powered assessment takes just 10 minutes - protect your loved ones today.');
    }

    // Update keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'fall prevention, senior care, elderly care, AI healthcare, aging in place, senior safety, fall risk assessment, senior health technology, caregiver support');
    }

    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'SilverCare by GOFA | AI-Powered Fall Prevention for Seniors');
    }
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Join our founding community! Be one of the first 100 members to shape the future of fall prevention. AI-powered assessment takes just 10 minutes - protect your loved ones today.');
    }
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://silvercare.gofa.co/website');
    }

    // Update Twitter Cards
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'SilverCare by GOFA | AI-Powered Fall Prevention for Seniors');
    }
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Join our founding community! Be one of the first 100 members to shape the future of fall prevention. AI-powered assessment takes just 10 minutes - protect your loved ones today.');
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://silvercare.gofa.co/website');
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section><Hero /></section>
        <section><HowItWorks /></section>
        <section><Benefits /></section>
        <section><Testimonials /></section>
        <section><FAQ /></section>
        <section><LeadCapture /></section>
      </main>
      <Footer />
    </div>
  );
};

export default EnglishLayout;