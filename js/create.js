window.onload = function () {

    async function getUser(){
        const user = await server.getUserByToken({token});
        let inp = document.getElementById('user_id');
        inp.value = user[0];
    }

    let server = new Server();
    let name = localStorage.getItem('login');
    let token = localStorage.getItem('token');
    if (name){
        let log = document.getElementById('login');
        log.innerHTML = "Выйти";
        log.href = "#";
        let reg = document.getElementById('registration');
        reg.innerHTML = name;
        reg.href = "#";

        log.addEventListener('click', async function () {
            const result = await server.logout();
            if (result) { 
                console.log('выход: ок -> выход');
                log.innerHTML = "Войти";
                log.href = "./login.html"
                reg.innerHTML = "Зарегистрироваться";
                reg.href = "./registration.html";
            } else { 
                console.log('выход: неок');
            }
        });    
    }

    let time = new Date();
    let creation_date = document.getElementById('date');
    creation_date.value = time.getFullYear() + "-" + (time.getMonth() > 9 ? time.getMonth() + 1 : "0" + (time.getMonth() + 1)) 
                    + "-" + (time.getDate() > 9 ? time.getDate() : "0" + time.getDate());
    getUser();
    
    //Добавление части рецензии
    let input_row = document.getElementById('row');
    let row = 2;
    input_row.value = row - 1;
    let del = document.getElementById('del');
    del.addEventListener('click', ()=>{
        let unit = document.getElementById('unit' + (row - 1));
        unit.remove();
        row--;
        input_row.value = row - 1;
        if (row == 2){
            del.disabled = true;
        }
    })

    let adding = document.getElementById('addUnit');
    adding.addEventListener('click', ()=>{
        let div = document.createElement('div');
        div.className = 'py-3'
        div.id = 'unit' + row;
        div.innerHTML = '<input type="text" name="subtitle'+ row + '" class="form-control" placeholder="Подзаголовок" required autofocus>\
        <textarea class="form-control py-3" name = "paragraph'+ row +'" cols = "50" rows = "10" placeholder = "Абзац рецензии" ></textarea>\
        <input type = "file" name = "image'+ row +'" class="form-control-file py-3" accept=".jpg, .jpeg, .png">';
        let holder = document.getElementById('unitHolder');
        holder.append(div);

        row++;
        input_row.value = row - 1;
        del.disabled = false;
    })

    let sending = document.getElementById('sendReview');
    sending.addEventListener('click',()=>{
        document.location = './index.html';
    })
}