export default {
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Dish Name",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      name: "short_description",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.max(200)
    },
    {
      name: "price",
      title: "Dish Price in GBP",
      type: "number"
    },
    {
      name: "image",
      title: "Dish Image",
      type: "image"
    }
  ]
}
