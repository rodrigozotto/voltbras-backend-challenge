const db = require("./prisma/generated/prisma-client");

module.exports = {
  Query: {
    suitablePlanets: async (_, __, { dataSources }) => {
      return await dataSources.arcsecondAPI.getExoplanets(dataSources);
    },
    installedstations: async (_, __, { dataSources }) => {
      return await dataSources.arcsecondLocalAPI.getInstalledExoplanet(__.name);
    },
  },  
  Mutation: {
    installStation: async (_, __) => {
      return db.prisma.createExoplanet({
        name: __.name,
        hasStation: __.hasStation
      })
    }
  }
};
