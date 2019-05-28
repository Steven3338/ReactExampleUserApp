import React from "react";
// the underscore _ in the import statement is a common reference to lodash
// because it is an optimized version of a JavaScript library called underscore
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  // the Math.ceil method comes into play with a floating point, in the event
  // the value returned is a decimal, this method will return the first integer
  // greater than or equal to the value
  // this is important for methods like the below where a conditional operator
  // checks to see of the value is equal to 1; if the devision operation returned
  // 0.9 for instance, that value would be converted to 1
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  // need an array a page numbers; [1 ... pagesCount].map()
  // + 1 is required because this method will not include the number itself
  const pages = _.range(1, pagesCount + 1);

  // a way to create an array of numbers without using the lodash library
  //   let pages = [];
  //   for (let i = 0; i < pagesCount; i++) pages.push(i);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              onClick={() => onPageChange(page)}
              className="page-link"
              href="#"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// here we define the type of our object and if they are required or not
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
