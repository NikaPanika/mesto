export default class Api {
    constructor(config) {
        this._commonUrl = config.url;
        this._headers = config.headers;
    }

    getUser() {
        return fetch(`https://${this._commonUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return Promise.resolve(res.json());
            } else {
                return Promise.reject(res.status);
            }

        });
    }

    getInitialCards() {
        return fetch(`https://mesto.${this._commonUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                else { return Promise.reject(res.status) }
            })
    }

    editProfile(data) {
        return fetch(`https://mesto.${this._commonUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.ok) { return Promise.resolve(res.json()) }
                else { return Promise.reject(res.status) }
            })
    }

    addCard(data) {
        return fetch(`https://mesto.${this._commonUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.ok) { return Promise.resolve(res.json()) }
                else { return Promise.reject(res.status) }
            })
    }

    addPhotoLike(id) {
        return fetch(`https://mesto.${this._commonUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) { return Promise.resolve(res.json()) }
                else { return Promise.reject(res.status) }
            })
    }

    deletePhotoLike(id) {
        return fetch(`https://mesto.${this._commonUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) { return Promise.resolve(res.json()) }
                else { return Promise.reject(res.status) }
            })
    }

    deleteCard(id) {
        return fetch(`https://mesto.${this._commonUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) { return Promise.resolve(res.json()) }
                else { return Promise.reject(res.status) }
            })
    }

    setAvatar(data) {
        return fetch(`https://mesto.${this._commonUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: data.link})
        })
            .then((res) => {
                if (res.ok) { return Promise.resolve(res.json()) }
                else { return Promise.reject(res.status) }
            })
    }
}