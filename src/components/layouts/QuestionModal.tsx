import React from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';


interface QuestionModalProps {
    label: string;
    okLabel: string;
    cancelLabel: string;
    onOkPress: () => void;
    onCancelPress: () => void;
    visible: boolean;
  }


const QuestionModal = ({ label, okLabel, cancelLabel, onOkPress, onCancelPress, visible }: QuestionModalProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onCancelPress} style={styles.cancelButton}>
              <Text style={styles.buttonLabel}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOkPress} style={styles.okButton}>
              <Text style={styles.buttonLabel}>{okLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    minWidth: '70%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  buttonLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  okButton: {
    backgroundColor: '#2980b9',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#c0392b',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
});

export default QuestionModal;
