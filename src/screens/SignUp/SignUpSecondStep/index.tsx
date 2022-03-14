import { 
  useNavigation,
  NavigationProp,
  ParamListBase,
  useRoute
} from "@react-navigation/native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useTheme } from "styled-components";
import { BackButton } from "../../../Components/BackButton";
import { Bullet } from "../../../Components/Bullet";
import { Button } from "../../../Components/Button";
import { PasswordInput } from "../../../Components/PasswordInput";
import { api } from "../../../services/api";
import { Container, Form, FormTitle, Header, Steps, SubTitle, Title } from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const {user} = route.params as Params;
  const theme = useTheme();

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação')
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais')
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    })
    .then(() => {
      navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`
      })
    })
    .catch(() => {
      Alert.alert('Opa', 'Não foi possível cadastrar');
    });
  }

  return (
      <KeyboardAvoidingView behavior='position' enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <BackButton />
              <Steps>
                <Bullet />
                <Bullet active />
              </Steps>
            </Header>

            <Title>Crie sua{"\n"}conta</Title>
            <SubTitle>
              Faça seu cadastro de{"\n"}
              forma rápida e fácil
            </SubTitle>

            <Form>
              <FormTitle>2. Senha</FormTitle>
              <PasswordInput  
                iconName="lock"
                placeholder="Senha"
                onChangeText={setPassword}
                value={password}
              />
              <PasswordInput
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
                iconName="lock"
                placeholder="Repetir Senha"
              />
            </Form>

            <Button
              onPress={handleRegister}
              title="Cadastrar"
              color={theme.colors.success}
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}
