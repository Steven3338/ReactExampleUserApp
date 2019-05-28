import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // convert our item to a lodash object in order to chain the methods together
  // value converts our lodash array back into an array
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
  // lodash goes to the startIndex and takes all of the items for the current page
  //_.slice(items, startIndex)
  //_.take()
}
