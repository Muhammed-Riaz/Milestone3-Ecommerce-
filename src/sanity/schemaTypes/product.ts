import { defineType } from "sanity"

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
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
    ]
})