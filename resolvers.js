const db = require("./prisma/generated/prisma-client");

module.exports = {
  Query: {
    suitablePlanets: async (_, __, { dataSources }) =>await dataSources.arcsecondAPI.getExoplanets(dataSources),
    installedStations: async (_, args, { dataSources }) =>
      await dataSources.stationService.getInstalledStations(args.name),
  },  
  Mutation: {
    installStation: async (_, { planetName }) =>
      await db.prisma.createStation({ planetName }),
    removeStation: async (_, { planetName }) => {
      await db.prisma.deleteManyStations({ planetName: planetName });
    }
  }
};
