import { defineType } from "sanity";

export const Order = defineType({
  name: 'order',
  type: 'document',
  title: 'Orders',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: "string" // Fixed: No "email" type in Sanity
    },
    {
      name: 'address',
      title: 'Address',
      type: "text", // Fixed: Renamed "adress" to "address"
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: "string", // Fixed: Store phone as a string
    }
  ]
});
