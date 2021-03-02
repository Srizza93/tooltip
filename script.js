class ToolTip {
    
    constructor() {
        this.toolTip = document.querySelectorAll('[data-tooltip]');
        this.toolTipWrapper = undefined;
        this.toolTipPopUp = undefined;
        this.findAllTooltips();
    }
    
    // Loop through all elements in the page with data-tooltip property
    findAllTooltips() {
        this.toolTip.forEach((container) => { this.render(container) });
    }
    
    render(container) {
        this.textPopUp = container.getAttribute('data-tooltip');
        this.toolTipWrapper = document.createElement('span');
        this.toolTipPopUp = document.createElement('span');
        this.toolTipWrapper.appendChild(this.toolTipPopUp);
        this.toolTipPopUp.appendChild(document.createTextNode(this.textPopUp));
        container.classList.add('toolTip');
        this.toolTipWrapper.classList.add('toolTipWrapper');
        this.toolTipPopUp.classList.add('toolTipPopUp');
        this.mount(container);
    }
    
    mount(tooltip) {
        tooltip.appendChild(this.toolTipWrapper);
    }

}

new ToolTip();
