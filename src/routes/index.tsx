import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LoadAnimation } from '../Components/LoadAnimation';
import { useAuth } from '../hooks/auth';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
	const { user, loading } = useAuth();

	if (loading) {
		return <LoadAnimation />;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer>{user?.token ? <AppTabRoutes /> : <AuthRoutes />}</NavigationContainer>
		</GestureHandlerRootView>
	);
}
