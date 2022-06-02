import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, ActionSheetIOS, Platform, Alert, Modal } from 'react-native';
import Item from './components/Item';
import ModalInput from './components/ModalInput';
import { mainColor } from './src/data';
import { useSelector } from 'react-redux';
import { singleTaskType, tasksType } from './interfaces';


export default function MainScreen() {
    const data = useSelector((state: tasksType) => state.tasks.tasks)
	const [appearenceType, setAppearenceType] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);

	const appearenceText = {
		0: 'Все задания',
		1: 'Выполненные задания',
		2: 'Не выполненные задания'
	}[appearenceType]

	const filter = ({item}: {item: singleTaskType}) => {
		let element = <Item item={item}/>
		switch(appearenceType) {
			case 0:
			 	return element
			case 1:
				return item.acheived ? element : null
			case 2:
				return item.acheived ? null : element
			default:
				return null
		}
	}
	
	const thereAreSomeThingsToShow = () => {
		let finished: number = 0
		let inProcess: number = 0

		for (let elem of data) {
			if (elem.acheived) {
				finished++
			} else {
				inProcess++
			}
		}
		return (appearenceType == 0 && data.length !== 0) || (appearenceType == 1 && finished !== 0) || (appearenceType == 2 && inProcess !== 0)

	}

	const changeType = () => {
		if (appearenceType == 2) {
			setAppearenceType(0)
		} else {
			setAppearenceType(prev => prev + 1)
		}
	}

	const modalToggle = () => {setModalVisible(prev => !prev)}

	
	const onLongPress = () => {
		if (Platform.OS == 'ios') {
			ActionSheetIOS.showActionSheetWithOptions(
				{
					options: ["Отмена", "Все задания", "Выполненные задания", 'Не выполненные задания'],
					cancelButtonIndex: 0,
					userInterfaceStyle: 'light',
					title: 'Выберите фильтр',
					message: 'Фильтры формируют список заданий',
					tintColor: mainColor
				},
				buttonIndex => buttonIndex != 0 && setAppearenceType(buttonIndex - 1)
			);
		} else {
			Alert.alert(
				'Эта функция недоступна!',
				'К сожалению такие меню доступны только на IOS',
				[
					{ text: "OK", onPress: () => {} }
				]
			)
		}
		
	};

	return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={{height: '15%', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <TouchableOpacity style={styles.appearenceChange} onPress={changeType} onLongPress={onLongPress}>
                    <Text style={styles.appearenceText}>
                        {appearenceText}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '90%', maxHeight: '70%'}}>
                {
                    thereAreSomeThingsToShow() ? 
                    <FlatList
                        data={data}
                        keyExtractor={() => (Math.random() * 100).toString()}
                        renderItem={filter}
                        style={[styles.flat, {}]}
                    />
                    :
                    <Text>Здесь пока что пусто...</Text>
                }
            </View>

            <TouchableOpacity style={styles.addButton} onPress={modalToggle}>
                <Text style={styles.addText}>Добавить</Text>
            </TouchableOpacity>

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={modalToggle}
            >
                <ModalInput disable={modalToggle} />
            </Modal>
        </SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
	},
	flat: {
		width: '100%',
	},
	appearenceChange: {
		width: '90%',
		height: 36,
		borderColor: mainColor,
		borderRadius: 10,
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	appearenceText: {
		color: mainColor,
		fontWeight: '500',
		fontSize: 14
	},
	addButton: {
		width: '90%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: mainColor,
		height: 55,
		borderRadius: 10,
		marginVertical: 20
	},
	addText: {
		fontSize: 16,
		fontWeight: '500',
		color: 'white',
	}
});
