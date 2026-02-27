const userGrid = document.getElementById("userGrid");
const viewToggleBtn = document.getElementById("viewToggleBtn");
const deleteIdInput = document.getElementById("deleteIdInput");
const deleteBtn = document.getElementById("deleteBtn");
const sortByGroupBtn = document.getElementById("sortByGroupBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");

const users = new Array();

async function retrieveData() {
    console.log("test")
    try {
        const response = await fetch(
        "https://69a1e4e82e82ee536fa28264.mockapi.io/users_api",
        );
        const data = await response.json();
        data.forEach(element => {
            users.push(element);
        });
        console.log("Users array", users);
        render(users);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

retrieveData();

function render(users){
    if(users.length > 0){
        userGrid.textContent = "";
        users.forEach(user => {
            userGrid.insertAdjacentHTML('beforeend',
                `<article class="user-card">
                <h3>${user.first_name ?? ""}</h3>
                <p>first_name: ${user.first_name ?? ""}</p>
                <p>user_group: ${user.user_group ?? ""}</p>
                <p>id: ${user.id ?? ""}</p>
                </article>
                `
                )
        });
    }
}

viewToggleBtn.addEventListener('click', ()=>{
    if(userGrid.classList.contains('grid-view')){
        userGrid.classList.remove('grid-view')
        userGrid.classList.add('list-view')
    } else if(userGrid.classList.contains('list-view')){
        userGrid.classList.remove('list-view')
        userGrid.classList.add('grid-view')
    }
})

sortByGroupBtn.addEventListener('click', ()=>{
    users.sort((a, b) => {
        return a.user_group < b.user_group? -1: 1;
    })
    console.log(users)
    render(users);
})

sortByIdBtn.addEventListener('click', ()=>{
        users.sort((a, b) => {
        return Number(a.id) < Number(b.id)? -1: 1;
    })
    console.log(users)
    render(users);
})

deleteBtn.addEventListener('click', ()=>{

    id = deleteIdInput.value

    var foundId = false;
    for (let index = 0; index < users.length; index++) {
        if(users[index].id == id){
            foundId = true;
            deleteData(id)
            users.splice(index, 1)
        };
    }
    if(!foundId){
        console.log("Error: ID not found")
    };
    render(users);
})

const deleteData = async (id) => {
  const url = `https://69a1e4e82e82ee536fa28264.mockapi.io/users_api/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Item deleted successfully.');
    } else {
      console.error('Failed to delete item. Status:', response.status);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};