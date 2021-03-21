import {Component} from '../core/component'

class HeaderComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        if (localStorage.getItem('visited')) {
            this.hide()
        }
        const headerBtn = this.$el.querySelector('.js-header-btn');
        headerBtn.addEventListener('click', hideHeader.bind(this))
    }
}

function hideHeader() {
    localStorage.setItem('visited', 'true');
    this.hide();
}

export {HeaderComponent}