import {Component} from '../core/component';

class NavigationComponent extends Component {
    constructor(id) {
        super(id)
    }
    init() {
        this.$el.addEventListener('click', makeActiveTab.bind(this))
    }
}

    function makeActiveTab(evt) {
        if(evt.target.classList.contains('tab')){
            evt.preventDefault();
            const tabs = this.$el.querySelectorAll('.tab');
            // const tabs = evt.target.parentNode.parentNode.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            evt.target.classList.add('active');
        }
    }

export {NavigationComponent}