import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: products_insert_input!) {
    insert_products_one(object: $input) {
      id
    }
  }
`;
