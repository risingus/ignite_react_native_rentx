import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { BackButton } from '../../Components/BackButton';
import { format, parseISO } from 'date-fns';
import { api } from '../../services/api';
import {
	Container,
	Title,
	Header,
	SubTitle,
	Content,
	Appointments,
	AppointmentsTitle,
	AppointmentsQuantity,
	CarWrapper,
	CarFooter,
	CarFooterTitle,
	CarFooterPeriod,
	CarFooterDate,
} from './styles';
import { Car } from '../../Components/Car';
import { Car as ModelCar } from '../../database/model/Car';
import { LoadAnimation } from '../../Components/LoadAnimation';

interface DataProps {
	id: string;
	car: ModelCar;
	start_date: string;
	end_date: string;
}

export function MyCars() {
	const theme = useTheme();
	const screenIsFocused = useIsFocused();
	const [cars, setCars] = useState<DataProps[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get('/rentals');
				const dateFormatted = response.data.map((agendamento: DataProps) => {
					return {
						...agendamento,
						start_date: format(parseISO(agendamento.start_date), 'dd/MM/yyyy'),
						end_date: format(parseISO(agendamento.end_date), 'dd/MM/yyyy'),
					};
				});
				setCars(dateFormatted);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		fetchCars();
	}, [screenIsFocused]);

	return (
		<Container>
			<Header>
				<StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />

				<BackButton color={theme.colors.shape} />

				<Title>
					Seus agendamentos,{'\n'}
					estão aqui.{'\n'}
				</Title>

				<SubTitle>Conforto, segurança e praticidade.</SubTitle>
			</Header>

			{loading ? (
				<LoadAnimation />
			) : (
				<Content>
					<Appointments>
						<AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
						<AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
					</Appointments>

					<FlatList
						data={cars}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<CarWrapper>
								<Car data={item.car} />
								<CarFooter>
									<CarFooterTitle>PERÍODO</CarFooterTitle>
									<CarFooterPeriod>
										<CarFooterDate>{item.start_date}</CarFooterDate>
										<AntDesign
											name="arrowright"
											size={20}
											color={theme.colors.title}
											style={{
												marginHorizontal: 10,
											}}
										/>
										<CarFooterDate>{item.end_date}</CarFooterDate>
									</CarFooterPeriod>
								</CarFooter>
							</CarWrapper>
						)}
					/>
				</Content>
			)}
		</Container>
	);
}