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
export const Details = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
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

export const About = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  text-align: justify;
  margin: 23px 0 0 0;
  line-height: ${RFValue(25)}px;
`;

export const Accessories = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  margin: 16px 0 0 0;
`;

export const Footer = styled.View`
  width: 100%;
  background: ${({theme}) => theme.colors.background_secondary};
  padding: 24px 24px ${getBottomSpace() + 24}px 24px;
`;

export const OfflineInfo = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	color: ${({ theme }) => theme.colors.main};
	font-size: ${RFValue(10)}px;
	text-align: center;
`;

