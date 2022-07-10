import { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import client, { getImageUrl } from "../sanity"
import CategoryCard from "./CategoryCard"

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "category"] | order(_createdAt asc)`).then((data) => setCategories(data))
    }, [])

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingTop: 10,
                paddingHorizontal: 15
            }}
        >
            {categories?.map((category) => (
                <CategoryCard
                    key={category._id}
                    id={category._id}
                    title={category.name}
                    imgUrl={getImageUrl(category.image).width(200).url()}
                />
            ))}
        </ScrollView>
    )
}

export default Categories