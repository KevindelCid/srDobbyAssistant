import axios from 'axios';

import { useState, useEffect, useRef } from 'react';
import { Button, LogBox, Pressable, StyleSheet, Text, TextInput, View, ScrollView, Dimensions } from 'react-native';
// import * as Speech from 'expo-speech';
import Tts from 'react-native-tts';
import { PermissionsAndroid } from 'react-native';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native';
import { MessageZone } from './src/components/inputs';
import { StopVoice } from './src/components/buttons';
import { Carrousel } from './src/components/layouts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment } from './src/store/slices/counterSlice';
import { addQuestion } from './src/store/slices/questionsSlice';
import { v4 as uuidv4 } from 'uuid';
// import Carousel from 'react-native-reanimated-carousel';
// import { responsiveScreenHeight } from 'react-native-responsive-dimensions';


const BASE_API_URL = 'https://dobbyassistantbackend-production.up.railway.app/'
LogBox.ignoreLogs(['new NativeEventEmitter()']);


export default function App() {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('screen').height
  const [question, setQuestion] = useState('')
  const [gptResponse, setGptResponse] = useState('')
  const dispatch = useDispatch()
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [micPermission, setMicPermission] = useState(false)

  const sendButtonRef = useRef<TextInput>(null)


  const onTtsStart = () => {
    setIsSpeaking(true);
    console.log('TTS is speaking');
  };

  const checkMicPermission = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );
    return granted;
  };


  useEffect(() => {
    const checkPermission = async () => {
      const granted = await checkMicPermission();
      setMicPermission(granted);
    };
    checkPermission();
  }, []);

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
      if (result)
        fetchGptResponse(result)
    }



  }, [result])


  Voice.onSpeechStart = () => setIsRecording(true)
  Voice.onSpeechEnd = () => setIsRecording(false)
  Voice.onSpeechError = (error: any) => setError(error.error)
  Voice.onSpeechResults = (result: any) => {



    setResult(result.value[0])
  }



  const recording = async () => {

    if (Voice !== null) {
      try {
        await Voice.start('es-MX')
      } catch (error: any) {
        setError(error.message)
      }
    }
  }

  const startRecording = async () => {
    Tts.stop()


    if (!micPermission) {
      await requestAudioPermission();
    }

    if (micPermission) {
      recording();
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
      console.log(response.data)
      setGptResponse(response.data)


      dispatch(addQuestion([{ id: "2", question: question, response: response.data }]))

      setError("")
      Tts.stop()
      speak(response.data)

    })
      .catch(error => {
        setError(error.message)
      })
      .finally(() => {
        
        
        setIsLoading(false)
      
      })

  }



  const handleSubmit = () => {
    console.log(`${BASE_API_URL}userSays=${question}`)
    if (sendButtonRef.current)
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
          message: 'Dobby Assistant needs access to your microphone to process your voice commands, if you not allow this, dobbyAssitant not works with all functions',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Audio Permission granted');
        setMicPermission(true)
      } else {
        console.log('Audio Permission denied');
        setMicPermission(false)
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    requestAudioPermission();
    setTimeout(() => {
      if (sendButtonRef.current)
        sendButtonRef.current.focus();
    }, 200);

  }, []);


  // const count = useSelector((state: RootState) => state.counter.value)
  // const dispatch = useDispatch()


  return (
   
<View style={  { flex: 1 }}>

    <View style={{ flex: 10 }}>
    {/* <Text>{ count }</Text>
    <Button title='increment' onPress={()=>dispatch(increment())} />
    <Button title='decrement' onPress={()=>dispatch(decrement())} /> */}
    {/* <Carousel
                loop
                width={width}
               
                autoPlay={false}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            /> */}

            <Carrousel />



    </View>
    <View style={{ flex:2 }} >

    <View style={styles.container}>
      {/* <ScrollView style={{ paddingBottom: 20 }}> */}
        {/* <Carrousel/> */}
      {/* <Text>{gptResponse || ""}</Text> */}
      {/* </ScrollView> */}
      <MessageZone 
      handleSubmit={handleSubmit} 
      isLoading={isLoading} 
      isRecording={isRecording} 
      question={question} 
      setQuestion={setQuestion} 
      startRecording={startRecording} />


      <StopVoice isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking} />

      {/* <Text>{result}</Text> */}
      <Text style={{ color: "red" }} >{error && "Ha ocurrido un error de conexión, comprueba tu conexión a internet"}</Text>

    </View>
    </View>

       
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  

  },
  writeContainer: {
    position: "absolute",
    width: "100%",
    bottom: 5,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    height: "auto",

  },
  sendButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {

    flex: 10,

    margin: 12,

    borderWidth: 1,
    borderRadius: 12,
    borderColor: "gray",
    padding: 10,
    maxHeight: 100,
  },
});





