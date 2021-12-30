import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  background: ${({theme}) => theme.colors.header};
  padding: ${RFValue(60)}px 0 0 0;

`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 0 ${RFValue(80)}px 0;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  margin: ${RFValue(30)}px 0 0 0;

`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.text_detail};
  font-family: ${({theme}) => theme.fonts.primary_400};
  text-align: center;
  margin: ${RFValue(16)}px 0 0 0;
  line-height: ${RFValue(25)}px;

`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin: ${RFValue(30)}px 0 ${RFValue(80)}px 0;
`;