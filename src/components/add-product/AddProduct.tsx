import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT_MUTATION } from "../../graphql/mutations/createProduct";
import { Layout, Space } from "antd";
type Props = {};

const { Header, Footer, Sider, Content } = Layout;

export default function AddProduct({}: Props) {
  const [form] = Form.useForm();
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = (values: any) => {
    createProduct({ variables: { input: values } })
      .then((response) => {
        console.log("Product created:", response.data.createProduct);
        setSuccessMessage("Product created successfully.");
        setErrorMessage(null);
        form.resetFields();
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        setErrorMessage("Error creating the product. Please try again.");
        setSuccessMessage(null);
        // Clear error message after 5 seconds
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  return (
    <div>
      <div>
        <h2>Add Product</h2>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>

      <Content
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Form
          style={{ width: "50%", paddingTop: "1.5rem" }}
          form={form}
          name="addProductForm"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the product description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the product price" },
            ]}
          >
            <Input type="number" step="1" />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              { required: true, message: "Please enter the product stock" },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          {/* Add more form fields as needed */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </div>
  );
}
