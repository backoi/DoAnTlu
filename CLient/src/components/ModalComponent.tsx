import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const ModalComponent = ({ title, message, visible, onDismiss }: any) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Button title="OK" onPress={onDismiss} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(46, 43, 43, 0.5)", // Transparent background
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
});

export default ModalComponent;
