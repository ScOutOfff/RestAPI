// const data = document.getElementById("tableUserBody");
// const url = 'http://localhost:8080/api/admin/users';
// const panel = document.getElementById("admin-header");
//
// function getUsers() {
//     fetch(url).then(function (response) {
//         response.json()
//             .then(function (data) { //TODO should be deleted
//                 console.log('data', data)
//             })
//     })
//         .then(function (users) {
//             let placeholder = document.getElementById('data_output'); //TODO
//             let out = "";
//             for (let user of users) {
//                 out += '<tr>';
//                 out += '<td>' + user.id + '</td>';
//                 out += '<td>' + user.name + '</td>';
//                 out += '<td>' + user.lastName + '</td>';
//                 out += '<td>' + user.age + '</td>';
//                 out += '<td>' + user.email + '</td>';
//
//                 let i, role = "";
//                 for (i in user.roles) {
//                     if (user.roles[i].role === "ROLE_USER") {
//                         role = "USER";
//                     } else if (user.roles[i].role === "ROLE_ADMIN") {
//                         role = "ADMIN";
//                     }
//                     if (user.roles.length === 1) {
//                         out += "<td>" + role + "</td>";
//                     } else if (i === 0) {
//                         out += "<td>" + role + ", ";
//                     } else {
//                         out += role + "</td>";
//                     }
//                 }
//                 out += '<td>' +
//                     '<button type="button" class="btn btn-info" data-bs-target="editModal" data-bs-toggle="modal" ' +
//                     'onclick="getEditModal(' + user.id + ')">' + 'Edit' +
//                     '</button>' +
//                     '</td>';
//                 out += '<td>' +
//                     '<button type="button" class="btn btn-danger" data-bs-target="#deleteModal" data-bs-toggle="modal" ' +
//                     'onclick="getDeleteModal(' + user.id + ')">' + 'Delete' +
//                     '</button>' +
//                     '</td>';
//                 out += '</tr>';
//             }
//             placeholder.innerHTML = out;
//         });
// }
//
// getUsers();