import { FileAddOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

type Props = {}

const items: MenuProps['items'] = [
    {
      label: 'Home',
      key: 'mail',
      icon: <HomeOutlined />,
    },
    {
      label: "Add Product",
      key: 'alipay',
    },
  ];

// eslint-disable-next-line no-empty-pattern
export default function Navbar({}: Props) {
    return (<Menu style={{display:"flex", justifyContent:"flexStart"}} mode="horizontal">
    <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="add-product" icon={<FileAddOutlined />}>
        <Link to="/add-product">Add Product</Link>
    </Menu.Item>
</Menu>)
}