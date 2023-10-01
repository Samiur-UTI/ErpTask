import { gql, useQuery } from "@apollo/client";
import { Space, Spin, Table } from "antd";
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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title:"Stock",
    dataIndex:'stock',
    key:'stock'
  }
];

export function Products(): JSX.Element {
  const { data, loading, error } = useQuery(productsQuery);

  if (loading) {
    return (
      <Space size="middle">
        <Spin />
      </Space>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products = data.products;

  return (
    <div className="table-container">
      <h2 className="table-header">Product List</h2>
      <Table columns={columns} dataSource={products}/>
    </div>
  );
}
