import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { myproduct } from './commerce'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,myproduct],
}
