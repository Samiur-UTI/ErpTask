import { gql } from "@apollo/client";

export const productsQuery = gql`
query ProductsQuery {
  products {
    id
    name
    description
    price
    stock
  }
}
`;