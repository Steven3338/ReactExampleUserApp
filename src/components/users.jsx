import React, { Component } from "react";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import UserTable from "./userTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/Pagination";
import auth from "../services/authServices";

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 4,
    selectedUsers: "all"
  };

  userListGroup = [
    { path: "all", label: "All" },
    { path: "user", label: "User" },
    { path: "userAdmin", label: "User Admin" }
  ];

  async componentDidMount() {
    const promise = await auth.getUserList();
    this.setState({ users: promise.data });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = async user => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter(u => u.id !== user.id);
    this.setState({ users });

    try {
      await auth.deleteUser(user.id);
    } catch (ex) {
      if (ex.response && ex.response === 404)
        toast.error("This has already been removed.");

      this.setState({ originalUsers });
    }
  };

  // this is the List Group
  handleUserSelection = user => {
    this.setState({ selectedUsers: user.path, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.users;
    const {
      users: allUsers,
      currentPage,
      pageSize,
      selectedUsers
    } = this.state;

    if (count === 0) return <p>There are no users in the database.</p>;

    const filtered =
      selectedUsers === "user"
        ? allUsers.filter(u => u.isAdmin !== true)
        : selectedUsers === "userAdmin"
        ? allUsers.filter(u => u.isAdmin === true)
        : allUsers;

    const users = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.userListGroup}
            selectedUsers={selectedUsers}
            onUserSelect={this.handleUserSelection}
          />
        </div>
        <div className="col">
          <p>There are {filtered.length} users in the database.</p>
          <UserTable data={users} onDelete={this.handleDelete} />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Users;
