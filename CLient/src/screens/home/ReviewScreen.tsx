import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HeaderBar } from '../../components'
import { Add } from '../../assets/svg'

type Props = {}

const ReviewScreen = ({navigation}:any) => {
  return (
    <View>
      <HeaderBar color='black' title='Reviews' rightIC={<TouchableOpacity onPress={()=>navigation.navigate('WriteReview')} style={{}}><Add height={23}/></TouchableOpacity>}/>
    </View>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({})