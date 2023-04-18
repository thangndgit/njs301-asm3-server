// Function to group an array to an object by one specified attribute
const groupBy = (arr, attr, keepAttr = true) => {
  // Create group object by reduce input array
  return arr.reduce((resObj, obj) => {
    // Get field to group
    const field = obj[attr];
    // Remove filed from obj (option)
    if (!keepAttr) delete obj[attr];

    // If this field have not been existed yet
    if (!resObj[field]) resObj[field] = [obj];
    // If this field have been existed yet
    else resObj[field].push(obj);

    // Return reduced object
    return resObj;
  }, {});
};

exports.groupBy = groupBy;
