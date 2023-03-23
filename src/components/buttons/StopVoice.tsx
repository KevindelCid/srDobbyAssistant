import React from 'react'
import { Button, View } from 'react-native'
import Tts from 'react-native-tts';

interface StopVoiceProps {
    isSpeaking: boolean,
    setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>
}



export const StopVoice = ({isSpeaking, setIsSpeaking}:StopVoiceProps) => {
  return <>
  {
     isSpeaking && 
     
     <View style={{ position:"absolute", top:50 }}>
      <Button title='stop' onPress={() => {
        Tts.stop()
        setIsSpeaking(false)
      }} />
     </View>
    
  }
  
  </>
   

  
}
