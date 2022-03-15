import { useState, useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';
import Animated, {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
} from 'react-native-reanimated';
import { api } from '../../services/api';
import { Accessory } from '../../Components/Accessory';
import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';
import {
	Brand,
	CarImages,
	Container,
	Description,
	Header,
	Name,
	Period,
	Rent,
	Price,
	Details,
	About,
	Accessories,
	Footer,
	OfflineInfo,
} from './styles';
import { Car as ModelCar } from '../../database/model/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { Button } from '../../Components/Button';
import { getAccessoryImg } from '../../utils/getAccessoryIcons';

interface RouteParams {
	car: ModelCar;
}

export function CarDetails() {
	const theme = useTheme();
	const netInfo = useNetInfo();
	const { navigate }: NavigationProp<ParamListBase> = useNavigation();
	const route = useRoute();
	const { car } = route.params as RouteParams;
	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
	const scrollY = useSharedValue(0);
	const headerStyleAnimation = useAnimatedStyle(() => {
		return {
			height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
		};
	});

	const sliderCarsStyleAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
		};
	});

	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});

	function handleConfirmRental() {
		navigate('Scheduling', {
			car,
		});
	}

	LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

	useEffect(() => {
		async function fetchCarUpdated() {
			if (!netInfo.isConnected) return;
			const response = await api.get(`/cars/${car.id}`);
			setCarUpdated(response.data);
		}

		fetchCarUpdated();
	}, [netInfo.isConnected]);

	return (
		<Container>
			<StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />

			<Animated.View
				style={[
					headerStyleAnimation,
					{
						position: 'absolute',
						overflow: 'hidden',
						zIndex: 1,
						backgroundColor: theme.colors.background_secondary,
					},
				]}>
				<Header>
					<BackButton />
				</Header>

				<CarImages>
					<Animated.View style={[sliderCarsStyleAnimation]}>
						<ImageSlider
							images={
								!!carUpdated.photos
									? carUpdated.photos
									: [{ id: car.thumbnail, photo: car.thumbnail }]
							}
						/>
					</Animated.View>
				</CarImages>
			</Animated.View>

			<Animated.ScrollView
				contentContainerStyle={{
					paddingHorizontal: 24,
					paddingTop: getStatusBarHeight() + 160,
					alignItems: 'center',
				}}
				showsVerticalScrollIndicator={false}
				onScroll={scrollHandler}
				scrollEventThrottle={16}>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>
					<Rent>
						<Period>{car.period}</Period>
						<Price>R$ {netInfo.isConnected ? car.price : '...'}</Price>
					</Rent>
				</Details>

				{carUpdated.accessories && (
					<Accessories>
						{carUpdated.accessories.map((accessory) => (
							<Accessory
								name={accessory.name}
								key={accessory.type}
								icon={getAccessoryImg(accessory.type)}
							/>
						))}
					</Accessories>
				)}

				<About>{car.about}</About>
			</Animated.ScrollView>

			<Footer>
				<Button
					title="Escolher período do aluguel"
					onPress={handleConfirmRental}
					enabled={netInfo.isConnected === true}
				/>

				{!netInfo.isConnected && (
					<OfflineInfo>
						Conecte-se a internet para ver mais detalhes e agendar seu carro
					</OfflineInfo>
				)}
			</Footer>
		</Container>
	);
}
