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
              name: 'Rick Sanchez',
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
              name: 'Earth (C-137)',
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
          name: 'Ants in my Eyes Johnson',
        }),
      };
    }
    case 'https://rickandmortyapi.com/api/location/5': {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          name: 'Anatomy Park',
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
