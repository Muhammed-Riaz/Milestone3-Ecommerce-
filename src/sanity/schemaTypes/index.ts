import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { myproduct } from './commerce'
import { Order } from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,myproduct,Order],
}
