window.onload = function () {

    const server = new Server();
    const reg_btn = document.getElementById('but_registration');
    reg_btn.addEventListener('click', async function () {

        const name = document.getElementById('inputName').value;
        const birthdate = document.getElementById('inputDate').value.slice(0, 10);
        const login = document.getElementById('inputLogin').value;
        const password = document.getElementById('inputPassword').value;
        const passwordAgain = document.getElementById('inputAgain').value;

        console.log('регистрация');
        console.log(name, login, password, passwordAgain);
        if (password == passwordAgain){
            const result = await server.registration({ name, birthdate, login, password });
            console.log(result);
            if (result) { // регистрация и логин успешные, войти 
                console.log('регистрация: ок -> вход');
                document.location.href = "./login.html";
            } else { // показать сообщение об ошибке
                console.log('регистрация: ошибка сервера');
            }
        }
        else{
            console.log('регистрация: неправильный пароль');
        }
    })
}