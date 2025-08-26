/**
 * Checks if a sidebar item is active based on the current pathname
 * @param {Object} item - The sidebar item to check
 * @param {string} pathname - The current pathname from useLocation().pathname
 * @returns {boolean} - Whether the item is active
 */
export const isItemActive = (item, pathname) => {
  if (item.path && pathname.includes(item.path)) {
    return true;
  }
  
  if (item.children) {
    return item.children.some(child => child.path && pathname.includes(child.path));
  }
  
  return false;
}; 