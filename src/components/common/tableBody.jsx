import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    // checks if column.content exists or is truthy
    // if it exists, in this case it returns a React Element
    if (column.content) return column.content(item);

    // shorthand for else
    //using lodash pass our object "item" and then the target property that can be nested "column.path"

    return _.get(item, column.path);

    // the below code would also work for my simplier object, that does not have additional nesting
    // <td>{item[column.path]}</td>
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {/* render the td dynamically, based on the number of columns, so this table should know about the number of columns */}
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
