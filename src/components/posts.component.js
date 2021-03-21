import {Component} from '../core/component';
import {apiService} from '../services/api.service';
import {TransformService} from '../services/transform.service';
import {renderPost} from '../templates/render.post';

class PostsCompomemt extends Component {
    constructor(id, loader) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show();
        const data = await apiService.fetchPosts();
        const posts = TransformService.fbObjToArray(data);
        const postsHtml = posts.map(p => renderPost(p, true));
        this.$el.innerHTML = postsHtml.join('');
        this.loader.hide();
    }
}

function buttonHandler(evt) {
    const btn = evt.target;
    let favId = [];
    let favidNames = [];
    if(btn.dataset.post_id) {
        const postId = btn.dataset.post_id;
        if(localStorage.getItem('favId')) {
            favId = JSON.parse(localStorage.getItem('favId'));
            favidNames = JSON.parse(localStorage.getItem('favidNames'));
            const postIndex = favId.indexOf(postId)
            if(postIndex < 0) {
                favId.push(postId);
                favidNames.push({[postId]: btn.dataset.post_name});
                forDel(btn);
            } else {
                favId.splice(postIndex, 1);
                favidNames.splice(postIndex, 1);
                forSave(btn);
            }
        } else {
            favId.push(postId);
            favidNames.push({[postId]: btn.dataset.post_name});
            forDel(btn);
            }
        localStorage.setItem('favId', JSON.stringify(favId));
        localStorage.setItem('favidNames', JSON.stringify(favidNames));
    }
}

function forDel(btn) {
    btn.textContent = 'Удалить';
    btn.classList.remove('button-primary');
    btn.classList.add('button-warning')
}

function forSave(btn) {
    btn.textContent = 'Сохранить';
    btn.classList.add('button-primary');
    btn.classList.remove('button-warning')
}

export {PostsCompomemt};