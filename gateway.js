// --- Gateway ---
const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "users", url: "http://localhost:4001" },
    { name: "products", url: "http://localhost:4002" },
  ],
});

const gatewayServer = new ApolloServer({
  gateway,
  subscriptions: false,
});

gatewayServer.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});
