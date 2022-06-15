// handle table pagination
export function handlePagination(paging, sorter, setFilterConditions) {
  let sortKey = "orderBy";
  let currentKey = "orderByDesc";
  if (sorter.order === "descend") {
    sortKey = "orderByDesc";
    currentKey = "orderBy";
  } else {
    sortKey = "orderBy";
    currentKey = "orderByDesc";
  }
  setFilterConditions((oldState) => ({
    ...oldState,
    pageIndex: paging.current,
    pageSize: paging.pageSize,
    [sortKey]: sorter.order ? sorter.field : undefined,
    [currentKey]: undefined,
  }));
}

//get array of selected rows from a table
export function getSelectedRowKeys(dataSource) {
  const arr = [];
  dataSource.map((item) => {
    if (item.isSelected) {
      arr.push(item.id);
    }
    return null;
  });
  return arr;
}

// remove falsy key-value pair from an obj
export const removeUndefinedAttribute = (obj) => {
  const params = {};
  Object.keys(obj).map((key) => {
    if (obj[key]) {
      params[key] = obj[key];
    }
    return {};
  });
  return params;
};

// convert string of queryParams (retrieved from url bar) into object of queryParams
export const parseParams = (querystring) => {
  const params = new URLSearchParams(querystring);
  const obj = {};
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      if (params.get(key) !== "undefined") obj[key] = params.getAll(key);
    } else {
      if (params.get(key) !== "undefined") obj[key] = params.get(key);
    }
  }

  return obj;
};

// convert object of queryParams into string of queryParams
// Ex: {
//   searchTerm: 'abc',
//   startDate: '15/06/2022',
//   endDate: '20/06/2022'
// } will be converted into searchTerm=abc&startDate=15/06/2022&endDate=20/06/2022
export function buildQueryString(object) {
  if (typeof object !== "object") return "";
  const args = [];
  for (const key in object) {
    destructure(key, object[key]);
  }
  return args.join("&");

  function destructure(key, value) {
    if (key && (value || value === false || value === 0)) {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          destructure(key + "[" + i + "]", value[i]);
        }
      } else if (toString(value) === "[object Object]") {
        for (const i in value) {
          destructure(key + "[" + i + "]", value[i]);
        }
      } else
        args.push(
          encodeURIComponent(key) +
            (value != null && value !== "" && value !== undefined
              ? "=" + encodeURIComponent(value)
              : "")
        );
    }
  }
}
