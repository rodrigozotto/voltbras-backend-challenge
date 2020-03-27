module.exports = {
  Query: {
    suitablePlanets: async (_, __, { dataSources }) => {
      return await dataSources.arcsecondAPI.getExoplanets();
    }
  },
  Exoplanet: {
    stations: async (_, __, { dataSources }) => {
      return await dataSources.arcsecondLocalAPI.getInstalledStation(_.name);
    }
  }
};
