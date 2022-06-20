class Server {
    constructor(callbackGetMessages){
		this.token = localStorage.getItem('token');
	}

    async getData(method, data = {}) {
        let url = `api/?method=${method}`;
        if (this.token) {
            url += `&token=${this.token}`;
        }
        const arr = [];
        for (let key in data) {
            arr.push(`${key}=${data[key]}`);
        }
        if (arr.length) {
            url += `&${arr.join('&')}`;
        }
        console.log(url);
        const request = await fetch(url);
        console.log(request);
        const answer = await request.json();
        console.log(answer);
        return (answer && answer.result == 'ok') ? answer.data : false;
    }

    async login(data) {
        const result = await this.getData('login', data);
        if (result && result.token) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('login', result.login);
            localStorage.setItem('rules', result.rules);
            this.token = result.token;
        }
        return result;
    }

    logout() {
		localStorage.setItem('token', '');
        localStorage.setItem('login', '');
        localStorage.setItem('rules', '');
        return this.getData('logout');
    }

    async registration(data) {
        const result = await this.getData('registration', data);
        if (result && result.token) {
            this.token = result.token;
        }
        return result;
    }

    async getUserByToken(data){
        const result = await this.getData('getUserByToken', data);
        return result;
    }

    async getUserById(data){
        const result = await this.getData('getUserById', data);
        return result;
    }

    async getReviews(){
        return await this.getData('getReviews');
    } 

    async getReview(data){
        const result = await this.getData('getReview', data);
        return result;
    }

    async deleteReview(data){
        return await this.getData('deleteReview', data);
    }

    async getReviewByName(data){
        const result = await this.getData('getReviewByName', data);
        return result;
    }

    async getReviewUnits(data){
        const result = await this.getData('getReviewUnits', data);
        return result;
    }

    async sendComment(data){
        return await this.getData('sendComment', data);
    }

    async deleteComment(data){
        return await this.getData('deleteComment', data);
    }

    async getComments(data){
        return await this.getData('getComments', data);
    }
}