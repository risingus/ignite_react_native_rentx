import styled from "styled-components/native";
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  padding: 0 24px;
  background: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${getStatusBarHeight() + 31}px 0 0 0;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({theme}) => theme.fonts.secondary_600};
  color: ${({theme}) => theme.colors.title};
  margin: 60px 0 16px 0;
`;


export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.text};
  line-height: ${RFValue(25)}px;
`;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0 16px 0;
`;

export const FormTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.secondary_600};
  color: ${({theme}) => theme.colors.title};
  margin: 0 0 24px 0;
`;