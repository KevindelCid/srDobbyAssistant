import React, { useState } from 'react'
import Clipboard from '@react-native-clipboard/clipboard'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CopyProps {
    text: string
}

export const Copy = ({ text }: CopyProps) => {



    const [isCopy, setIsCopy] = useState(false)

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);

    }


    return (


        !isCopy
            ? (<Pressable onPress={() => { 
                copyToClipboard(text)
                setIsCopy(true)
                setTimeout(() => {
                    setIsCopy(false)
                }, 2000);
            }}><Icon name="content-copy" size={35} /></Pressable>)
            : (<Icon name="done" size={35} />)



    )
}
