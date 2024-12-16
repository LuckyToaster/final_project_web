'use client' 

const URL = 'https://bildy-rpmaya.koyeb.app/api/'

export async function register(email, password) {
    const json = await fetch(`${URL}user/register`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    }).then(r => r.json())

    if (json && json.token) {
        localStorage.setItem('jwt', json.token)
        return true
    }
    return false
}


export async function validateEmail(lecode) {
    const jwt = localStorage.getItem('jwt')
    const res =  await fetch(`${URL}user/validation`, {
        method: 'PUT', 
        headers: {'Content-Type': 'application/json', 'Authorization':  `Bearer ${jwt}`},
        body: JSON.stringify({ code: lecode })
    })
    return res.ok 
}


export async function registerUser(email, name, surnames, nif) {
    return await fetch(`${URL}user/register`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, name, surnames, nif })
    }).then(r => r.json())
}


export async function login(email, password) {
    const json = await fetch(`${URL}user/login`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({ email, password })
    }).then(r => r.json())
    if (json && json.token && json.user) {
        localStorage.setItem('jwt', json.token)
        localStorage.setItem('user', json.user)
        return true
    }
    return false
}


export function logout() {
    localStorage.removeItem('jwt') 
    localStorage.removeItem('user')
}


export function isLoggedIn() {
    return localStorage.getItem('jwt') && localStorage.getItem('user')
}


export async function deleteAccount() {
    const jwt = localStorage.getItem('jwt')
    const res = await fetch(`${URL}user`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization':  `Bearer ${jwt}`},
    })
    return res.ok
}


// 'Access-Control-Allow-Origin': '*',
export async function getClients() {
    const jwt = localStorage.getItem('jwt')
    return await fetch(`${URL}client`, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': `Bearer ${jwt}`}
    }).then(r => r.json())
}


export async function postClient(json) {
    const jwt = localStorage.getItem('jwt')
    const res = await fetch(`${URL}client`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': `Bearer ${jwt}`},
        body: JSON.stringify(json)
    })
    return res.ok
}


export function maskEmail(email) {
    const idx = email.indexOf("@");
    if (idx !== -1) {
        const username = email.slice(0, idx);
        const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 1);
        return maskedUsername + email.slice(idx);
    }
    return email;
}


