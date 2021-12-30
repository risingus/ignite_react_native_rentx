import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View`
  width: ${RFValue(105)}px;
  height: ${RFValue(90)}px;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.background_primary};
  padding: 16px;
  margin: 0 0 8px 0;
`;

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(13)}px;
`;