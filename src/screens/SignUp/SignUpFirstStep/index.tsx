import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import * as yup from 'yup';
import { BackButton } from "../../../Components/BackButton";
import { Bullet } from "../../../Components/Bullet";
import { Button } from "../../../Components/Button";
import { Input } from "../../../Components/Input";
import { Container, Form, FormTitle, Header, Steps, SubTitle, Title } from "./styles";

export function SignUpFirstStep() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  async function handleNextStep() {
    try {
      const schema = yup.object().shape({
        driverLicense: yup
          .string()
          .required('CNH é obrigatória'),
          email: yup
            .string()
            .email('E-mail inválido')
            .required('E-mail é obrigatório'),
        name: yup
          .string()
          .required('Nome é obrigatório'),
      });

      const data = {name, email, driverLicense};
      await schema.validate(data);
      navigate('SignUpSecondStep', {user: data});
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      }
    }
    
  }

  return (
      <KeyboardAvoidingView behavior='position' enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <BackButton />
              <Steps>
                <Bullet active />
                <Bullet />
              </Steps>
            </Header>

            <Title>Crie sua{"\n"}conta</Title>
            <SubTitle>
              Faça seu cadastro de{"\n"}
              forma rápida e fácil
            </SubTitle>

            <Form>
              <FormTitle>1. Dados</FormTitle>

              <Input
                onChangeText={setName}
                value={name}
                iconName="user"
                placeholder="Nome"
              />

              <Input
                onChangeText={setEmail}
                value={email}
                iconName="mail"
                placeholder="Email"
                keyboardType="email-address"
              />

              <Input
                onChangeText={setDriverLicense}
                value={driverLicense}
                iconName="credit-card" 
                placeholder="CNH"
                keyboardType="numeric"
              />
            </Form>

            <Button title="Próximo" onPress={handleNextStep} />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}
