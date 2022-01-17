import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import {getStatusBarHeight} from 'react-native-iphone-x-helper';


export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(325)}px;
  background: ${({theme}) => theme.colors.header};
  justify-content: center;
  padding: ${getStatusBarHeight() + 30}px 25px 25px 25px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  margin: ${RFValue(24)}px 0 0 0;
`;

export const SubTitle = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
`;

export const Content = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;



export const CarWrapper = styled.View`
  margin: 0 0 16px 0;

`;

export const CarFooter = styled.View`
  width: 100%;
  padding: 12px;
  margin: -10px 0 0 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${({theme}) => theme.colors.background_secondary};
`;

export const CarFooterTitle = styled.Text`
  color: ${({theme}) => theme.colors.text_detail};
  font-family: ${({theme}) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
`;

