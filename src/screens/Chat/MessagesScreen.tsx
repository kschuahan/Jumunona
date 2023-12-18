import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../utils/AppStyles'

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MessagesScreen</Text>
    </View>
  )
}

export default MessagesScreen

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});