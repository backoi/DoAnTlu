import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import React, { ReactNode, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from "../constants/appColor";
import { appSize } from "../constants/appSize";

interface Props {
  placeholder?: string;
  leftIC?: ReactNode;
  password?: boolean;
  rightIC?: ReactNode;
  value?: string;
  errorMessage?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (val: string) => void | undefined;
  onBlur?: (e: any) => void;
}

const InputComponent = (props: Props) => {
  const {
    keyboardType,
    placeholder,
    leftIC,
    password,
    rightIC,
    value,
    onChangeText,
    onBlur,
    errorMessage,
  } = props;
  const [isShowedPass, setIsShowedPass] = useState(true);
  return (
    <View style={styles.inputContainer}>
      {password ? (
        <MaterialCommunityIcons
          name="lock-outline"
          size={appSize.icon}
          color={appColor.text}
        />
      ) : (
        leftIC
      )}

      <TextInput
      keyboardType={keyboardType}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={password && isShowedPass}
        placeholder={placeholder}
        style={styles.textInput}
      ></TextInput>
      {password ? (
        <TouchableOpacity onPress={() => setIsShowedPass(!isShowedPass)}>
          <MaterialCommunityIcons
            name={isShowedPass ? "eye-off-outline" : "eye-outline"}
            size={appSize.icon}
            color={appColor.text}
          />
        </TouchableOpacity>
      ) : null}
      {rightIC ?? rightIC}

      {errorMessage && (
        <Text style={{ color: "red", fontSize: appSize.small }}>{errorMessage}</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  textInput: { marginLeft: 10, fontSize: appSize.para, flex: 1 },
});
export default InputComponent;
