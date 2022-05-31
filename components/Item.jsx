import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { } from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { mainColor } from '../src/data'


export default function Item(props) {
  const color = props.acheived ? '#469D3E' : 'white'
  const border = props.acheived ? '#469D3E' : 'black'

  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.small} onPress={props.updateMethod}>
        <View style={[styles.checkbox, {backgroundColor: color, borderColor: border}]}>
          <Ionicons name='checkmark-sharp' size={25} color={props.acheived ? 'white' : '#bcbcbc'} />
        </View>
      </TouchableOpacity>
      
      <View style={{width: '70%'}}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View>
          <Text style={[styles.task, props.acheived && {textDecorationLine: 'line-through'}]}>{props.task}</Text>
        </View>
        
      </View>

      <View style={styles.small}>
        <View style={styles.bin}>
          <Ionicons name='trash-outline' size={25} color='#6F767E' onPress={props.deleteMethod}/>
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