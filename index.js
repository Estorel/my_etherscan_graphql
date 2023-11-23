const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

// Import ApolloServer and graphql-import
// Load schema and datasource


require("dotenv").config();
const resolvers = {
    // Get ether balance by address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Get total supply of ether
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Get latest ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Get block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
},
};
// Create Apollo server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0
server.timeout = 0;
// Start server on port 9000
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


