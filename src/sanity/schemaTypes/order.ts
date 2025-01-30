export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "id", type: "string" },
        { name: "name", type: "string" },
        { name: "price", type: "number" },
        { name: "quantity", type: "number" },
        { name: "image", type: "string" }
      ] }]
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "Completed" },
          { title: "Pending", value: "Pending" },
          { title: "Cancelled", value: "Cancelled" },
        ],
        layout: "radio", // This will give you radio buttons in the Sanity Studio
      },
    },
  ],
};
