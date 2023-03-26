import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Dimensions,
  useWindowDimensions,
  Pressable,
  StatusBar
} from 'react-native';
import Carousel, { TCarouselProps } from 'react-native-reanimated-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { Copy, Delete, Play } from '../buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { QuestionData, removeQuestion } from '../../store/slices/questionsSlice';
import { scrollTo } from 'react-native-reanimated';



interface CarrouselProps {
  isSpeaking: boolean,
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>
}





const App = ({ isSpeaking, setIsSpeaking }: CarrouselProps) => {
  const carouselRef = useRef<any>(null);
  const width = Dimensions.get('window').width;
  const questions = useSelector((state: RootState) => state.questions.questions)
  const dispatch = useDispatch()



  const goToAdd = () => {

    carouselRef.current.scrollTo({ index: questions.length, animated: true })

  }

  const goToLast = () => {

    carouselRef.current.scrollTo({ index: questions.length - 1, animated: true })
  }

  const next = () => {
    carouselRef.current.next()

  }
  const prev = () => {
    carouselRef.current.prev()

  }

  useEffect(() => {
    setTimeout(() => {
      goToLast()
    }, 500)

  }, [questions])


  const itemsOnCarousel = (props: QuestionData) => {


    switch (props.type) {
      case "addition":
        return (<>
          <StatusBar backgroundColor="black" />
          <ScrollView

          >
            <View style={{ backgroundColor: "black", width: "100%", height: 100, justifyContent: "center", alignItems: "center", }} >

              <Text style={{ color: "white", fontSize: 27, fontWeight: "700" }} >Welcome to Istory</Text>
              <Text style={{ color: "white", }}>powered by ChatGPT</Text>

            </View>
            <View style={{ width: "100%", paddingHorizontal: 20, justifyContent: "center", alignItems: "center", paddingTop: 40 }} >
              <Text style={{ fontSize: 17, fontWeight: "700" }} >How to use</Text>
              <Text style={{ textAlign: "justify" }}>{props.response}</Text>

              <View style={{ marginVertical: 40, justifyContent: "center", alignItems: "center" }}>
                <Text>Swipe right or left to see your conversations</Text>
                <View style={{ paddingTop: 20 }}>
                  <Icon name="swipe" size={55} />
                </View>

              </View>

            </View>

          </ScrollView>

        </>)

      case "ad":
        return (<>


        </>)

      case "conversation":
        return (<>




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
                {props.question}
              </Text>
              <Text style={{ fontSize: 16, textAlign: 'justify', marginTop: 20 }}>
                {props.response}
              </Text>
              <View style={{ height: 40 }} ></View>
            </ScrollView>
            <View style={{ paddingTop: 15, paddingBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
              <Pressable onPress={() => {

                prev()
              }}>
                <Icon name="arrow-back-ios" size={35} />

              </Pressable>
              <Play text={props.response} isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking} />
              <Copy text={props.response} />
              <Delete id={props.id} />

              <Pressable onPress={() => {

                next()
              }}>
                <Icon name="arrow-forward-ios" size={35} />

              </Pressable>
            </View>

          </View>

        </>)


      default:
        break
    }


  }


  return (
    <>

      <Carousel
        ref={carouselRef}
        loop

        pagingEnabled={true}
        width={width}
        panGestureHandlerProps={{
          activeOffsetX: [-30, 30],
        }}
        autoPlay={false}
        data={[...questions]}
        // scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item, index }) => (


          <>
            {itemsOnCarousel(item)}
          </>

        )}
      />

    </>
  );
};


export default App;