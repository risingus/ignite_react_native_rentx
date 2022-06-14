import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { StatusBar } from 'react-native';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';
import Logo from '../../assets/logo.svg';
import { Car as ModelCar } from '../../database/model/Car';
import { Car } from '../../Components/Car';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { LoadAnimation } from '../../Components/LoadAnimation';

export function Home() {
	const { navigate }: NavigationProp<ParamListBase> = useNavigation();
	const netInfo = useNetInfo();
	const [cars, setCars] = useState<ModelCar[]>([]);
	const [loading, setLoading] = useState(true);

	function handleCarDetails(car: ModelCar) {
		navigate('CarDetails', { car });
	}

	async function offlineSynchronize() {
		await synchronize({
			database,
			pullChanges: async ({ lastPulledAt }) => {
				const { data } = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

				const { changes, latestVersion } = data;
				return { changes, timestamp: latestVersion };
			},
			pushChanges: async ({ changes }) => {
				const user = changes.users;
				await api.post('/users/sync', user);
			},
		});
	}

	useEffect(() => {
		if (netInfo.isConnected) {
			offlineSynchronize();
		}
	}, [netInfo.isConnected]);

	useEffect(() => {
		let isMounted = true;

		async function fetchCars() {
			try {
				const carCollection = database.get<ModelCar>('cars');
				const cars = await carCollection.query().fetch();
				if (isMounted) {
					setCars(cars);
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}

		fetchCars();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<Container>
			<StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent />

			<Header>
				<HeaderContent>
					<Logo width={RFValue(108)} height={RFValue(12)} />

					{!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
				</HeaderContent>
			</Header>

			{loading ? (
				<LoadAnimation />
			) : (
				<CarList
					data={cars}
					renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
					keyExtractor={(item) => item.id}
				/>
			)}
		</Container>
	);
}
