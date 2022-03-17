import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import FastImage from 'react-native-fast-image';

export const Container = styled(RectButton)`
	width: 100%;
	height: 126px;
	background: ${({ theme }) => theme.colors.background_secondary};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 24px;
	margin: 0 0 16px 0;
`;

export const Details = styled.View``;

export const Brand = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	color: ${({ theme }) => theme.colors.text_detail};
	font-size: ${RFValue(10)}px;
	text-transform: uppercase;
`;

export const Name = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	color: ${({ theme }) => theme.colors.title};
	font-size: ${RFValue(15)}px;
	text-transform: uppercase;
`;

export const Rent = styled.View`
	margin: 0 24px 0 0;
`;

export const About = styled.View`
	flex-direction: row;
	align-items: center;
	margin: 16px 0 0 0;
`;

export const Period = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	color: ${({ theme }) => theme.colors.text_detail};
	font-size: ${RFValue(10)}px;
	text-transform: uppercase;
`;

export const Price = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	color: ${({ theme }) => theme.colors.main};
	font-size: ${RFValue(15)}px;
	text-transform: uppercase;
`;

export const Type = styled.View``;

export const CarImage = styled(FastImage)`
	width: 167px;
	height: 85px;
`;
