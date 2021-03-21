import {Component} from '../core/component';
import {apiService} from '../services/api.service';
import {TransformService} from '../services/transform.service';
import {renderPost} from '../templates/render.post';

class FavoriteCompomemt extends Component {
    constructor(id, loader) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', favBtnHandler.bind(this));
    }

    onShow() {
        const favidNames = localStorage.getItem('favidNames');
        const favorPosts = JSON.parse(favidNames); 
        if (favorPosts && favorPosts.length) {
            const favoriteHtml = favorPosts.map(fav => renderFav(fav));
            this.$el.innerHTML = favoriteHtml.join('');
        } else {
            this.$el.innerHTML = `
            <p class="center">Нет избранных</p>
            `
        }
    }
}

function renderFav(fav) {
    return `
        <p>
        <button 
        type="button" 
        class="button-shadow"
        data-id=${Object.keys(fav)[0]}>
        ${Object.values(fav)[0]}
        </button>
        </p>
        `
}

async function favBtnHandler(evt) {
    this.loader.show();
    const id = evt.target.dataset.id;
    const data = await apiService.fetchPosts();
    const posts = TransformService.fbObjToArray(data);
    const post = posts.filter(p => p.id == id);
    const postsHtml = post.map(p => renderPost(p));
    this.$el.innerHTML = postsHtml[0];
    this.loader.hide();
}

export {FavoriteCompomemt};