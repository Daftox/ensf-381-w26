import users from "./users";

function RenderUserList() {
  return (
    <div>
      {users.map((user) => (
        <article>
          <h3>{user.first_name}</h3>
          <p>User Group: {user.user_group}</p>
          <p>ID: {user.id}</p>
        </article>
      ))}
    </div>
  );
}

export default RenderUserList;
