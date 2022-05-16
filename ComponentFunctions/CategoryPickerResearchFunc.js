export const sectionTitle = (
  index,
  ticker,
  currentPathLength,
  selectedItems
) => {
  let newCategoryTile = ticker + " Categories";
  //let currentPathLength = currentPath.length;
  if (currentPathLength >= 2 && index > 0) {
    let selectedCategory = selectedItems[index - 1];
    newCategoryTile = selectedCategory.category + " subcategories";
    //   console.log(selectedCategory.category);
  }
  return newCategoryTile;
};
