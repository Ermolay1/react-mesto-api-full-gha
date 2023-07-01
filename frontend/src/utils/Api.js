class Api {
  constructor(_basePath, token) {
    this._basePath = _basePath;
    this._token = token;
  }

  _getHeaders() {
    return {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson);
  }
   
  getCurrentUser() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._basePath}/users/me `, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._getJson);
  }

  getCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._basePath}/cards`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._getJson);
  }

  deleteCard(id) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._basePath}/cards/${id} `, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._getJson);
  }

  getUserInfo() {
    return this._request(`${this._basePath}/users/me`, {
      headers: this._getHeaders(),
    });
  }

  getAllCardWhithUser() {
    return Promise.all([this.getCards(), this.getCurrentUser()]);
  }

  editUserInfo(name, job) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then(this._getJson);
  }

  addNewCard({ item }) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._basePath}/cards`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
              link: item.link,
              name: item.name
      }),
    }).then(this._getJson);
  }

  _likeCard(id) {
    const token = localStorage.getItem("jwt");
      return fetch(`${this._basePath}/cards/${id}/likes`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
      })
      .then(this._getJson);
  }

  _deleteLike(id) {
    const token = localStorage.getItem("jwt");
      return fetch(`${this._basePath}/cards/${id}/likes`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
      })
      .then(this._getJson);
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this._deleteLike(id) : this._likeCard(id);
  }

  editAvatar(link) {
    const token = localStorage.getItem("jwt");
      return fetch(`${this._basePath}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: link,
        }),
      }).then(this._getJson);
}
}

const api = new Api(
  //"https://mesto.nomoreparties.co/v1/cohort-61",
 // "71ce217b-0d84-4894-b27b-2d906663c6db"
 "https://mesto.studentslesha.nomoreparties.sbs"
 //"http://localhost:3000"
);

export default api;
