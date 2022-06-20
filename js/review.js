window.onload = function () {

    //Загрузка страницы
    async function makePage(server){
        let info = await server.getReview({article_id});
        let units = await server.getReviewUnits({article_id});
        let author = await server.getUserById({user_id: info[1]});

        let head = document.getElementById('head');
        let date = document.getElementById('date');
        let holder = document.getElementById('unitHolder');
        head.innerHTML = info[2];
        date.innerHTML = "Рецензия написана " + info[3] + ". Автор: " + author[2];

        for (let i = 0; i < units.length; i++){
            let subtitle = document.createElement('h2');
            let text = document.createElement('p');
            let image = document.createElement('img');
            image.width = window.screen.width / 2;
            image.height = window.screen.height / 2;

            text.innerHTML = units[i][1];
            subtitle.innerHTML = units[i][3];
            image.src = "api/images/units/" + units[i][2];

            holder.append(subtitle);
            holder.append(text);
            holder.append(image);
        }

        let advantages = document.getElementById('advantages');
        let disadvantages =  document.getElementById('disadvantages');
        let grade = document.getElementById('grade');
        let rules = localStorage.getItem('rules');

        advantages.innerHTML = "Достоинства: " + info[4];
        disadvantages.innerHTML = "Недостатки: " + info[5];
        grade.innerHTML = "Оценка: " + info[6];
        if (info[6] == 1){
            grade.innerHTML += " балл";
        }
        else if (info[6] > 1 && info[6] < 5){
            grade.innerHTML += " балла";
        }
        else{
            grade.innerHTML += " баллов";
        }
    
        let all_comments = await server.getComments({article_id});
        const commentHolder = document.getElementById('commentHolder');
        for (let i = 0; i < all_comments.length; i++){
            let div = document.createElement('div');
            div.className = 'media text-muted pt-3';
            div.innerHTML = '<svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>\
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"><div class="d-flex justify-content-between align-items-center w-100">\
            <strong class="text-gray-dark"><label id = "comAuth'+ i +'">'+ all_comments[i][1] +':</label>\
            </strong></div><label id = "comment'+ i +'">'+ all_comments[i][0] +'</label></div>'
            if (rules == 'admin' || name == all_comments[i][1]){
                div.innerHTML += '<button type="button" class="btn btn-sm btn-outline-secondary" id = "del'+ i +'">Удалить\
                                    </button>';
            }
            commentHolder.append(div);
            
            let del = document.getElementById("del" + i);
            if (del){
                del.addEventListener('click', async function(){
                    let comAuth = document.getElementById('comAuth' + i).textContent;
                    let comment = document.getElementById('comment' + i).textContent;
                    await server.deleteComment({login: comAuth.slice(0, comAuth.length - 1), comment});
                    document.location.reload();
                })
            }
        } 
    }

    let server = new Server();
    let name = localStorage.getItem('login');
    
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
                document.location.reload();
            } else { 
                console.log('выход: неок');
            }
        });    
    } 
    let article_id = localStorage.getItem('article_id');
    let commentBut = document.getElementById('sendComment');

    commentBut.addEventListener('click', async function(){
        let comment = document.getElementById('inputComment').value;
        let token = localStorage.getItem('token');
        if (token){
            await server.sendComment({user_id: token, article_id, comment})
            document.location.reload()
        }
    })

   makePage(server);
}