import React from 'react';
import { Hero } from '../components/Hero';
import { TrustedBy } from '../components/TrustedBy';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Sectors } from '../components/Sectors';
import { Process } from '../components/Process';
import { ProductGallery } from '../components/ProductGallery';
import { Faq } from '../components/Faq';
import { ContactForm } from '../components/ContactForm';

export const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <TrustedBy />
            <WhyChooseUs />
            <Sectors />
            <Process />
            <ProductGallery />
            <Faq />
            <ContactForm />
        </>
    );
};