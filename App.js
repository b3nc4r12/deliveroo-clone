import { StatusBar } from "expo-status-bar"
import { TailwindProvider } from "tailwindcss-react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen"
import RestaurantScreen from "./screens/RestaurantScreen"
import { Provider } from "react-redux"
import { store } from "./store"
import BasketScreen from "./screens/BasketScreen"
import PreparingOrderScreen from "./screens/PreparingOrderScreen"
import DeliveryScreen from "./screens/DeliveryScreen"
import { StripeProvider } from "@stripe/stripe-react-native"
import { STRIPE_PUBLIC_KEY } from "@env"

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
      <Provider store={store}>
        <NavigationContainer>
          <TailwindProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Restaurant" component={RestaurantScreen} />
              <Stack.Screen
                name="Basket"
                component={BasketScreen}
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="PreparingOrder"
                component={PreparingOrderScreen}
                options={{ presentation: "fullScreenModal" }}
              />
              <Stack.Screen
                name="Delivery"
                component={DeliveryScreen}
                options={{ presentation: "fullScreenModal" }}
              />
            </Stack.Navigator>
          </TailwindProvider>
          <StatusBar style="dark" />
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  )
}

export default App