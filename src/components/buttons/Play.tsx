import React from 'react'
import { Pressable } from 'react-native'
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PlayProps {
    text: string,
    isSpeaking: boolean,
    setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>
}

export const Play = ({ text, isSpeaking, setIsSpeaking }: PlayProps) => {
    return (


        !isSpeaking ? (
            <Pressable onPress={()=>{
                
                Tts.speak(text);
                setIsSpeaking(true)



            }}>
                <Icon name="volume-up" size={35} />
            </Pressable>
        )
            : (
                <Pressable onPress={()=>{
                    Tts.stop()
                setIsSpeaking(false)

            }}>
                    <Icon name="stop" size={35} />
                </Pressable>
            )


    )
}
