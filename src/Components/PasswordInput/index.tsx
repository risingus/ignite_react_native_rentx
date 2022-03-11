import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";
import {Feather} from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { 
  Container,
  InputText,
  IconContainer,
} from "./styles";
import { useState } from "react";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: InputProps) {
  const theme = useTheme()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function changePasswordVisibility() {
    setIsPasswordVisible(prevState => !prevState)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather 
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
     
      <InputText 
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={!isPasswordVisible}
        isFocused={isFocused}
      />

      <BorderlessButton onPress={changePasswordVisibility}>
        <IconContainer isFocused={isFocused}>
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  )
}