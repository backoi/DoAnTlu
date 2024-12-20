import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'

type Props = {}

const a = (props: Props) => {
  
    const textInputRef = useRef<TextInput>(null); // Ref cho TextInput
    const valueRef = useRef(''); // Ref để lưu trữ giá trị input
    const [submittedValue, setSubmittedValue] = useState(''); // State cho giá trị đã submit
  
    const handlePress = () => {
      setSubmittedValue(valueRef.current); // Lấy giá trị từ valueRef và cập nhật state
      console.log('Submitted Value:', valueRef.current);
      textInputRef.current?.clear(); // Xóa giá trị input trực tiếp
      //valueRef.current = ''; // Reset giá trị trong valueRef
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          ref={textInputRef} // Gán ref cho TextInput
          style={styles.input}
          placeholder="Nhập giá trị..."
          //onChangeText={(val) => (valueRef.current = val)} // Lưu giá trị vào ref
        />
        <Button title="In ra giá trị" onPress={handlePress} />
        {submittedValue ? (
          <Text style={styles.output}>Giá trị bạn nhập: {submittedValue}</Text>
        ) : null}
      </View>
    );
  
}

export default a

const styles = StyleSheet.create({})