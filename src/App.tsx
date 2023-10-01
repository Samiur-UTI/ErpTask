import React from "react";
import "./App.css";
import { Layout, Typography } from "antd";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
  from,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WebSocketLink } from "@apollo/client/link/ws"; // Import WebSocketLink
import { getMainDefinition } from "@apollo/client/utilities";
import { Products } from "./components/products/Products";
import Navbar from "./components/navbar/Navbar";
import AddProduct from "./components/add-product/AddProduct";

const { Content } = Layout;

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/v1/graphql",
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:8080/v1/graphql`,
    options: {
      reconnect: true,
    },
  });

  // A terminating link so that it can switch between HTTP and WebSocket based on the operation type
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const authMiddleware = new ApolloLink((operation, forward) => {
    // Auth logic can be added if needed here
    return forward(operation);
  });

  // If multiple middlewares are required 'from' can be used to apply them accordingly
  const client = new ApolloClient({
    link: from([authMiddleware, link]),
    cache: new InMemoryCache(),
  });

  return client;
};

function App() {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Router>
        <div className="App">
          <Layout style={{ height: "100vh" }}>
            <Navbar />
            <Content style={{ padding: "1em" }}>
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
              </Routes>
            </Content>
          </Layout>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
