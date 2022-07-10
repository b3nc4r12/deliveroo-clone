import { SafeAreaView } from "react-native"
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectRestaurant } from "../slices/restaurantSlice"

const PreparingOrderScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    useEffect(() => {
        setTimeout(() => navigation.navigate("Delivery"), 4000)
    }, [])

    return (
        <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
            <Animatable.Image
                source={require("../assets/loading.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="h-80 w-80"
            />
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-lg my-10 text-white font-bold text-center px-4"
            >
                Waiting for {restaurant.title} to accept your order...
            </Animatable.Text>
            <Progress.Circle size={60} indeterminate={true} color="white" />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen