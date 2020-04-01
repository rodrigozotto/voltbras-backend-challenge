const { ApolloServer, gql } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");
const resolvers = require("./resolvers");
const db = require("./prisma/generated/prisma-client");

// esse typeDefs poderia estar num arquivo pra deixar
// o server.js mais enxuto
const typeDefs = gql`
  """
  podemos usar o ! para significar que o campo é obrigatório
  daí deixar quem consome mais seguro que o campo não vai vir null :)
  """
  type Exoplanet {
    name: String!
    mass: Float!
    hasStation: Boolean!
  }

  type Station {
    id: String!
    planetName: String!
  }

  type Query {
    suitablePlanets: [Exoplanet]
    """
    de novo, installedStations, deveria retornar uma array
    de estações, não de planetas
    """
    installedStations(searchName: String): [Station]
  }

  type Mutation {
    installStation(planetName: String!): Station
  }
`;

// acredito que a mesma coisa com o 
// ArcsecondLocalAPI e ArcsecondAPI também

// conceitualmente o ArcsecondLocalAPI não teria
// nada a ver com uma API Rest, certo?
// poderíamos tirar esse extends então, porque se não
// me dá a entender que essa classe é uma RESTDataSource, e que seus dados vem atravez de uma API Rest
// ---
// também como essa classe tem objetivo apenas de instalar uma estação num planeta
// poderiamos renomear ela pra algo que talvez faça mais sentido, tipo
// StationInstaller, ou StationService, ou algo nesse sentido
class StationService {
  // quando o constructor é só chamar o super(), podemos omitir

  // de novo, acho que a gente tá interessado em se a Station tá instalada num
  // planeta ou não, então sinto que o prisma não precisaria guardar todos esses dados
  // (de um planeta)
  async installStation(exoplanet) {
    return db.prisma.createStation({
      planetName: exoplanet.name,
    });
  }

  // só precisamos saber se a estação está instalada no planeta
  async isStationInstalled(planetName) {
    // se usarmos o $exists do prisma, podemos pegar exatamente isso
    // se a estação existe/está instalada no planeta
    return await db.prisma.$exists.station({ planetName });
  }

  async getInstalledStations() {
    return await db.prisma.stations();
  }
}

class ArcsecondAPI extends RESTDataSource {
  // no node.js versão 12, poderíamos remover esse construtor e fazer apenas:
  // baseURL = 'https://api.arcsecond.io/';
  constructor() {
    super();
    this.baseURL = "https://api.arcsecond.io/";
  }

  async getExoplanets(dataSources) {
    var data = await this.get("exoplanets");
    // gostei desse filter aqui :)
    // só renomearia o argumento da arrow function pra algo mais descritivo
    var suitablePlanets = data.results.filter(planet => planet.mass && planet.mass.value >= 25);

    // const promises = suitablePlanets.map(async (planet) /*podemos remover esse idx, e deixamos mais claro oq é o item*/ => {
    //     // esse código ficou um pouco confuso, se a gente adotar a mudança feita em ArcsecondLocalAPI
    //     // poderíamos deixar mais claro
    //     planet.mass = planet.mass.value;
    //     planet.hasStation = await dataSources.arcsecondLocalAPI.isStationInstalled(planet.name);
    // });

    // em vez de mutar os planetas da array,
    // podemos pegar um pouco de programação funcional, e tentar não
    // mutar os elementos individuais da array, e sim retornar uma array nova
    return await Promise.all(
      suitablePlanets
        .map(async (planet) => ({
          name: planet.name,
          mass: planet.mass.value,
          hasStation: await dataSources.arcsecondLocalAPI.isStationInstalled(planet.name)
        }))
    );
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      arcsecondAPI: new ArcsecondAPI(),
      arcsecondLocalAPI: new StationService()
    };
  },
  context: db
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});