import { 
  useNavigation,
  NavigationProp,
  ParamListBase 
} from "@react-navigation/native";
import { BackButton } from "../../../Components/BackButton";
import { Container, Header } from "./styles";


export function SignUpFirstStep() {
  const {navigate}: NavigationProp<ParamListBase> = useNavigation();

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

    </Container>
  )
}