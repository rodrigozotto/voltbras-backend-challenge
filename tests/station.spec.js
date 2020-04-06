const axios = require('axios');

test('Query suitablePlanets', async () => {
    const response = await axios.post('http://localhost:4000/graphql', {
    query: `
    query {
        suitablePlanets {
        name
        mass
        hasStation
        }
    }
    `,
    });

    const { data } = response;
    expect(data).not.toBeNull();
});

test('Mutation installStation', async () => {
    const response = await axios.post('http://localhost:4000/graphql', {
    query: `
    mutation{
        installStation(planetName: "2M1207 A") {
          id
          planetName
        }
      }
    `,
    });

    const { data } = response;
    expect(data).not.toContain('2M1207 A');
});

test('Mutation removeStation', async () => {
    const response = await axios.post('http://localhost:4000/graphql', {
    query: `
    mutation{
        removeStation(planetName: "2M1207 A") {
          id
          planetName
        }
      }
    `,
    });

    const { data } = response;
    expect(response.status).toBe(200);
});

