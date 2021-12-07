/**
 * @jest-environment jsdom
 */

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
              episode: ['https://rickandmortyapi.com/api/episode/1'],
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
              residents: ['https://rickandmortyapi.com/api/character/38'],
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
          residents: ['https://rickandmortyapi.com/api/character/12'],
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
