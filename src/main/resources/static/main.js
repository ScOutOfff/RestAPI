let url = 'http://localhost:8080/api/admin/users';
const urlAuthUser = 'http://localhost:8080/api/admin/authUser';
const authUserPage = document.getElementById("tableUserBody");
const authUserNavPanel = document.getElementById("admin-header");

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
            <td>${user.rolesAsString}</td> 
            </tr>`;
            authUserPage.innerHTML = temp;
            authUserNavPanel.innerHTML = `<h5>${user.email} with roles: ${user.rolesAsString}</h5>`
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
                    ' data-target="#editModalWindow" style="color:white"' +
                    ' onclick="getEditModal(' + user.id + ')">' + 'Edit' +
                    '</button></td>' +
                    '<td>';
                out += '<button type="button" class="btn btn-danger" data-toggle="modal" ' +
                    ' data-target="#deleteUserModal" style="color:white"' +
                    ' onclick="getDeleteModal(' + user.id + ')">' +
                    'Delete' + '</button>' +
                    '</td>';
                out += '</tr>';
            }
            placeholder.innerHTML = out;
        });
}

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
    event.preventDefault();
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
            $('#editModalWindow').modal('hide');
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

                const select = document.querySelector('#deleteRoles').getElementsByTagName('option');

                for (let i = 0; i < userDelete.roles.length; i++) {
                    if (userDelete.roles[i].name === 'ROLE_' + select[0].value) { //Checking for role USER
                        select[0].selected = true;
                        console.log('USER');//TODO delete
                    }
                    if (userDelete.roles[i].name === 'ROLE_' + select[1].value) { //Checking for role ADMIN
                        select[1].selected = true;
                        console.log('ADMIN');//TODO delete
                    }
                }
                console.log('Go next')//TODO delete
            })
        })
}

function deleteUser() {
    event.preventDefault();
    let id = document.getElementById('idDeleteUser').value;
    fetch(url + '/' + id + '/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': '`application/json;`charset=UTF-8'
        }
    })
        .then(() => {
            $('#deleteUserModal').modal('hide');
            getUsers();
        })
}

function addUser() {
    event.preventDefault();
    let name = document.getElementById('newUserName').value;
    let lastName = document.getElementById('newUserLastName').value;
    let age = document.getElementById('newUserAge').value;
    let email = document.getElementById('newUserEmail').value;
    let password = document.getElementById('newUserPassword').value;
    let roles = $("#rolesNew").val()

    console.log(roles)

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
            document.getElementById('home-tab').click()
            getUsers()
            document.newUserForm.reset()
        })
}