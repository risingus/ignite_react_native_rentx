import styled from 'styled-components/native';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container  = styled.View`
  flex: 1;
  background: ${({theme}) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  margin: ${getStatusBarHeight() + 18}px 0 0 24px;
`;

export const CarImages = styled.View`
  margin: ${getStatusBarHeight() + 32}px 0 0 0;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: 'center',
  },
  showVerticalScrollIndicator: false
})`


`;

export const Details = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 38px 0 0 0;
`;

export const Description = styled.View`

`;

export const Brand = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(20)}px;
  text-transform: uppercase;
`;

export const Rent = styled.View`

`;

export const Period = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.main};
  font-size: ${RFValue(20)}px;
  text-transform: uppercase;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${RFValue(35)}px 0 0 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.line};
  padding: 0 0 ${RFValue(10)}px 0;

`;

export const CalendarIcon = styled.View`
  width: 48px;
  height: 48px;
  background: ${({theme}) => theme.colors.main};
  justify-content: center;
  align-items: center;
`;

export const DateInfo = styled.View`

`;

export const DateTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const DateValue = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(15)}px;
`;

export const Accessories = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0 0 0;
`;

export const RentalPrice = styled.View`
  width: 100%;
  margin: ${RFValue(16)}px 0 0 0;
  justify-content: flex-end;

`;

export const RentalPriceLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const RentalPriceDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const RentalPriceQuota = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(15)}px;
`;

export const RentalPriceTotal = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.success};
  font-size: ${RFValue(24)}px;
`;

export const Footer = styled.View`
  width: 100%;
  background: ${({theme}) => theme.colors.background_secondary};
  padding: 24px 24px ${getBottomSpace() + 24}px 24px;
`;

