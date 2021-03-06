import React, {useEffect, useState} from 'react';
import { format } from 'date-fns';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { Alert, StatusBar } from 'react-native';
import { api } from '../../services/api';
import { getAccessoryImg } from '../../utils/getAccessoryIcons';
import { Accessory } from '../../Components/Accessory';
import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';
import {
	Brand,
	CarImages,
	Container,
	Content,
	Description,
	Header,
	Name,
	Period,
	Rent,
	Price,
	Details,
	Accessories,
	Footer,
	RentalPeriod,
	CalendarIcon,
	DateInfo,
	DateTitle,
	DateValue,
	RentalPrice,
	RentalPriceLabel,
	RentalPriceDetails,
	RentalPriceQuota,
	RentalPriceTotal,
} from './styles';
import { Button } from '../../Components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface RentalPeriod {
	start: string;
	end: string;
}
interface Params {
	car: CarDTO;
	dates: string[];
}

export function SchedulingDetails() {
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
	const [loading, setLoading] = useState(false);
	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
	const netInfo = useNetInfo();
	const theme = useTheme();
	const { navigate }: NavigationProp<ParamListBase> = useNavigation();
	const route = useRoute();
	const { car, dates } = route.params as Params;

	const rentTotal = Number(dates.length * car.price);

	async function handleConfirm() {
		setLoading(true);

		await api
			.post('rentals', {
				car_id: car.id,
				user_id: 1,
				start_date: new Date(dates[0]),
				end_date: new Date(dates[dates.length - 1]),
				total: rentTotal,
			})
			.then(() =>
				navigate('Confirmation', {
					nextScreenRoute: 'Home',
					title: 'Carro alugado!',
					message: `Agora voc?? s?? precisa ir\nat?? a concession??ria da RENTX\npegar o seu autom??vel.`,
				})
			)
			.catch(() => {
				setLoading(false);
				Alert.alert('N??o foi poss??vel confirmar o agendamento');
			});
	}

	useEffect(() => {
		setRentalPeriod({
			start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
			end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
		});
	}, []);

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
			<Header>
				<BackButton />
			</Header>

			<CarImages>
				<ImageSlider
					images={
						!!carUpdated.photos ? carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
					}
				/>
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>
					<Rent>
						<Period>{car.period}</Period>
						<Price>R$ {car.price}</Price>
					</Rent>
				</Details>

				<RentalPeriod>
					<CalendarIcon>
						<Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
					</CalendarIcon>

					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue>{rentalPeriod.start}</DateValue>
					</DateInfo>

					<Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

					<DateInfo>
						<DateTitle>AT??</DateTitle>
						<DateValue>{rentalPeriod.end}</DateValue>
					</DateInfo>
				</RentalPeriod>

				<RentalPrice>
					<RentalPriceLabel>Total</RentalPriceLabel>
					<RentalPriceDetails>
						<RentalPriceQuota>{`R$ ${car.price} x${dates.length} di??rias`}</RentalPriceQuota>
						<RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>

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
			</Content>

			<Footer>
				<Button
					color={theme.colors.success}
					title="Alugar agora"
					onPress={handleConfirm}
					enabled={!loading}
					loading={loading}
				/>
			</Footer>
		</Container>
	);
}