const dbContext = require("./../prisma/generated/prisma-client");

class StationService {

    StationService (context) {
        dbContext = context;
    }

    async isStationInstalled(planetName) {
        return await dbContext.prisma.$exists.station({ planetName });
    }

    async getInstalledStations() {
        return await dbContext.prisma.stations();
    }
}

module.exports = StationService  