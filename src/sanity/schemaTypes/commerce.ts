import { defineType } from "sanity";

export const Product =  defineType({
  name: "product", // Unique name for the schema
  title: "Product", // Display title
  type: "document", // Document type
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier for the product",
   
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      description: "Main image of the product",
      options: {
        hotspot: true, // Enable hotspot for image cropping
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    
    },
  ],
});

