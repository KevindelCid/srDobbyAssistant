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
import { RootState } from '../../store';


// const questions = [
//   { question: "Hola", response: "Hola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamonaHola que tal, es un gusto para mi poder responder a tu pregunta, en realidad solo esto demostrando lo que mi creador ha decidido que te diga al momento de que me saludas con un 'Hola' es una cosa asi bien chingona asi bien cool y me dan ganas de apoyar a talentos como este no se que pedos deberia decir aqui asi que me voy a empezar a fumar una historia bien mamona" },
//   { question: "Cosa", response: "Cosa" },
//   { question: "Cosa", response: "Cosa" },
//   { question: "Cosa", response: "Cosa" },
//   { question: "Cosa", response: "Cosa" },
//   { question: "Cosa", response: "Cosa" },
// ]









const App = () => {

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
          <ScrollView nestedScrollEnabled={true} style={{ paddingTop: 20 }} >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>
              {item.question}
            </Text>
            <Text style={{ fontSize: 12, textAlign: 'justify' }}>
              {item.response}
            </Text>

          </ScrollView>

        </View>
      )}
    />

  );
};


export default App;