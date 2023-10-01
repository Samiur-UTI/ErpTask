import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    name
    description
    price
    stock
  }
}
`;