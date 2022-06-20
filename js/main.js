window.onload = function () {

    async function getReviews(){
        let reviews;
        let find = localStorage.getItem('find');
        if (find){
            localStorage.setItem('find', '');
            reviews = await server.getReviewByName({name: find});
        }
        else{
            reviews = await server.getReviews();
        }

        if (name){
            let token = localStorage.getItem('token');
            user = await server.getUserByToken({token})
        }
        for (let i = 0; i < reviews.length; i++){
            let div = document.createElement('div');
            div.className = 'col-md-4';
            let rule = '';
            
            if (rules == 'admin' || (rules == 'author' && user['user_id'] == reviews[i][1])){
                rule = '</button>\<button type="button" id = "del'+ i +'" class="btn btn-sm btn-outline-secondary">Удалить\</button>'
            } 

            div.innerHTML = ' <div class="card mb-4 shadow-sm" style="width: 15rem;"><img width="100%" height="100%" src="'+ 'api/images/titles/'+ reviews[i][7]+'">\
                <div class="card-body"><p class="card-text">'+ reviews[i][2] +'</p> <div class="d-flex justify-content-between align-items-center">\
                <div class="btn-group"><button type="button" id = "but'+ i +'" class="btn btn-sm btn-outline-secondary">Просмотр\
               '+ rule +'</div></div></div></div>';
            let place = document.getElementById('articlesPlace');
            place.append(div);
            let but = document.getElementById('but' + i);
            but.addEventListener('click', ()=>{
                localStorage.setItem('article_id', reviews[i][0]);
                window.location = './review.html';
            })
            let del = document.getElementById('del' + i);
            if (del){
                del.addEventListener('click', async function(){
                    await server.deleteReview({article_id: reviews[i][0]});
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

    let rules = localStorage.getItem('rules');
    if (rules == 'author'){
        let wri = document.getElementById('write');
        wri.innerHTML = "Написать рецензию";
        wri.href = './create.html';
    }

    let search = document.getElementById('sendSearch');
    search.addEventListener('click', ()=>{
        let text = document.getElementById('inputSearch').value;
        if (text){
            localStorage.setItem('find', text);
        }
        document.location.reload();
    })
    getReviews()
}