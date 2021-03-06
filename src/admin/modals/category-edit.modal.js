import { Modal } from "../core/modal";
import { apiService } from "../services/api.service";
import { renderIcons } from "../templates/icons.template";

export class CategoryEditModal extends Modal {
    constructor(id, open, close) {
        super(id, open, close);
    }

    // перепишем метод для перевода ивента open в событие onchange
    init() {
        if (this.open) {
            this.setElems();
            this.open.addEventListener('change', this.show.bind(this));
            this.close.addEventListener('click', this.hide.bind(this));
            this.$el.querySelector('form').addEventListener('submit', this.updateCategory.bind(this));  
        }
    }

    setElems() {
        this.$id = this.$el.querySelector('.id');
        this.$originalTitle = this.$el.querySelector('.originalTitle');
        this.$title = this.$el.querySelector('.title');
        this.$type = this.$el.querySelector('.type');
        this.$format = this.$el.querySelector('.format');
        this.$img = this.$el.querySelector('.img');
    }
    
    async openHandler(e) {
        const data = JSON.parse(e.target.value),
            icons = await apiService.getIcons();
            
        this.$img.innerHTML = `<option value='${data.img}' selected>Оставить прежнюю</option>`;
        this.$id.value = data.id;
        this.$originalTitle.value = data.title[0].toUpperCase() + data.title.slice(1);
        this.$title.value = data.title[0].toUpperCase() + data.title.slice(1);
        this.$type.value = data.type;
        this.$format.value = data.format;
        this.$img.insertAdjacentHTML('beforeend', renderIcons(icons));
        M.FormSelect.init(this.$img);
        M.textareaAutoResize(this.$type);
        M.updateTextFields();
    }

    async updateCategory(e) {
        e.preventDefault();
        const form = this.$el.querySelector('form');
        const categories = await apiService.getCategories();
        const id = form.elements[0].value.toLowerCase().trim();
        const index = categories.map((category) => {return category._id}).indexOf(id);
        index != -1 ? form.submit() : alert('Категории с таким ID не существует.'); 
    }
}