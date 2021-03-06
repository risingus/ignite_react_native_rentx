import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';


interface InputProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin: 0 0 8px 0;
`;

export const IconContainer = styled.View<InputProps>`
  height: 56px;
  width: 55px;
  margin: 0 2px 0 0;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.background_secondary};

  ${({isFocused, theme}) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const InputText = styled.TextInput<InputProps>`
  flex: 1;
  padding: 0 23px;
  background: ${({theme}) => theme.colors.background_secondary};
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  ${({isFocused, theme}) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;