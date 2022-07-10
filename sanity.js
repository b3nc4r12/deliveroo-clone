import createClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { SANITY_PROJECT_ID } from "@env"

const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: true
})

const builder = imageUrlBuilder(client);
export const getImageUrl = (src) => builder.image(src);

export default client