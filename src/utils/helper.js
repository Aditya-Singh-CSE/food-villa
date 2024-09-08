export function filterData(searchText, items, keyPath) {
    const searchLowerCase = searchText.toLowerCase();
    const filteredData = items.filter(item => {
      const valueAtPath = keyPath.reduce((accumulator, currentValue) => accumulator?.[currentValue], item);
      return valueAtPath?.toLowerCase().includes(searchLowerCase);
    });
    return filteredData;
  }