/**
 * This function get data from localStorage by category name.
 * @param {string} category
 * @return {{ category: string, userData: { username: string, points: number }[] }}
 */
export function getRankingByCategory(category) {
  const rankingStorage = JSON.parse(localStorage.getItem(category));
  if (rankingStorage == null) {
    return { category, userData: [] };
  }
  return rankingStorage;
}
/**
 * This function add user to ranking in localStorage. Function doesn't support user unique name checker.
 * @param {string} username
 * @param {number} points
 * @param {string} category
 */
export function addUserToRanking(username, points, category) {
  const getRankingData = getRankingByCategory(category);
  getRankingData.userData.push({ username, points });
  window.localStorage.setItem(category, JSON.stringify(getRankingData));
  return getRankingData;
}
