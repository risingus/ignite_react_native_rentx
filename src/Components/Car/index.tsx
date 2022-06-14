import { useNetInfo } from '@react-native-community/netinfo';
import {
	About,
	Brand,
	CarImage,
	Container,
	Details,
	Name,
	Period,
	Price,
	Rent,
	Type,
} from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Car as ModelCar } from '../../database/model/Car';
import { getAccessoryImg } from '../../utils/getAccessoryIcons';

interface CarProps extends RectButtonProps {
	data: ModelCar;
}

export function Car({
	data: { brand, name, period, price, thumbnail, fuel_type },
	...rest
}: CarProps) {
	const MotorIcon = getAccessoryImg(fuel_type);
	const netInfo = useNetInfo();
	return (
		<Container {...rest}>
			<Details>
				<Brand>{brand}</Brand>
				<Name>{name}</Name>

				<About>
					<Rent>
						<Period>{period}</Period>
						<Price>{`R$ ${netInfo.isConnected === true ? price : '...'}`}</Price>
					</Rent>

					<Type>
						<MotorIcon />
					</Type>
				</About>
			</Details>

			<CarImage source={{ uri: thumbnail }} resizeMode="contain" />
		</Container>
	);
}
