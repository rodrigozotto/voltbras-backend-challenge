const db = require("./prisma/generated/prisma-client");

module.exports = {
  Query: {
    // podemos omitir o {} e o return quando a função é só um return
    // dá uma olhada:
    suitablePlanets: async (_, __, { dataSources }) =>
      await dataSources.arcsecondAPI.getExoplanets(dataSources),

    // o padrão de colocar os parametros como _ significa que você não vai
    // usar essas variáveis
    // achei estranho que foi utilizado esse padrão e a variável foi utilizada
    // acho que poderiamos dar um nome mais descritivo
    installedStations: async (_, args, { dataSources }) =>
      await dataSources.arcsecondLocalAPI.getInstalledStations(args.name),
  },  
  Mutation: {
    // mesma coisa sobre o padrão de __
    // e podemos desestruturar os args
    installStation: async (_, { planetName }) =>
      await db.prisma.createStation({ planetName })
  }
};
