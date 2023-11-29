import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import lottieHome from '../images/lottie/lottie-home.json'
function Home() {
  return (
    <Player src={lottieHome} className="player" loop autoplay style={{ width: '100%', backgroundColor:'#f9fafb'}}/>
  )
}

export default Home