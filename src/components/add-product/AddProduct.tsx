import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT_MUTATION } from '../../graphql/queries/createProduct';

type Props = {};

export default function AddProduct({}: Props) {
    const [form] = Form.useForm();
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = (values: any) => {
    // Execute the mutation when the form is submitted
    createProduct({ variables: { input: values } })
      .then((response) => {
        console.log('Product created:', response.data.createProduct);
        setSuccessMessage('Product created successfully.');
        setErrorMessage(null);
        // Optionally, you can reset the form or navigate to a different page
        form.resetFields();
      })
      .catch((error) => {
        console.error('Error creating product:', error);
        setErrorMessage('Error creating the product. Please try again.');
        setSuccessMessage(null);
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Form
        form={form}
        name="addProductForm"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the product name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please enter the product description' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the product price' }]}
        >
          <Input type="number" step="0.01" />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: 'Please enter the product stock' }]}
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
    </div>
  );
}
