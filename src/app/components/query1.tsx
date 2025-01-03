import { client } from '@/sanity/lib/client'

export interface EType {
  image: { asset: { _ref: string } },
  title?: string,
  slug: { current: string },
  _id?: string,
  price: number,
}

export type ShoppingCartProduct = {
  id: string;
  sku: string;  // Add sku field here
  name: string;
  price: number; // Price in cents.
  currency: string;
  image: string;
  description: string;
};


export async function Ecommerce1(): Promise<ShoppingCartProduct[]> {
  const queryGroq = `
    *[_type == "product"]
    {
      image,
      title,
      slug,
      _id,
      price
    }
  `;

  try {
    const getData: EType[] = await client.fetch(queryGroq);

    // Transform the products into ShoppingCartProduct format
    const transformedProducts: ShoppingCartProduct[] = getData.map((prod) => {
      const transformedProduct: ShoppingCartProduct = {
        id: prod?._id || "default-id",
        sku: prod?._id || "default-id",  // Use id as sku if no separate sku field is available
        name: prod?.slug.current || "Untitled Product",
        price: prod?.price || 0,
        currency: "USD",
        image: prod?.image?.asset?._ref || "/default-image.jpg",
        description: prod?.title || "No description provided.",
      };
      console.log(transformedProduct);
      
      return transformedProduct;
    });

    return transformedProducts; // Return the array of transformed products
  } catch (error) {
    console.log("Invalid data", error);
    return []; // Return an empty array on error
  }
}

export default Ecommerce1;
