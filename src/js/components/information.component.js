import { Component } from "../core/component";

export class InformationComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        if (localStorage.getItem('visited')) {
            this.hide();
        }
        const btn = this.$el.querySelector('#information-close');
        btn.addEventListener('click', buttonHandler.bind(this));
    }
}

function buttonHandler() {
    localStorage.setItem('visited', JSON.stringify(true));
    this.hide();
}