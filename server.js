const { ApolloServer, gql } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");
const resolvers = require("./resolvers");
const db = require("./prisma/generated/prisma-client");

const typeDefs = gql`
  type Exoplanet {
    name: String
    mass: Float
    hasStation: Boolean
  }

  type InstalledExoplanet {
    name: String
    hasStation: String
  }

  type Query {
    suitablePlanets: [Exoplanet]
    installedstations(searchName: String): [Exoplanet]
  }

  type Mutation {
    installStation(name: String!, hasStation: Boolean!): Exoplanet
  }
`;

class ArcsecondLocalAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async installExoplanet(exoplanet) {
    return db.prisma.createExoplanet({
      name: exoplanet.name,
      hasStation: exoplanet.hasStation
    });
  }

  async getInstalledExoplanet(name) {
    return await db.prisma.exoplanets({
      where: {
        name_contains: name       
      }
    });
  }
}

class ArcsecondAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.arcsecond.io/";
  }

  async getExoplanets(dataSources) {
    var data = await this.get("exoplanets");
    var result = data.results.filter(f => f.mass && f.mass.value >= 25);

    const promises = result.map(async (item, idx) => {
        item.mass = item.mass.value;
        var installed = await dataSources.arcsecondLocalAPI.getInstalledExoplanet(item.name);
        if(installed[0])
          item.hasStation = installed[0].hasStation;
        else
          item.hasStation = false;
    });

    await Promise.all(promises);    

    return result;
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
  },
  context: db
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});