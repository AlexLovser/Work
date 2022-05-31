import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React, {useState} from 'react'


export default function ModalInput(props) {
    const [title, setTitle] = useState('')
    const [task, setTask] = useState('')

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.show}
            onRequestClose={() => props.disable()}
            
        >
            <SafeAreaView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.title}>Добавить предмет</Text>
                            <Text style={styles.description}>Укажите заголовок и задание</Text>
                        </View>
                        
                        <TextInput placeholder='Заголовок' style={styles.input} value={title} onChangeText={setTitle}/>
                        <TextInput placeholder='Задание' style={styles.input} value={task} onChangeText={setTask}/>

                        <View style={styles.lowerBlock}>
                            <TouchableOpacity onPress={() => props.disable()}>
                                <Text style={[styles.buttonText, {color: '#C3C3C5'}]}>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.handle({title, task})}>
                                <Text style={[styles.buttonText, {color: '#3784CC'}]}>Сохранить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

            </SafeAreaView>
           
        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    modalView: {
        width: 270,
        height: 219,
        margin: 20,
        backgroundColor: "#f7f7f7",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        justifyContent: 'space-evenly',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: 17,
        fontWeight: '500'
    },
    description: {
        fontSize: 13,
        fontWeight: '400',
        color: '#737A82' 
    },
    input: {
        width: 238,
        height: 32,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingLeft: 5,
    },

    buttonText: {
        fontWeight: '500',
        fontSize: 17,
        height: 22
        
    },
    lowerBlock: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        width: '100%',
    }
});