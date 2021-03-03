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
        // Create new elements
        this.toolTipWrapper = document.createElement('span');
        this.toolTipPopUp = document.createElement('span');
        // Add text in tooltip
        this.toolTipPopUp.appendChild(document.createTextNode(this.textPopUp));
        // Add classes to the 3 elements involved:
        // tooltip, tooltip wrapper, tooltip pop up
        container.classList.add('toolTip');
        this.toolTipWrapper.classList.add('toolTipWrapper');
        this.toolTipPopUp.classList.add('toolTipPopUp');
        this.mount(container);
    }
    
    // Mount into DOM
    mount(tooltip) {
        tooltip.appendChild(this.toolTipWrapper);
        this.toolTipWrapper.appendChild(this.toolTipPopUp);
    }

}

new ToolTip();
