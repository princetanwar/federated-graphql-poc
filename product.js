const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

// --- Service 2: Products Service ---
const productTypeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    name: String!
    price: Float!
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    purchasedProducts: [Product]
  }

  type Query {
    getProduct(id: ID!): Product
  }
`;

const productResolvers = {
  Query: {
    getProduct: (_, { id }) => ({ id, name: `Product ${id}`, price: 100.0 }),
  },
  User: {
    purchasedProducts: (user) => {
      console.log({ user });
      return [
        { id: "1", name: "Product 1", price: 100.0 },
        { id: "2", name: "Product 2", price: 150.0 },
      ];
    },
  },
};

const productServer = new ApolloServer({
  schema: buildFederatedSchema([
    { typeDefs: productTypeDefs, resolvers: productResolvers },
  ]),
});

productServer.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Products service ready at ${url}`);
});
