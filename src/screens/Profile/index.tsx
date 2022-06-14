import { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { useAuth } from '../../hooks/auth';
import { BackButton } from '../../Components/BackButton';
import { Input } from '../../Components/Input';
import { PasswordInput } from '../../Components/PasswordInput';
import { Button } from '../../Components/Button';
import {
	Container,
	Content,
	Options,
	Header,
	HeaderTitle,
	HeaderTop,
	LogoutButton,
	Option,
	OptionTitle,
	Photo,
	PhotoButton,
	PhotoContainer,
	Section,
	OfflineInfo,
} from './styles';

export function Profile() {
	const theme = useTheme();
	const netInfo = useNetInfo();
	const { user, signOut, updateUser } = useAuth();
	const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
	const [avatar, setAvatar] = useState(user.avatar);
	const [name, setName] = useState(user.name);
	const [driverLicense, setDriverLicense] = useState(user.driver_license);

	function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
		if (!netInfo.isConnected && optionSelected === 'passwordEdit') {
			Alert.alert('Conecte-se a internet para alterar a senha');
			return;
		}

		setOption(optionSelected);
	}

	async function handleSelectAvatar() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (result.cancelled) return;

		if (result.uri) {
			setAvatar(result.uri);
		}
	}

	async function handleProfileUpdate() {
		if (!netInfo.isConnected && option === 'passwordEdit') {
			Alert.alert('Conecte-se a internet para alterar a senha');
			return;
		}
		try {
			const schema = yup.object().shape({
				driverLicense: yup.string().required('CNH é obrigatória'),
				name: yup.string().required('Nome é obrigatório'),
			});

			const data = { name, driverLicense };
			await schema.validate(data);
			await updateUser({
				id: user.id,
				user_id: user.user_id,
				email: user.email,
				name,
				driver_license: driverLicense,
				avatar,
				token: user.token,
			});

			Alert.alert('Perfil atualizado!');
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				Alert.alert('Opa', error.message);
			}
			Alert.alert('Não foi possível atualizar o perfil');
		}
	}

	async function handleSignOut() {
		Alert.alert('Tem certeza?', 'Lembre-se, irá precisar de internet para conectar-se novamente', [
			{
				text: 'Cancelar',
				onPress: () => {},
			},
			{
				text: 'Sair',
				onPress: () => signOut(),
			},
		]);
	}

	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<HeaderTop>
							<BackButton color={theme.colors.shape} />
							<HeaderTitle>Editar Perfil</HeaderTitle>
							<LogoutButton onPress={handleSignOut}>
								<Feather name="power" size={24} color={theme.colors.shape} />
							</LogoutButton>
						</HeaderTop>
						<PhotoContainer>
							{!!avatar && <Photo source={{ uri: avatar }} />}
							<PhotoButton onPress={handleSelectAvatar}>
								<Feather name="camera" size={24} color={theme.colors.shape} />
							</PhotoButton>
						</PhotoContainer>
					</Header>

					<Content style={{ marginBottom: useBottomTabBarHeight() }}>
						<Options>
							<Option active={option === 'dataEdit'} onPress={() => handleOptionChange('dataEdit')}>
								<OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
							</Option>

							<Option
								active={option === 'passwordEdit'}
								onPress={() => handleOptionChange('passwordEdit')}>
								<OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
							</Option>
						</Options>

						{option === 'dataEdit' ? (
							<Section>
								<Input
									iconName="user"
									placeholder="Nome"
									autoCorrect={false}
									defaultValue={name}
									onChangeText={setName}
								/>

								<Input
									iconName="mail"
									placeholder="E-mail"
									editable={false}
									defaultValue={user.email}
								/>

								<Input
									iconName="credit-card"
									placeholder="CNH"
									keyboardType="numeric"
									defaultValue={driverLicense}
									onChangeText={setDriverLicense}
								/>
							</Section>
						) : (
							<Section>
								<PasswordInput iconName="lock" placeholder="Senha atual" />

								<PasswordInput iconName="lock" placeholder="Nova senha" />

								<PasswordInput iconName="lock" placeholder="Repetir Senha" />
							</Section>
						)}

						<Button
							title="Salvar alterções"
							onPress={handleProfileUpdate}
							enabled={netInfo.isConnected || (option !== 'passwordEdit' && !netInfo.isConnected)}
						/>

						{!netInfo.isConnected && option === 'passwordEdit' && (
							<OfflineInfo>Conecte-se a internet para alterar a senha</OfflineInfo>
						)}
					</Content>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
