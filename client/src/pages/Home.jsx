import React from 'react'
import Hero from '../components/Hero'
import LatestColl from '../components/LatestColl'
import Ourpolicy from '../components/Ourpolicy'
import Newsletterbox from '../components/Newsletterbox'

function Home() {
  return (
    <div>
      <Hero/>
      <LatestColl/>
      <Ourpolicy/>
      <Newsletterbox/>
    </div>
  )
}

export default Home
