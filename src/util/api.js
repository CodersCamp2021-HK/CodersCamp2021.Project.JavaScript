import _ from 'lodash';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * @typedef {'/character' | '/location' | '/episode'} ApiEndpoint
 */

/**
 * @typedef {{
 *  id: number,
 *  name: string,
 *  url: string,
 *  created: string,
 * }} ApiEntry
 */

/**
 * @typedef {ApiEntry & {
 *   status: 'Alive' | 'Dead' | 'unknown',
 *   species: string,
 *   type: string,
 *   gender: 'Female' | 'Male' | 'Genderless' | 'unknown',
 *   origin: { name: string, url: string },
 *   location: { name: string, url: string },
 *   image: string,
 *   episode: string[],
 * }} ApiCharacter
 */

/**
 * @typedef {ApiEntry & {
 *  type: string,
 *  dimension: string,
 *  residents: string[],
 * }} ApiLocation
 */

/**
 * @typedef {ApiEntry & {
 *  air_date: string,
 *  episode: string,
 *  characters: string[],
 * }} ApiEpisode
 */

/**
 * @param {string} url
 * @returns {Promise<any>}
 */
const cachedJSONFetch = (url) => fetch(url, { cache: 'force-cache' }).then((resp) => resp.json());

/**
 * @param {ApiEndpoint} endpoint
 * @param {number} pageCount
 * @returns {Promise<any[]>}
 */
const fetchResourceList = async (endpoint, pageCount) => {
  const urls = _.range(1, 1 + pageCount).map((i) => `${API_BASE_URL + endpoint}?page=${i}`);

  const pages = await Promise.all(urls.map(cachedJSONFetch));

  return pages.flatMap((page) => {
    if (page.error) {
      return [];
    }
    return page.results;
  });
};

/**
 * @param {ApiEndpoint} endpoint
 * @param {number} id
 * @returns {Promise<any?>}
 */
const fetchResourceWithId = async (endpoint, id) => {
  const url = `${API_BASE_URL + endpoint}/${id}`;

  const data = await cachedJSONFetch(url);

  if (data.error) {
    return null;
  }

  return data;
};

/**
 * @param {number} pageCount
 * @returns {Promise<ApiCharacter[]>}
 */
export const fetchCharacters = (pageCount = 1) => fetchResourceList('/character', pageCount);

/**
 * @param {number} pageCount
 * @returns {Promise<ApiLocation[]>}
 */
export const fetchLocations = (pageCount = 1) => fetchResourceList('/location', pageCount);

/**
 * @param {number} pageCount
 * @returns {Promise<ApiEpisode[]>}
 */
export const fetchEpisodes = (pageCount = 1) => fetchResourceList('/episode', pageCount);

/**
 * @param {number} id
 * @returns {Promise<ApiCharacter?>}
 */
export const fetchCharacterWithId = (id) => fetchResourceWithId('/character', id);

/**
 * @param {number} id
 * @returns {Promise<ApiLocation?>}
 */
export const fetchLocationWithId = (id) => fetchResourceWithId('/location', id);

/**
 * @param {number} id
 * @returns {Promise<ApiEpisode?>}
 */
export const fetchEpisodeWithId = (id) => fetchResourceWithId('/episode', id);
