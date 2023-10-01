import { gql, useQuery, useSubscription } from "@apollo/client";
import { Space, Spin, Table } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import React from "react";
import { Product } from "../../schema/Product";
import { productsQuery } from "../../graphql/queries/getProducts";
import { totalValueSubscription } from "../../graphql/subscription/totalValueOfProducts";

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
  const { data: totalValueData, loading: totalValueLoading, error: totalValueError } = useSubscription(totalValueSubscription);

  if (loading || totalValueLoading) {
    return (
      <Space size="middle">
        <Spin />
      </Space>
    );
  }
  
  if (error || totalValueError) {
    return <div>Error: {(error?.message || totalValueError?.message)}</div>;
  }
  
  const products = data?.products as Product[];
  const totalValue = totalValueData?.products_aggregate?.aggregate?.sum?.price;
  
  if (!products || totalValue === undefined) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="table-container">
      <h2 className="table-header">Product List</h2>
      <p>Total value of the products: <Statistic value={totalValue} precision={2} /></p>
      <Table columns={columns} dataSource={products}/>
    </div>
  );
}
