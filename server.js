const { ApolloServer, gql } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");
const path = require("path");
const resolvers = require("./resolvers");

const typeDefs = gql`
  type Exoplanet {
    name: String
    mass: Mass
    stations: [Station]
  }

  type Mass {
    value: Float
    unit: String
  }

  type Station {
    name: String
    hasStation: String
  }

  type Query {
    suitablePlanets: [Exoplanet]
  }

  type Mutation {
    installStation(name: String!): Exoplanet
  }
`;

// const resolvers = {
//   Query: {
//     suitablePlanets : async (_, __, { dataSources }) => {
//       return await dataSources.arcsecondAPI.getExoplanets()
//     }
//   }
// }

class ArcsecondLocalAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:44347/api/";
  }

  async installStation(exploplanet) {
    return this.post(
      "installedstations", // path
      exploplanet // request body
    );
  }

  async getInstalledStation(name) {
      const data = await this.get(`installedstations/${name}`);
      return data;
  }
}

class ArcsecondAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.arcsecond.io/";
  }

  async getExoplanets() {
    const data = await this.get("exoplanets");
    return data.results.filter(f => f.mass && f.mass.value >= 25);
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      arcsecondAPI: new ArcsecondAPI(),
      arcsecondLocalAPI: new ArcsecondLocalAPI()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

//server.start(() => console.log("Server is running on http://localhost:4000"))

/*
const { GraphQLServer } = require("graphql-yoga")
const path = require("path")
const resolvers = require("./resolvers")

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, "schema.graphql"),
  resolvers
})

server.start(() => console.log("Server is running on http://localhost:4000"))

*/
