import { useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import { ArrowLeftIcon, StarIcon, ChevronRightIcon, LocationMarkerIcon } from "react-native-heroicons/solid"
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline"
import DishRow from "../components/DishRow"
import { getImageUrl } from "../sanity"
import BasketIcon from "../components/BasketIcon"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setRestaurant } from "../slices/restaurantSlice"

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {
        params: {
            id,
            title,
            imgUrl,
            rating,
            genre,
            address,
            extended_address,
            short_description,
            dishes,
            long,
            lat
        }
    } = useRoute();

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            title,
            imgUrl,
            rating,
            genre,
            address,
            extended_address,
            short_description,
            dishes,
            long,
            lat
        }))
    }, [])

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View>
                    <Image
                        source={{ uri: imgUrl }}
                        className="h-56 w-full bg-gray-300 p-4"
                    />
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
                    >
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className="-mt-5 bg-white rounded-t-3xl">
                    <View className="px-4 pt-4">
                        <Text className="text-3xl font-bold">{title}</Text>
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <StarIcon color="green" opacity={0.5} size={22} />
                                <Text className="text-xs text-gray-500">
                                    <Text className="text-green-500">{rating}</Text> • {genre}
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
                                <Text className="text-xs text-gray-500">Nearby • {address}</Text>
                            </View>
                        </View>
                        <Text numberOfLines={2} className="text-gray-500 mt-2 pb-4">{short_description}</Text>
                    </View>
                    <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                        <QuestionMarkCircleIcon size={20} color="gray" opacity={0.6} />
                        <Text className="pl-2 flex-1 text-md font-bold">Have a food allergy?</Text>
                        <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className="pb-36">
                    <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
                    {/* DishRows */}
                    {dishes?.map((dish) => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            imgUrl={getImageUrl(dish.image).url()}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen