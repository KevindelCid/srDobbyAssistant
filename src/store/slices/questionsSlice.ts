import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'







export interface QuestionData {
  id: string;
  question: string;
  response: string;
  type: "addition"| "conversation" | "ad";
}

export interface QuetionArr {
  questions: QuestionData[]
}


const initialState: QuetionArr = {
  questions: [

    {
      id: "1",
      question: "¿Como usar esta App?",
      response: "Escribe lo que desees en el campo de texto en la parte inferior de la pantalla\n presiona el boton que se encuentra a la derecha del campo de texto y espera tu respuesta\nDile a tu asistente algo por medio de audio\npresiona el icono de microfono y empezará a escucharte... adelante di lo que gustes y espera tu respuesta\nDesliza a la derecha o a la izquierda para navegar entre tus interacciones con tu asistente\nPresiona el icono de la bocina para reproducir con voz la respuesta de la pregunta en la que te encuentras",
      type: "addition"
    }

  ]

}

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {

    setQuestions: (state, action) => {
      state.questions = [...action.payload]
    },
    addQuestion: (state, action) => {


     


      state.questions = [...state.questions, ...action.payload]

    },
    removeQuestion: (state, action) => {
      state.questions = [...state.questions.filter((question) => question.id !== action.payload)]
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setQuestions,
  addQuestion,
  removeQuestion,

} = questionsSlice.actions

export default questionsSlice.reducer