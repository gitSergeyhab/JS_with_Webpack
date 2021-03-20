import {Component} from '../core/component';
import {apiService} from '../services/api.service';
import {TransformService} from '../services/transform.service';

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
        const postsHtml = posts.map(p => renderPost(p));
        this.$el.innerHTML = postsHtml;
        this.loader.hide();
    }
}

function renderPost(post) {
    const tag = post.type == 'news'
        ?   `<li class="tag tag-blue tag-rounded">Новость</li>`  
        :   `<li class="tag tag-rounded">Заметка</li>` 

    let btnClasses = `button-round button-small`;
    let btnText = `Сохранить`;
    const lsF = localStorage.getItem('favId')
    if (lsF && JSON.parse(lsF).includes(post.id)) {
        btnClasses += ' button-warning';
        btnText = 'Удалить'
    } else {
        btnClasses += ' button-primary';
    }
    
    const postButton = `
        <button 
        data-post_id="${post.id}" 
        data-post_name="${post.title}"
        class="${btnClasses}">${btnText}</button>
        `

    return `
    <div class="panel">
        <div class="panel-head">
            <p class="panel-title">${post.title}</p>
            <ul class="tags">
                ${tag}
            </ul>
        </div>
        <div class="panel-body">
            <p class="multi-line">${post.fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
            <small>${post.date}</small>
            ${postButton}
        </div>
    </div>
    `
}

function buttonHandler(evt) {
    const btn = evt.target;
    let favId = [];
    let favidNames = [];
    if(btn.dataset.post_id) {
        const postId = btn.dataset.post_id;
        console.log(postId)
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
        console.log(localStorage.getItem('favId'));
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