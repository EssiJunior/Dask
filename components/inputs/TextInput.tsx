import { TextInput as Input } from "react-native";
import Colors from "../../constants/Colors";

type TextInputProps = {
  value: string;
  placeholder: string;
  type: "default" | "numeric" | "visible-password";
  style: object;
  width: number | string;
  height: number | string;
  ph: number;
  pv: number;
  fontSize: number;
  onChange: (value: string) => void;
};

export default function TextInput({
  value,
  placeholder,
  type,
  style,
  fontSize,
  onChange,
  pv,
  ph,
  width,
  height
}: TextInputProps) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      keyboardType={type}
      style={[
        style,
        {
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.light.grayNormal,
          fontFamily: "TitilliumRegular",
          color: Colors.light.gray,
          fontSize,
          width,
          height,
          paddingHorizontal: ph,
          paddingVertical: pv
        },
      ]}
    />
  );
}

TextInput.defaultProps = {
  value: "",
  placeholder: "",
  type: "default",
  style: {},
  fontSize: 16,
  ph: 20,
  pv: 14,
  width: "auto",
  height: "auto",
  onChange: () => {},
};
