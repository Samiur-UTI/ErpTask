import { gql, useQuery } from "@apollo/client";
import { Space, Spin } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import React from "react";

const productsQuery = gql`
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

export function Products(): JSX.Element {
  const { data, loading, error } = useQuery(productsQuery);

  if (loading) {
    return (
      <Space size="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </Space>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products = data.products;

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(
            (product: {
              id: React.Key | null | undefined;
              name:
                | string
                | number
                | null
                | undefined;
              description:
                | string
                | number
                | null
                | undefined;
              price:
                | string
                | number
                | null
                | undefined;
              stock:
                | string
                | number
                | null
                | undefined;
            }) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
