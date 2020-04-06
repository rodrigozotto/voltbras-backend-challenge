const { RESTDataSource } = require("apollo-datasource-rest");

class ArcsecondAPI extends RESTDataSource {
    // Zotto: Estava utilizando a versao 10 do node no meu Ubuntu, atualizei para v13.12.0
    baseURL = 'https://api.arcsecond.io/';
    
    async getExoplanets(dataSources) {
      var data = await this.get("exoplanets");
      // gostei desse filter aqui :)
      // só renomearia o argumento da arrow function pra algo mais descritivo
      // Zotto: Nao ficou claro como deixaria mais descritivo.    
      var suitablePlanets = data.results.filter(planet => planet.mass && planet.mass.value >= 25);
  
      return await Promise.all(
        suitablePlanets
          .map(async (planet) => ({
            name: planet.name,
            mass: planet.mass.value,
            hasStation: await dataSources.stationService.isStationInstalled(planet.name)
          }))
      );
    }
  }

  module.exports = ArcsecondAPI