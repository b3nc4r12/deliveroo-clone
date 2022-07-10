export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Restaurant Name",
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
      name: "image",
      title: "Restaurant Image",
      type: "image"
    },
    {
      name: "lat",
      title: "Restaurant Latitude",
      type: "number"
    },
    {
      name: "long",
      title: "Restaurant Longitude",
      type: "number"
    },
    {
      name: "address",
      title: "Restaurant Address (street + street number)",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      name: "extended_address",
      title: "Restaurant Address (extended - city, state/province, country)",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      name: "rating",
      title: "Enter a Rating (1-5)",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Rating must be between 1 and 5")
    },
    {
      name: "type",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required()
    },
    {
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dish" }] }]
    }
  ]
}