window.onload = function () {

    const server = new Server();
    const login_btn = document.getElementById('but_login');

    login_btn.addEventListener('click', async function () {
        const login = document.getElementById('inputLogin').value;
        const password = document.getElementById('inputPassword').value;
        console.log('вход');
        console.log(login, password);
        const result = await server.login({ login, password });
        if (result) {
            console.log('вход: ок');
            document.location.href = "./index.html";
        } else {
            console.log('вход: неок');
        }
    })
}