import { View, Text, ScrollView } from "react-native"
import { ArrowRightIcon } from "react-native-heroicons/outline"
import { useEffect, useState } from "react"
import client, { getImageUrl } from "../sanity"
import RestaurantCard from "./RestaurantCard"

const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        client.fetch(`
            *[_type == "featured" && _id == $id] {
                ...,
                restaurants[]-> {
                    ...,
                    dishes[]->,
                    type-> {
                        name
                    }
                }
            }[0]
        `, { id }).then((data) => setRestaurants(data?.restaurants))
    }, [id])

    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>
            <Text className="text-xs text-gray-500 px-4">{description}</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                className="pt-4"
            >
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        title={restaurant.name}
                        imgUrl={getImageUrl(restaurant.image).url()}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        extended_address={restaurant.extended_address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default FeaturedRow