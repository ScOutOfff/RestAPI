const url = 'http://localhost:8080/api/user/authUser';
const authUserPage = document.getElementById("tableOfUsers");
const authUserNavPanel = document.getElementById("user-header");

function userAuthInfo() {
    fetch(url)
        .then((res) => res.json())
        .then((user) => {

            let temp = '';

            temp += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.rolesAsString}</td> 
            </tr>`;
            authUserPage.innerHTML = temp;
            authUserNavPanel.innerHTML = `<h5>${user.email} with roles: ${user.rolesAsString}</h5>`
        });
}

userAuthInfo();
