import { View, Text, TouchableOpacity, Image } from "react-native"
import Currency from "react-currency-formatter"
import { useState } from "react"
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux"
import { addToBasket, removeFromBasket, selectBasketItemsById, selectItems } from "../slices/basketSlice"

const DishRow = ({
    id,
    name,
    description,
    price,
    imgUrl
}) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => selectBasketItemsById(state, id));
    const [isPressed, setIsPressed] = useState(false);

    const addItemToBasket = () => {
        dispatch(addToBasket({
            id,
            name,
            description,
            price,
            imgUrl
        }))
    }

    const removeItemFromBasket = () => {
        if (!items.length > 0) return

        dispatch(removeFromBasket({ id }));
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setIsPressed(!isPressed)}
                className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}
            >
                <View className="flex-row items-center">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400 mt-2">
                            <Currency quantity={price} currency="GBP" />
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={{ uri: imgUrl }}
                            className="h-20 w-20 bg-gray-300 p-4 rounded-md"
                            style={{ borderWidth: 1, borderColor: "#f3f3f4" }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {isPressed && (
                <View className="bg-white px-4">
                    <View className="flex-row items-center space-x-2 pb-3">
                        <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                            <MinusCircleIcon color={items.length > 0 ? "#00CCBB" : "gray"} size={40} />
                        </TouchableOpacity>
                        <Text>{items.length}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon color="#00CCBB" size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

export default DishRow