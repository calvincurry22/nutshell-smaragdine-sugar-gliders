/*
* Author: Michael Carroll
* This module's responsibility is to fetch the resource, users, from the database.json,
* and to make that data available to other modules through the function, useUsers.
*/
let users = []

export const useUsers = () => users.slice()

export const getUsers = () => fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(data => users = data)

export const addUser = userObject => {
    return fetch('http://localhost:8088/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObject)
        })
    .then(getUsers)
}