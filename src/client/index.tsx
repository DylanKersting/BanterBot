import React, { useMemo } from 'react'
import { Main } from './components/main'
import axios from 'axios/dist/axios'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import { createRoot } from 'react-dom/client';

axios.post('/text', {text: 'wow'}).then(res => {
  console.log('RESPONSE FROM SERVER: ', res.data)
})


const Browser = () => {
  const {
    transcript,
    interimTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  useMemo(() => {
    axios.post('/text', {text: interimTranscript})
  }, [transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  startListening()
  return (
    <div>
      <p>{transcript}</p>
    </div>
  );
};

createRoot(document.getElementById('app')).render(<Browser/>)





