import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, ActionSheetIOS, Platform, Alert } from 'react-native';
import Item from './components/Item';
import ModalInput from './components/ModalInput';

export default function App() {
	const [data, setData] = useState(DATA)
	const [appearenceType, setAppearenceType] = useState(0)
	const [modalVisible, setModalVisible] = useState(false);

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])
	
	
	const appearenceText = {
		0: 'Все задания',
		1: 'Выполненные задания',
		2: 'Не выполненные задания'
	}[appearenceType]

	const filter = ({item}) => {
		let index = data.indexOf(item)

		updateMethod = () => {
			setData(
				oldData => {
					let newData = [...oldData]
					newData[index].acheived = !newData[index].acheived
					return newData
				}
			)
		}

		deleteMethod = () => {
			setData(
				oldData => {
					let newData = [...oldData]
					newData.splice(index, 1)
					return newData
				}
			)
		}

		let element = <Item {...item} updateMethod={updateMethod} deleteMethod={deleteMethod}/>

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
		let finished = 0
		let inProcess = 0

		for (let elem in data) {
			elem = data[elem]
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

	const onSubmit = ({title, task}) => {
		
		setData(
			oldData => {
				if (Boolean(title) && Boolean(task)) {
					setModalVisible(false)
					let newData = [...oldData]
					newData = newData.concat(
						{
							title,
							task,
							acheived: false
						}
					)
					return newData
				} else {
					return oldData
				}
				
		}
		)
		
	}	

	const onLongPress = () => {
		console.log(Platform.OS)
		if (Platform.OS == 'ios') {
			ActionSheetIOS.showActionSheetWithOptions(
				{
					options: ["Отмена", "Все задания", "Выполненные задания", 'Не выполненные задания'],
					cancelButtonIndex: 0,
					userInterfaceStyle: 'light',
					title: 'Выберите фильтр',
					message: 'Фильтры формируют список заданий',
					tintColor: '#3785CC'
				},
				buttonIndex => setAppearenceType(buttonIndex - 1)
			);
		} else {
			Alert.alert(
				'Эта функция недоступна!',
				'К сожалению такие меню доступны только на IOS',
				['Ok']
			)
		}
		
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<View style={{height: 128, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
				<TouchableOpacity style={styles.appearenceChange} onPress={changeType} onLongPress={onLongPress}>
					<Text style={styles.appearenceText}>
						{appearenceText}
					</Text>
				</TouchableOpacity>
			</View>
			<View style={{width: '90%'}}>
				{
					thereAreSomeThingsToShow() ? 
					<FlatList
						data={data}
						keyExtractor={() => (Math.random() * 100).toString()}
						renderItem={filter}
						style={styles.flat}
					/>
					:
					<Text>Здесь пока что пусто...</Text>
				}
			</View>

			<TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
				<Text style={styles.addText}>Добавить</Text>
			</TouchableOpacity>
			
			<ModalInput show={modalVisible} disable={() => setModalVisible(false)} handle={onSubmit}/>
			
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
		borderColor: '#3785CC',
		borderRadius: 10,
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	appearenceText: {
		color: '#3785CC',
		fontWeight: '500',
		fontSize: 14
	},
	addButton: {
		width: '90%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3785CC',
		height: 55,
		borderRadius: 10,
		marginVertical: 20
	},
	addText: {
		fontSize: 16,
		fontWeight: '500',
		color: 'white'
	}
});


const DATA = [
  {title: 'Математика', task: 'Стр 4, упражнение 4', acheived: false},
  {title: 'Русский язык', task: 'Стр 4, упражнение 4', acheived: false},
  {title: 'ИЗО', task: 'Подготовить клей, ножницы, вл. салфетки, цветную бумагу, ножницы, шерстняые нитки4', acheived: false},
  {title: 'Литература', task: 'Стр 4, упражнение 4', acheived: false},
]