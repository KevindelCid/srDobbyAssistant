import React, { useState } from 'react'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { QuestionModal } from '../layouts';
import { useDispatch } from 'react-redux';
import { removeQuestion } from '../../store/slices/questionsSlice';
interface DeleteProps {

   id: string
}

export const Delete = ({ id }: DeleteProps) => {

    const [ visible, setVisible ] = useState(false)
    const dispatch = useDispatch()


  return (
    <>
    <QuestionModal cancelLabel='Cancel' label='Delete this article?' okLabel='Yes' onCancelPress={()=>setVisible(false)} onOkPress={()=>{

        dispatch(removeQuestion(id))
        setVisible(false)
    }} visible={visible}/>
     <Pressable onPress={()=>{
        setVisible(true)
    }}>
        <Icon name="delete" size={35} />
    </Pressable>
    </>
   
  )
}
