import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import { toggleElement, deleteElement } from '../store/workSlice';
import { singleTaskType } from '../interfaces';


export default function Item({item}: {item: singleTaskType}) {
  const dispatch = useDispatch()
  const {id, acheived, title, task} = item;
  const makeAction = (func: any) => dispatch(func(id)) 

  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.small} onPress={() => makeAction(toggleElement)}>
        <View style={[styles.checkbox, {backgroundColor: acheived ? '#469D3E' : 'white', borderColor: acheived ? '#469D3E' : 'black'}]}>
          <Ionicons name='checkmark-sharp' size={25} color={acheived ? 'white' : '#bcbcbc'} />
        </View>
      </TouchableOpacity>
      
      <View style={{width: '70%'}}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text style={[styles.task, acheived && {textDecorationLine: 'line-through'}]}>
            {
              task.length > 82 ? task.slice(79) + '...' : task
            }
          </Text>
        </View>
      </View>

      <View style={styles.small}>
        <View style={styles.bin}>
          <Ionicons name='trash-outline' size={25} color='#6F767E' onPress={() => makeAction(deleteElement)}/>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: 8,
    },
    small: {
      width: '15%', 
      minWidth: 50
    },
    checkbox: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderRadius: 8,
    },
    bin: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F9F9F9',
      borderRadius: 8,
      padding: 5
    },
    title: {
      fontSize: 17,
      fontWeight: '500',
      color: '#3B3B3B'
    },
    task: {
      fontSize: 13,
      fontWeight: '400',
      color: '#3B3B3B'
    }
})