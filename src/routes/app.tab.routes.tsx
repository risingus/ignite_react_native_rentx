import React from 'react';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';
import { AppStackRoutes } from './app.stack.routes';
import { useTheme } from 'styled-components';
import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
	const theme = useTheme();
	return (
		<Navigator
			initialRouteName="Initial"
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					height: 70,
					paddingVertical: Platform.OS === 'ios' ? 20 : 0,
					backgroundColor: theme.colors.background_primary,
				},
				tabBarActiveTintColor: theme.colors.main,
				tabBarInactiveTintColor: theme.colors.text_detail,
			}}>
			<Screen
				name="Initial"
				component={AppStackRoutes}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => <HomeSvg width={24} height={24} fill={color} />,
				}}
			/>

			<Screen
				name="MyCars"
				component={MyCars}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => <CarSvg width={24} height={24} fill={color} />,
				}}
			/>

			<Screen
				name="Profile"
				component={Profile}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => <PeopleSvg width={24} height={24} fill={color} />,
				}}
			/>
		</Navigator>
	);
}