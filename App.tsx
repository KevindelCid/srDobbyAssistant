import axios from 'axios';

import { useState, useEffect } from 'react';
import { Button, LogBox, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import * as Speech from 'expo-speech';
import Tts from 'react-native-tts';
import { PermissionsAndroid } from 'react-native';
import Voice from '@react-native-voice/voice';


const BASE_API_URL = 'https://dobbyassistantbackend-production.up.railway.app/'
LogBox.ignoreLogs(['new NativeEventEmitter()']);


export default function App() {

  const [question, setQuestion] = useState('')
  const [gptResponse, setGptResponse] = useState('')

  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);



  useEffect(() => {
    Tts.setDefaultLanguage('es-MX');
    
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
  Voice.onSpeechResults = (result: any) => setResult(result.value[0])


  const startRecording = async () => {
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

    // const speechOptions = {
    //   language: 'es-MX'
    // };
    Tts.speak(gptWords);

  };

  const fetchGptResponse = (question: string) => {
    axios.get(`${BASE_API_URL}userSays=${question}`).then(response => {
      console.log(response.data)
      setGptResponse(response.data)
      speak(response.data)
    })

  }



  const handleSubmit = () => {
    console.log(`${BASE_API_URL}userSays=${question}`)


    fetchGptResponse(question)

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
  }, []);


  return (
    <View style={styles.container}>
      <Text>{gptResponse || "Type your question for Dobby"}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setQuestion}
        value={question}
        multiline={true}
        placeholder="useless placeholder"

      />
      <Button title='enviar pregunta' onPress={handleSubmit} />
      {/* <Button title="Press to hear some words" onPress={speak()} /> */}
      <Button title='stop' onPress={() => Tts.stop()} />

      <Text>{result}</Text>
      <Text>{error}</Text>



      <Pressable disabled={isRecording} style={{...styles.button, backgroundColor: isRecording ? "gray" : "red"  }} onPress={startRecording} >
        <Text>{isRecording ? "listening" : "Start Recording"}</Text>
      </Pressable>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "red",
    padding: 10
  },
  input: {
    height: "auto",
    margin: 12,
    width: 300,
    borderWidth: 1,
    padding: 10,
  },
});





