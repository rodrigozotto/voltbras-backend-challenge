const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema.graphql");
const resolvers = require("./resolvers");
const ArcsecondAPI = require("./lib/ArcsecondAPI");
const StationService = require("./lib/StationService");
const context = require("./prisma/generated/prisma-client");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      arcsecondAPI: new ArcsecondAPI(),
      stationService: new StationService(context)
    };
  },
  context: context
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
