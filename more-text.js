class AddText {

    constructor(text) {
        this.button = document.querySelector('button[type="button"]');
        this.bridge = document.querySelector('.text-bridge')
        this.wrapper = undefined;
        this.paragraph = undefined;
        this.text = text;
        this.client = undefined;
        this.addEvent();
    }

    addEvent() {
        this.button.addEventListener('click', this.render.bind(this));
    }

    render() {
        this.wrapper = document.createElement('section');
        this.wrapper.classList.add('wrapper');
        this.paragraph = document.createElement('p');
        this.paragraph.innerHTML = this.text;
        this.wrapper.appendChild(this.paragraph);
        this.mount();
    }

    mount() {
        this.bridge.appendChild(this.wrapper);
    }

}

let text = `What is <span data-tooltip="Hello world!">Lorem Ipsum</span>?
Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of <span data-tooltip="What a lovely day!">type and scrambled</span> it to make a type specimen book.
It has survived not only five <span data-tooltip="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).">centuries</span>, but also the leap into electronic typesetting,
remaining
<span data-tooltip="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).">
  essentially unchanged
</span>.
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

new AddText(text);
