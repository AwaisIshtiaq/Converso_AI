import React from 'react'
import { Button } from "@/components/ui/button";
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { recentSessions } from '@/constants';
const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className='home-section'>
        <CompanionCard 
        id="123"
        name = "Neura the Brainey Explorer"
        topic = "Neural Network of the Barin"
        subject = "Science"
        duration = {45}
        color = "#ffda62"
        />
        <CompanionCard 
        id="456"
        name = "Countsy the Number Wizard"
        topic = "Derivatives & Integrals"
        subject = "Math"
        duration = {30}
        color = "#e5d0ff"
        /><CompanionCard 
        id="789"
        name = "Verba the Vocabulary Builder"
        topic = "Language"
        subject = "English Literature"
        duration = {30}
        color = "#BDE7FF"
        />

      </section>

      <section className='home-section'>
        
        <CTA />

      </section>
      
      <section className='home-sesstion'>
        <CompanionsList
        title = "Recently Compeleted Sessions"
        companions = {recentSessions}
        className="w-2/3 max-lg:w-full"
         /> 

      </section>


    </main>
  )
}

export default Page