import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps extends RectButtonProps {
  color?: string;
  loading?: boolean;
}

interface ButtonTextProps {
  light?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  background: ${({theme, color}) => color ? color : theme.colors.main};
  opacity: ${({enabled, loading}) => (enabled === false || loading === true) ? .5 : 1};
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({theme, light}) => 
  light ? theme.colors.header : theme.colors.shape};
`;