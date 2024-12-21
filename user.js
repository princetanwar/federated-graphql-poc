// A basic PoC for Federated GraphQL

// --- Service 1: Users Service ---
const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
  }

  type Query {
    getUser(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    getUser: (_, { id }) => ({ id, name: `User ${id} from user service` }),
  },
  User: {
    __resolveReference: (user) => ({ id: user.id, name: `User ${user.id}` }),
  },
};

const userServer = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

userServer.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Users service ready at ${url}`);
});
