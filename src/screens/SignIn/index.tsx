import { useState } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { 
  useNavigation,
  NavigationProp,
  ParamListBase
} from "@react-navigation/native";
import * as yup from 'yup';
import { useTheme } from "styled-components";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { PasswordInput } from "../../Components/PasswordInput";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
} from "./styles";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const theme = useTheme()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {navigate}: NavigationProp<ParamListBase> = useNavigation();
  const {signIn} = useAuth();

  async function handleSignIn() {

    try {
      const schema = yup.object().shape({
        password: yup
          .string()
          .required('A senha é obrigatória'),
        email: yup
          .string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      })
  
      await schema.validate({email, password})
      signIn({email, password});

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }

      return Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais'
      )
    }

  }

  function handleNewAccount() {
    navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos{'\n'}quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light
              color={theme.colors.background_secondary}
            />
          </Footer>

        </Container>

      </TouchableWithoutFeedback>
      

    </KeyboardAvoidingView>

  )
}