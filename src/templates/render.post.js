function renderPost(post, button=false) {
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
    
    let postButton = `
        <button 
        data-post_id="${post.id}" 
        data-post_name="${post.title}"
        class="${btnClasses}">${btnText}</button>
        `
    if (!button) {
        postButton = '';
    }

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

export {renderPost}