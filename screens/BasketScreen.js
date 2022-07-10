import { useNavigation } from "@react-navigation/native"
import { useMemo } from "react"
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native"
import { XCircleIcon } from "react-native-heroicons/solid"
import { useDispatch, useSelector } from "react-redux"
import { getImageUrl } from "../sanity"
import { removeFromBasket, selectBasketTotal, selectItems } from "../slices/basketSlice"
import { selectRestaurant } from "../slices/restaurantSlice"
import Currency from "react-currency-formatter"

const BasketScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectItems);
    const subtotal = useSelector(selectBasketTotal);

    const groupedItems = useMemo(() => {
        return items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item)
            return results
        }, {})
    }, [items])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color="#00CCBB" size={50} />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image
                        source={{ uri: "https://links.papareact.com/wru" }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <Text className="flex-1">Deliver in 30-45 mins</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00CCBB]">Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className="divide-y divide-gray-200">
                    {Object.entries(groupedItems).map(([key, items]) => (
                        <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                            <Text className="text-[#00CCBB]">{items.length} x</Text>
                            <Image
                                source={{ uri: getImageUrl(items[0]?.imgUrl).url() }}
                                className="h-12 w-12 rounded-full"
                            />
                            <Text className="flex-1">{items[0]?.name}</Text>
                            <Text className="text-gray-600">
                                <Currency quantity={items[0]?.price} currency="GBP" />
                            </Text>
                            <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                                <Text className="text-[#00CCBB] text-xs">Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <View className="p-5 bg-white mt-5 space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={subtotal} currency="GBP" />
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Delivery Fee</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={1.99} currency="GBP" />
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Order Total</Text>
                        <Text className="font-extrabold">
                            <Currency quantity={subtotal + 1.99} currency="GBP" />
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("PreparingOrder")} className="rounded-lg bg-[#00CCBB] p-4">
                        <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen