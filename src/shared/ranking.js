/**
 * This function get data from localStorage by category name.
 * @param {string} category
 * @return {{ category: string, userData: { username: string, points: number, dateTime: number }[] }}
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
 * @param {number} dateTime
 */
export function addUserToRanking(username, points, category, dateTime) {
  const getRankingData = getRankingByCategory(category);
  getRankingData.userData.push({ username, points, dateTime });
  window.localStorage.setItem(category, JSON.stringify(getRankingData));
  return getRankingData;
}
