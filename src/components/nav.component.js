import {Component} from '../core/component';

class NavigationComponent extends Component {
    constructor(id) {
        super(id);

        this.tabs = [];
    }
    init() {
        this.$el.addEventListener('click', makeActiveTab.bind(this))
    }

    regiserTabs(tabs) {
        this.tabs = tabs;
    }
}

    function makeActiveTab(evt) {
        if(evt.target.classList.contains('tab')){
            evt.preventDefault();
            const htmltabs = this.$el.querySelectorAll('.tab');
            htmltabs.forEach(tab => tab.classList.remove('active'));
            evt.target.classList.add('active');

            // evt.target.dataset.name ==>> evt.target.getAttribute('data-name');
            //.find ==>> возвращает значение первого найденного в массиве элемента, 
            // которое удовлетворяет условию переданному в callback функции
            const activeTab = this.tabs.find(t => t.name === evt.target.dataset.name);
            this.tabs.forEach(t => t.component.hide())
            activeTab.component.show();
        }
    }

export {NavigationComponent}