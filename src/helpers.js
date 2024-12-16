const URL = 'https://bildy-rpmaya.koyeb.app/api/'

// 1) get jwt, either through register() or login()
export async function register(email, password) {
    const json = await fetch(`${URL}user/register`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    }).then(r => r.json())
    localStorage.setItem('jwt', json.token)
}


// if registering, a code is sent through email for validation
export async function validateEmail(lecode) {
    const jwt = localStorage.getItem('jwt')
    const res =  await fetch(`${URL}user/validation`, {
        method: 'PUT', 
        headers: {'Content-Type': 'application/json', 'Authorization':  `Bearer ${jwt}`},
        body: JSON.stringify({ code: lecode })
    })
    return res.ok 
}

// we can return the json response as this will return the created user in json
export async function registerUser(email, name, surnames, nif) {
    return await fetch(`${URL}user/register`, { 
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, name, surnames, nif })
    }).then(r => r.json())
}

export async function login(email, password) {
    const json = await fetch(`${URL}user/login`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    }).then(r => r.json())
    localStorage.setItem('jwt', json.token)
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

