import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Dimensions,
  useWindowDimensions
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector } from 'react-redux';
import { Copy, Play } from '../buttons';



interface CarrouselProps {
  isSpeaking: boolean,
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>
}



const App = ({ isSpeaking, setIsSpeaking  }: CarrouselProps) => {

  const width = Dimensions.get('window').width;
  const questions = useSelector((state: RootState) => state.questions.questions)


  return (

    <Carousel
      loop
      width={width}
      panGestureHandlerProps={{
        activeOffsetX: [-30, 30],
      }}
      autoPlay={false}
      data={[...questions]}
      // scrollAnimationDuration={1000}
      onSnapToItem={(index) => console.log('current index:', index)}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20
          }}
        >
          <ScrollView 
            maximumZoomScale={5}
            
          nestedScrollEnabled={true} 
          style={{ paddingTop: 20, }} >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>
              {item.question}
            </Text>
            <Text style={{ fontSize: 16, textAlign: 'justify', marginTop: 20 }}>
              {item.response}
            </Text>
          <View style={{ height: 40 }} ></View>
          </ScrollView>
          <View style={{ paddingTop:15, paddingBottom:10, flexDirection: "row", justifyContent:"space-between" }}>
            <Play text={item.response} isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking} />
            <Copy text={item.response} />
          </View>
          
        </View>
      )}
    />

  );
};


export default App;