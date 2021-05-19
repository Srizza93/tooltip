class AddText {
<<<<<<< HEAD
  constructor(text) {
    this.text = text;
    this.addEvent();
  }

  addEvent() {
    const button = document.querySelector('.add-text');
    button.addEventListener("click", this.render.bind(this));
}

render() {
    const wrapper = document.createElement("section");
    wrapper.classList.add("wrapper");
    const paragraph = document.createElement("p");
    paragraph.innerHTML = this.text;
    wrapper.appendChild(paragraph);
    this.mount(wrapper);
}

mount(wrapper) {
    const bridge = document.querySelector(".text-bridge");
    bridge.appendChild(wrapper);
    this.toolTipAPI();
}

toolTipAPI() {
    bookingTooltips.eventDelegation();
  }
=======

    constructor(text) {
        this.text = text;
        this.addEvent();
    }
    
    addEvent() {
        const button = document.querySelector('button[type="button"]');
        button.addEventListener('click', this.render.bind(this));
    }
    
    render() {
        const wrapper = document.createElement('section');
        wrapper.classList.add('wrapper');
        const paragraph = document.createElement('p');
        paragraph.innerHTML = this.text;
        wrapper.appendChild(paragraph);
        this.mount(wrapper);
    }
    
    mount(wrapper) {
        const bridge = document.querySelector('.text-bridge')
        bridge.appendChild(wrapper);
        this.toolTipAPI();
    }

    toolTipAPI() {
        bookingTooltips.eventDetector();
    }

>>>>>>> df4dcb9bd00628293e732034ecc4e94dd475a3a9
}

const text = `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and <span data-tooltip="Hello world!">typesetting</span> industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of <span data-tooltip="What a lovely day!">type and scrambled</span> it to make a <span data-tooltip="Hello world!">type</span> specimen book.
It has survived not only five <span data-tooltip="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).">centuries</span>, but also the leap into electronic typesetting,
remaining
<span data-tooltip="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).">
  essentially unchanged
</span>.
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

new AddText(text);
