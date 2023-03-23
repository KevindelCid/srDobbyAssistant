import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';



interface MessageZoneProps  {
    setQuestion: React.Dispatch<React.SetStateAction<string>>
    question: string,
    isLoading: boolean,
    isRecording: boolean,
    startRecording: ()=>void,
    handleSubmit: ()=> void,

}    




export const MessageZone = ({ setQuestion, question, isLoading, isRecording, startRecording, handleSubmit }: MessageZoneProps) => {



    const sendButtonRef = useRef<TextInput>(null)
    useEffect(() => {
        
        setTimeout(() => {
          if(sendButtonRef.current)
        sendButtonRef.current.focus();
        }, 200);
        
      }, []);
    



  return (
    <View style={styles.writeContainer}>

    <TextInput
    ref={sendButtonRef}
    style={styles.input}
    onChangeText={setQuestion}
    value={question}
    multiline={true}
    placeholder="Type you message"

  />

{ isLoading ? <ActivityIndicator/> : (<>


 {

    !question ? <>
    <Pressable disabled={isRecording} style={{  }} onPress={startRecording} >
    {
      isRecording ? <><Icon name="mic-none" size={35}  /></> : <><Icon name="mic" size={35}  /></>
    }
    
  </Pressable>
    </> : <>
     <Pressable style={styles.sendButton} onPress={handleSubmit} >
  
  <Icon name="send" size={35}  />
  </Pressable>
    </>

  }
 


</>) }

 
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal:20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    writeContainer : {
      position: "absolute",
      width: "100%",
      bottom:5,
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
      height: "auto",
      zIndex: 10,
    },
    sendButton: {
      flex:2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
     
      flex:10,
      backgroundColor: 'white',
      margin: 12,
     
      borderWidth: 1,
      borderRadius:12,
      borderColor: "gray",
      padding: 10,
      maxHeight:100,
    },
  });
  
  