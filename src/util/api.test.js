import * as API from './api';

/**
 * @param {string} url
 * @returns {Promise<{ok: boolean, status: number, json: () => Promise<any>}>}
 */
const fetchMock = async (url) => {
  switch (url) {
    case 'https://rickandmortyapi.com/api/character?page=1': {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          info: { count: 1, pages: 1, next: null, prev: null },
          results: [
            {
              id: 1,
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
              location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
                'https://rickandmortyapi.com/api/episode/3',
                'https://rickandmortyapi.com/api/episode/4',
                'https://rickandmortyapi.com/api/episode/5',
                'https://rickandmortyapi.com/api/episode/6',
                'https://rickandmortyapi.com/api/episode/7',
                'https://rickandmortyapi.com/api/episode/8',
                'https://rickandmortyapi.com/api/episode/9',
                'https://rickandmortyapi.com/api/episode/10',
                'https://rickandmortyapi.com/api/episode/11',
                'https://rickandmortyapi.com/api/episode/12',
                'https://rickandmortyapi.com/api/episode/13',
                'https://rickandmortyapi.com/api/episode/14',
                'https://rickandmortyapi.com/api/episode/15',
                'https://rickandmortyapi.com/api/episode/16',
                'https://rickandmortyapi.com/api/episode/17',
                'https://rickandmortyapi.com/api/episode/18',
                'https://rickandmortyapi.com/api/episode/19',
                'https://rickandmortyapi.com/api/episode/20',
                'https://rickandmortyapi.com/api/episode/21',
                'https://rickandmortyapi.com/api/episode/22',
                'https://rickandmortyapi.com/api/episode/23',
                'https://rickandmortyapi.com/api/episode/24',
                'https://rickandmortyapi.com/api/episode/25',
                'https://rickandmortyapi.com/api/episode/26',
                'https://rickandmortyapi.com/api/episode/27',
                'https://rickandmortyapi.com/api/episode/28',
                'https://rickandmortyapi.com/api/episode/29',
                'https://rickandmortyapi.com/api/episode/30',
                'https://rickandmortyapi.com/api/episode/31',
                'https://rickandmortyapi.com/api/episode/32',
                'https://rickandmortyapi.com/api/episode/33',
                'https://rickandmortyapi.com/api/episode/34',
                'https://rickandmortyapi.com/api/episode/35',
                'https://rickandmortyapi.com/api/episode/36',
                'https://rickandmortyapi.com/api/episode/37',
                'https://rickandmortyapi.com/api/episode/38',
                'https://rickandmortyapi.com/api/episode/39',
                'https://rickandmortyapi.com/api/episode/40',
                'https://rickandmortyapi.com/api/episode/41',
                'https://rickandmortyapi.com/api/episode/42',
                'https://rickandmortyapi.com/api/episode/43',
                'https://rickandmortyapi.com/api/episode/44',
                'https://rickandmortyapi.com/api/episode/45',
                'https://rickandmortyapi.com/api/episode/46',
                'https://rickandmortyapi.com/api/episode/47',
                'https://rickandmortyapi.com/api/episode/48',
                'https://rickandmortyapi.com/api/episode/49',
                'https://rickandmortyapi.com/api/episode/50',
                'https://rickandmortyapi.com/api/episode/51',
              ],
              url: 'https://rickandmortyapi.com/api/character/1',
              created: '2017-11-04T18:48:46.250Z',
            },
          ],
        }),
      };
    }
    case 'https://rickandmortyapi.com/api/location?page=1': {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          info: { count: 1, pages: 1, next: null, prev: null },
          results: [
            {
              id: 1,
              name: 'Earth (C-137)',
              type: 'Planet',
              dimension: 'Dimension C-137',
              residents: [
                'https://rickandmortyapi.com/api/character/38',
                'https://rickandmortyapi.com/api/character/45',
                'https://rickandmortyapi.com/api/character/71',
                'https://rickandmortyapi.com/api/character/82',
                'https://rickandmortyapi.com/api/character/83',
                'https://rickandmortyapi.com/api/character/92',
                'https://rickandmortyapi.com/api/character/112',
                'https://rickandmortyapi.com/api/character/114',
                'https://rickandmortyapi.com/api/character/116',
                'https://rickandmortyapi.com/api/character/117',
                'https://rickandmortyapi.com/api/character/120',
                'https://rickandmortyapi.com/api/character/127',
                'https://rickandmortyapi.com/api/character/155',
                'https://rickandmortyapi.com/api/character/169',
                'https://rickandmortyapi.com/api/character/175',
                'https://rickandmortyapi.com/api/character/179',
                'https://rickandmortyapi.com/api/character/186',
                'https://rickandmortyapi.com/api/character/201',
                'https://rickandmortyapi.com/api/character/216',
                'https://rickandmortyapi.com/api/character/239',
                'https://rickandmortyapi.com/api/character/271',
                'https://rickandmortyapi.com/api/character/302',
                'https://rickandmortyapi.com/api/character/303',
                'https://rickandmortyapi.com/api/character/338',
                'https://rickandmortyapi.com/api/character/343',
                'https://rickandmortyapi.com/api/character/356',
                'https://rickandmortyapi.com/api/character/394',
              ],
              url: 'https://rickandmortyapi.com/api/location/1',
              created: '2017-11-10T12:42:04.162Z',
            },
          ],
        }),
      };
    }
    case 'https://rickandmortyapi.com/api/episode?page=1': {
      return {
        ok: false,
        status: 404,
        json: async () => ({ error: 'There is nothing here' }),
      };
    }
    case 'https://rickandmortyapi.com/api/character/20': {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          id: 20,
          name: 'Ants in my Eyes Johnson',
          status: 'unknown',
          species: 'Human',
          type: 'Human with ants in his eyes',
          gender: 'Male',
          origin: { name: 'unknown', url: '' },
          location: { name: 'Interdimensional Cable', url: 'https://rickandmortyapi.com/api/location/6' },
          image: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/8'],
          url: 'https://rickandmortyapi.com/api/character/20',
          created: '2017-11-04T22:34:53.659Z',
        }),
      };
    }
    case 'https://rickandmortyapi.com/api/location/5': {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          id: 5,
          name: 'Anatomy Park',
          type: 'Microverse',
          dimension: 'Dimension C-137',
          residents: [
            'https://rickandmortyapi.com/api/character/12',
            'https://rickandmortyapi.com/api/character/17',
            'https://rickandmortyapi.com/api/character/96',
            'https://rickandmortyapi.com/api/character/97',
            'https://rickandmortyapi.com/api/character/98',
            'https://rickandmortyapi.com/api/character/99',
            'https://rickandmortyapi.com/api/character/100',
            'https://rickandmortyapi.com/api/character/101',
            'https://rickandmortyapi.com/api/character/108',
            'https://rickandmortyapi.com/api/character/268',
            'https://rickandmortyapi.com/api/character/300',
          ],
          url: 'https://rickandmortyapi.com/api/location/5',
          created: '2017-11-10T13:08:46.060Z',
        }),
      };
    }
    case 'https://rickandmortyapi.com/api/episode/200': {
      return {
        ok: false,
        status: 404,
        json: async () => ({ error: 'Episode not found' }),
      };
    }
    default: {
      throw new Error(`Unmocked API endpoint: ${url}`);
    }
  }
};

describe('API fetching tests', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
  });

  afterEach(() => {
    // @ts-ignore
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('fetches all characters', async () => {
    // Given
    const pageCount = 1;

    // When
    const characterData = await API.fetchCharacters(pageCount);

    // Then
    expect(characterData).toHaveLength(1);
    expect(characterData[0].name).toBe('Rick Sanchez');
  });

  it('fetches all locations', async () => {
    // Given
    const pageCount = 1;

    // When
    const locationData = await API.fetchLocations(pageCount);

    // Then
    expect(locationData).toHaveLength(1);
    expect(locationData[0].name).toBe('Earth (C-137)');
  });

  it('fetches all episodes and ignores empty pages', async () => {
    // Given
    const pageCount = 1;

    // When
    const episodeData = await API.fetchEpisodes(pageCount);

    // Then
    expect(episodeData).toHaveLength(0);
  });

  it('fetches a character given an id', async () => {
    // Given
    const id = 20;

    // When
    const characterData = await API.fetchCharacterWithId(id);

    // Then
    expect(characterData.name).toBe('Ants in my Eyes Johnson');
  });

  it('fetches a location given an id', async () => {
    // Given
    const id = 5;

    // When
    const locationData = await API.fetchLocationWithId(id);

    // Then
    expect(locationData.name).toBe('Anatomy Park');
  });

  it('fetches an episode given an id and returns null for non-existent resource', async () => {
    // Given
    const id = 200;

    // When
    const episodeData = await API.fetchEpisodeWithId(id);

    // Then
    expect(episodeData).toBeNull();
  });
});
