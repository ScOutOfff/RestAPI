let url = 'http://localhost:8080/api/admin/users';
const urlAuthUser = 'http://localhost:8080/api/admin/authUser';
const data = document.getElementById("tableUserBody");
const panel = document.getElementById("admin-header");

function userAuthInfo() {
    fetch(urlAuthUser)
        .then((res) => res.json())
        .then((user) => {

            let temp = '';

            temp += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => " " + role.role.substring(5))}</td> 
            </tr>`;
            data.innerHTML = temp;
            panel.innerHTML = `<h5>${user.name} with roles: ${user.roles.map(role => " " + role.role.substring(5))}</h5>`
        });
}

userAuthInfo();


$(document).ready(function () {
    getUsers();
})

function getUsers() {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (users) {
            let placeholder = document.getElementById('tableOfUsers');
            let out = "";
            for (let user of users) {
                out += '<tr>';
                out += '<td>' + user.id + '</td>';
                out += '<td>' + user.name + '</td>';
                out += '<td>' + user.lastName + '</td>';
                out += '<td>' + user.age + '</td>';
                out += '<td>' + user.email + '</td>';
                out += '<td>' + user.rolesAsString + '</td>';

                out += '<td><button type="button" class="btn btn-info" data-toggle="modal"' +
                    'data-target="#modalEditWindow" style="color:white"' +
                    'onclick="getEditModal(' + user.id + ')">' + 'Edit' +
                    '</button></td>' +
                    '<td>';
                out += '<button type="button" class="btn btn-danger" data-toggle="modal" ' +
                    'onclick="getDeleteModal(' + user.id + ')">' +
                    'Delete' +
                    '</button>' +
                    '</td>';
                out += '</tr>';
            }
            placeholder.innerHTML = out;
        });
}


// async function startHtml() {
//     const res = await fetch(url);
//     const users = await res.json();
//     // console.log(users);
//
//     users.forEach(user => getUsersInHtmlTable(user));
// }
//
//
// window.addEventListener('DOMContentLoaded', startHtml);

// function getUsersInHtmlTable(user) {
//     const tableOfUsers = document.getElementById('tableOfUsers');
//
//     tableOfUsers.insertAdjacentHTML('beforebegin', '' +
//         '<td>' + user.id + '</td>' +
//         '<td>' + user.name + '</td>' +
//         '<td>' + user.lastName + '</td>' +
//         '<td>' + user.age + '</td>' +
//         '<td>' + user.email + '</td>' +
//         '<td>' + user.rolesAsString + '</td>' +
//         '<td><button type="button" class="btn btn-info" data-toggle="modal"' +
//         'data-target="#modalEditWindow" style="color:white"' +
//         'onclick="getEditModal(' + user.id + ')">' + 'Edit' +
//         '</button></td>' +
//         '<td>\n' +
//         '<button type="button" class="btn btn-danger" data-toggle="modal" ' +
//         'onclick="getDeleteModal(' + user.id + ')">' +
//         'Delete' +
//         '</button>' +
//         '</td>'
//     )
// }

function getEditModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json()
            .then(userEdit => {
                document.getElementById('edit_id').value = userEdit.id;
                document.getElementById('edit_name').value = userEdit.name;
                document.getElementById('edit_lastName').value = userEdit.lastName;
                document.getElementById('edit_age').value = userEdit.age;
                document.getElementById('edit_email').value = userEdit.email;
                document.getElementById('edit_password').value = userEdit.password;
                document.getElementById('edit_role').value = userEdit.roles;


                const select = document.querySelector('#edit_role').getElementsByTagName('option');

                for (let i = 0; i < userEdit.roles.length; i++) {
                    if (userEdit.roles[i].name === 'ROLE_' + select[0].value) { //Checking for role USER
                        select[0].selected = true;
                        console.log('USER');//TODO delete
                    }
                    if (userEdit.roles[i].name === 'ROLE_' + select[1].value) { //Checking for role ADMIN
                        select[1].selected = true;
                        console.log('ADMIN');//TODO delete
                    }
                }
                console.log('Go next')//TODO delete

            })
    });
}

function editUser() {
    let id = document.getElementById('edit_id');
    let name = document.getElementById('edit_name');
    let lastName = document.getElementById('edit_lastName');
    let age = document.getElementById('edit_age');
    let email = document.getElementById('edit_email');
    let password = document.getElementById('edit_password');
    let roles = document.getElementById('edit_role');
    console.log(roles);//TODO delete

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].value === 'ADMIN') {
            roles[i] = {
                'id': 2,
                'role': 'ROLE_ADMIN',
                "authority": "ROLE_ADMIN"
            }
        }
        if (roles[i].value === 'USER') {
            roles[i] = {
                'id': 1,
                'role': 'ROLE_USER',
                "authority": "ROLE_USER"
            }
        }
    }

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'id': id,
            'name': name,
            'lastName': lastName,
            'age': age,
            'email': email,
            'password': password,
            'roles': roles
        })
    })
        .then(() => {
            $('editModalWindow').modal('hide');
            getUsers();
        })
}

function getDeleteModal(id) {

    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then(res => {
            res.json().then(userDelete => {
                document.getElementById('idDeleteUser').value = userDelete.id;
                document.getElementById('deleteName').value = userDelete.name;
                document.getElementById('deleteLastName').value = userDelete.lastName;
                document.getElementById('deleteAge').value = userDelete.age;
                document.getElementById('deleteEmail').value = userDelete.email;
                document.getElementById('deleteRoles').value = userDelete.roles;
            })
        })
}

function deleteUser() {
    let id = document.getElementById('idDeleteUser').value;
    fetch(url + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then(() => {
            $('#deleteModal').modal('hide');
            getUsers();
        })
}

function addUser() {
    let name = document.getElementById('newUserName').value;
    let lastName = document.getElementById('newUserLastName').value;
    let age = document.getElementById('newUserAge').value;
    let email = document.getElementById('newUserEmail').value;
    let password = document.getElementById('newUserPassword').value;
    let roles = $("#rolesNew").val()

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'name': name,
            'lastName': lastName,
            'age': age,
            'email': email,
            'password': password,
            'roles': roles
        })
    })
        .then(() => {
            document.getElementById('nav-users_table-tab').click()
            getUsers()
            document.newUserForm.reset()
        })
}