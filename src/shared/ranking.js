/**
 * This function get data from localStorage by category name.
 * @param {string} category
 * @return {{ category: string, userData: { username: string, points: number, id: number }[] }}
 */
export function getRankingByCategory(category) {
  const rankingStorage = JSON.parse(localStorage.getItem(category));
  return rankingStorage ?? { category, userData: [] };
}
/**
 * This function add user to ranking in localStorage. Function doesn't support user unique name checker.
 * @param {string} username
 * @param {number} points
 * @param {string} category
 * @param {number} id as a Date.now()
 */
export function addUserToRanking(username, points, category, id) {
  const getRankingData = getRankingByCategory(category);
  getRankingData.userData.push({ username, points, id });
  window.localStorage.setItem(category, JSON.stringify(getRankingData));
  return getRankingData;
}
