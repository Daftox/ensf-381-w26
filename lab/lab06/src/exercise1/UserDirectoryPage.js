import Controls from "./Controls";
import sampleUsers from "./sampleUsers";
import UserList from "./UserList";

import { useState, useEffect, createContext } from "react";

function UserDirectoryPage() {
  // TODO: add users, sortBy, and viewMode state in this component.
  // TODO: fetch the initial users with useEffect.
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [viewMode, setViewMode] = useState("grid");

  function fetchData() {
    // Set loading to true while data is being fetched
    //setIsLoading(true);
    // Fetch data from an API using .then()
    fetch("https://69a1e4e82e82ee536fa28264.mockapi.io/users_api")
      .then((response) => response.json())
      .then((users) => {
        /*data.forEach(element => {
            users.push(element);
        });*/
        setUsers(users);
        console.log("Users array", users);
        //render(users);
      })
      .catch((error) => {
        // Handle error if the request was not successful
        console.error("Failed to fetch data:", error.message);
      })
      .finally(() => {
        // Set loading to false once data fetching is complete
        // setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleDeleteClick(userId) {
    const deleteData = async (id) => {
      const url = `https://69a1e4e82e82ee536fa28264.mockapi.io/users_api/${id}`;
      try {
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
          console.log("Item deleted successfully on API.");
        } else {
          console.error("Failed to delete item. Status:", response.status);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    console.log("Deleting user with id", userId);

    if (!users.some((u) => u.id == userId)) {
      console.log("Error: ID not found");
      return;
    }

    deleteData(userId);
    const usersWithoutDeleted = users.filter((user) => user.id != userId);
    setUsers(usersWithoutDeleted);
  }

  function handleSortByGroupClick() {
    console.log("Sorting users by user_group");
    const sortedUsers = [...users].sort((a, b) => {
      if (a.user_group < b.user_group) return -1;
      if (a.user_group > b.user_group) return 1;
      return 0;
    });
    setUsers(sortedUsers);
    setSortBy("user_group");
  }

  function handleSortByIdClick() {
    console.log("Sorting users by id");
    const sortedUsers = [...users].sort((a, b) => {
      return Number(a.id) - Number(b.id);
    });
    setUsers(sortedUsers);
    setSortBy("id");
  }
  function handleViewToggleClick() {
    console.log("TODO: switch between grid and list layouts");
    setViewMode(viewMode === "grid" ? "list" : "grid");
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>
      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onDeleteClick={handleDeleteClick}
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
        />
      </section>
      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
