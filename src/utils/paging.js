// Function for paging list data
const paging = (items, pageNumber, pageSize) => {
  // Calculate first and last index of output array
  const indexFirst = pageNumber * pageSize - pageSize;
  const indexLast = pageNumber * pageSize;

  // Split array
  const pagedItems = items.slice(indexFirst, indexLast);

  // Create paged object
  const paged = {
    page_number: pageNumber,
    page_size: pageSize,
    page_count: Math.ceil(items.length / pageSize),
    item_count: items.length,
    items: pagedItems,
  };

  // Return paged object
  return paged;
};

module.exports = paging;
