import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { myproduct } from './commerce'
import  Order  from './order'
import review  from './review'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,myproduct,Order,review],
}
