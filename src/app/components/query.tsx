import { client } from '@/sanity/lib/client'

export interface EType {
  
    image: { asset: { _ref:string} },
    title: string,       
    slug: { current: string, },
    _id: string,
    price:number,
}


export async function Ecommerce() :Promise<EType[]> {

const queryGroq = `
*[_type == "product"]
{
  image,
    title,
    slug,
    _id,
    price
}
`
try {
  const getData:EType[] =await client.fetch(queryGroq)
  
return getData
} catch (error) {
  console.log("Invalid data" , error);
  return []
}
}

export default Ecommerce


