import { gql } from "@apollo/client";

export const totalValueSubscription = gql`
subscription TotalValueSubscription {
  products_aggregate {
    aggregate {
      sum {
        price
      }
    }
  }
}
`;