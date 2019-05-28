import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const {
      items,
      textProperty,
      valueProperty,
      onUserSelect,
      selectedUsers
    } = this.props;

    return (
      <ul className="list-group">
        {items.map(item => (
          <li
            className={
              selectedUsers === item.path
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item[valueProperty]}
            onClick={() => onUserSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "label",
  valueProperty: "path"
};

export default ListGroup;
