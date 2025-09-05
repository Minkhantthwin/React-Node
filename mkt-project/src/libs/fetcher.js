const api = import.meta.env.VITE_API;

function getToken() {
    return localStorage.getItem("token");
}

export async function fetchVerify() {
    const token = getToken();
    const res = await fetch(`${api}/verify`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    if (res.ok) {
        return res.json();
    }
    return false;
}

export async function postPost(content){
    const token = getToken();
    const res = await fetch(`${api}/content/posts`,{
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (res.ok) {
        return res.json();
    }

    throw new Error('Failed to create post');
}

export async function postComment(content, postId) {
    const token = getToken();
    const res = await fetch(`${api}/content/comments`,{
        method: "POST",
        body: JSON.stringify({ content, postId }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (res.ok) {
        return res.json();
    }

    throw new Error('Failed to create comment');
}

export async function postUser(data) {
    const res = await fetch(`${api}/users`,{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        return res.json();
    }

    throw new Error('Failed to create user');
}

export async function loginUser({username, password}) {
    const res = await fetch(`${api}/login`,{
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        return res.json();
    }
    let detail;
    try { detail = await res.json(); } catch {}

    throw new Error('Failed to login');
}


export async function fetchUser(id) {
    const token = getToken();
    const res = await fetch(`${api}/users/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    if (res.ok) {
        return res.json();
    }
    throw new Error('Failed to fetch user');
}