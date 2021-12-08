/**
 * This function get data from localStorage by category name.
 * @param {string} category
 * Function return [{username: string, points: number}]
 */
export function getRankingByCategory(category) {
  try {
    const rankingStorage = window.localStorage.getItem(category);
    return rankingStorage;
  } catch (error) {
    return false;
  }
}
/**
 * This function add user to ranking in localStorage. Function doesn't support user unique name checker.
 * @param {string} username
 * @param {number} points
 * @param {string} category
 */
export function addUserToRanking(username, points, category) {
  const rankingStorage = getRankingByCategory(category);
  if (!rankingStorage) {
    const createRankingCategory = {
      category,
      userData: [{ username, points }],
    };
    window.localStorage.setItem(category, JSON.stringify(createRankingCategory));
    return createRankingCategory;
  }
  const getRankingData = JSON.parse(rankingStorage);
  getRankingData.userData.push({ username, points });
  window.localStorage.setItem(category, JSON.stringify(getRankingData));
  return getRankingData;
}
