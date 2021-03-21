class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async createPost(post) {
        try {
            const request = new Request(
                this.url + '/posts.json',
                {
                    method: 'POST',
                    body: JSON.stringify(post)
                }
            );

            return useRequest(request);

        } catch(error) {
            console.log(error);
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(
                `${this.url}/posts.json`,
                {method: 'GET'}
            );
            return useRequest(request)
        } catch(error) {
            console.log(error)
        }
    }
}

async function useRequest(request) {
    const response = await fetch(request);
    return await response.json();
}

export const apiService = new ApiService('https://js-with-webpack-default-rtdb.firebaseio.com')