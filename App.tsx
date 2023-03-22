import axios from 'axios';

import { useState, useEffect, useRef } from 'react';
import { Button, LogBox, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import * as Speech from 'expo-speech';
import Tts from 'react-native-tts';
import { PermissionsAndroid } from 'react-native';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native';

const BASE_API_URL = 'https://dobbyassistantbackend-production.up.railway.app/'
LogBox.ignoreLogs(['new NativeEventEmitter()']);


export default function App() {

  const [question, setQuestion] = useState('')
  const [gptResponse, setGptResponse] = useState('')

  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [  isSpeaking, setIsSpeaking ] = useState(false)
  const [  isLoading, setIsLoading ] = useState(false)

const sendButtonRef = useRef<TextInput>(null)


const onTtsStart = () => {
  setIsSpeaking(true);
  console.log('TTS is speaking');
};

  useEffect(() => {
    Tts.setDefaultLanguage('es-MX');
     // Agregar listener al evento tts-start
  Tts.addEventListener('tts-start', onTtsStart);

  // Agregar listener al evento tts-finish
  Tts.addEventListener('tts-finish', () => setIsSpeaking(false));

  return () => {
    // Eliminar los listeners cuando el componente se desmonte
    Tts.removeEventListener('tts-start', onTtsStart);
    Tts.removeEventListener('tts-finish', () => setIsSpeaking(false));
  };
  }, [])

  useEffect(() => {


    if (result.toLowerCase() === "cambia a inglés") {
      Tts.setDefaultLanguage('en-US');
      speak("Sure! i speak english with you")
    }
    else if (result.toLowerCase() === "change to english") {
      Tts.setDefaultLanguage('en-US');
      speak("Sure! i speak english with you")
    }

    else if (result.toLowerCase() === "cambia a español") {
      Tts.setDefaultLanguage('es-MX');
      speak("Claro, puedo hablar español")
    }
    else if (result.toLowerCase() === "change to spanish") {
      Tts.setDefaultLanguage('es-MX');
      speak("Claro, puedo hablar español")
    }
    else {
      if(result)
      fetchGptResponse(result)
    }



  }, [result])


  Voice.onSpeechStart = () => setIsRecording(true)
  Voice.onSpeechEnd = () => setIsRecording(false)
  Voice.onSpeechError = (error: any) => setError(error.error)
  Voice.onSpeechResults = (result: any) => {
    
   
    
    setResult(result.value[0])}


  const startRecording = async () => {
    Tts.stop()
    if (Voice !== null) {
      try {
        await Voice.start('es-MX')
      } catch (error: any) {
        setError(error.message)
      }
    }
  }
  const stopRecording = async () => {
    if (Voice !== null) {
      try {
        await Voice.stop()

      } catch (error) {
        console.log(error)
      }
    }
  }

  const speak = (gptWords: string) => {

    Tts.speak(gptWords);

  };

  const fetchGptResponse = (question: string) => {
    setIsLoading(true)
    axios.get(`${BASE_API_URL}userSays=${question}`).then(response => {
      console.log(response)
      setGptResponse(response.data)
      Tts.stop()
      speak(response.data)
    }).finally(()=> setIsLoading(false))

  }



  const handleSubmit = () => {
    console.log(`${BASE_API_URL}userSays=${question}`)
    if(sendButtonRef.current)
    sendButtonRef.current.setNativeProps({ text: '' })

    fetchGptResponse(question)
    setQuestion("")
  }
  const requestAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Permission',
          message: 'Dobby Assistant needs access to your microphone to process your voice commands',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Audio Permission granted');
      } else {
        console.log('Audio Permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    requestAudioPermission();
    setTimeout(() => {
      if(sendButtonRef.current)
    sendButtonRef.current.focus();
    }, 200);
    
  }, []);


  return (
    <View style={styles.container}>
      <Text>{gptResponse || "Type your question for Dobby"}</Text>
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
      
   

      {/* aqui necesito validar si Tts está reproduciendo el texto. si esta reproduciendo debe aparecer el button de title stop y si no, este debe desaparecer */}
      {isSpeaking && <Button title='stop' onPress={() => {
        Tts.stop()
        setIsSpeaking(false)
        }} />}
      {/* <Button title='stop' onPress={() => Tts.stop()} /> */}

      <Text>{result}</Text>
      <Text>{error}</Text>



      



    </View>
  );
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
   
  },
  sendButton: {
    
   
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  input: {
   
    flex:10,
    
    margin: 12,
   
    borderWidth: 1,
    borderRadius:12,
    borderColor: "gray",
    padding: 10,
    maxHeight:100,
  },
});





