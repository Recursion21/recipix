//Maps the tags object of type [{tag: name}, ...] to array of strings [name, ...]
export const mapTagsObjectToArray = (tags) => {
  return tags.map((item) => item.tag);
};

export const mapArrayToTagsObject = (array) => {
  return array.map((item) => ({
    tag: item,
  }));
};

export const mapToCategories = (data) => {
  // console.log({ data });
  if (!!data) {
    return data.map((entry) => {
      return {
        label: titleCase(entry.category),
        value: entry.category,
      };
    });
  }
};

export const mapToOptions = (data) => {
  // console.log({ data });
  if (!!data) {
    return data.map((entry) => {
      return {
        label: entry.category,
        options: entry.ingredients.map((ingredient) => {
          return { value: ingredient.name, label: titleCase(ingredient.name) };
        }),
      };
    });
  }
};

export const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};
