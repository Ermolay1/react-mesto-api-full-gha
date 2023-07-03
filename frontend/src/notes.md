- messed with .page and .root styles. Joined them in page. Got rid of root, and renamed `body class="root"` to page.
- removed `import React from 'react'`
- in case bad internet and inability to correctly run `npm install` - unzip `node_modules.7z`
- element.style {
  filter: drop-shadow(5px 5px 6px black);
  }

avatar
https://zamanilka.ru/wp-content/uploads/2021/10/boy-neon-mask-201021.png
https://zamanilka.ru/wp-content/uploads/2022/06/dog-man-180622-1-473x1024.jpg
=͟͟͞͞( ✌°∀° )☛
¯\_༼ ಥ ‿ ಥ ༽\_/¯

function handleUpdateAvatar(userAvatar) {
api
.createNewAvatar(userAvatar)
.then((userAvatar) => setCurrentUser(userAvatar))
// как правильней?
// И почему если { ...c, ...userAvatar } не в скобках, то VsCode ругается?
// .then((userAvatar) => setCurrentUser((c) => ({ ...c, ...userAvatar })))
// .then((userAvatar) => setCurrentUser({ ...currentUser, ...userAvatar }))
.catch((err) => console.log(err));

    closeAllPopups();

}

вернуть в package.json

"homepage": "https://zang3tsu88.github.io/mesto-react-auth/",
