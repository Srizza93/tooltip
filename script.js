class ToolTip {
    
    constructor() {
        this.toolTip = document.querySelectorAll('[data-tooltip]');
        this.toolTipPopUp = undefined;
        this.marginLeftPopUp = 0;
        this.findAllTooltips();
    }
    
    // Loop through all elements in the page with data-tooltip property
    findAllTooltips() {
        this.toolTip.forEach((container) => {
            container.addEventListener("onload", this.render(container));
        });
    }
    
    render(container) {
        this.textPopUp = container.getAttribute('data-tooltip');
        this.toolTipPopUp = document.createElement("span");
        this.toolTipPopUp.appendChild(document.createTextNode(this.textPopUp));
        container.className = "toolTip";
        this.toolTipPopUp.className = "toolTipPopUp";
        this.mount(container);
    }
    
    mount(tooltip) {
        tooltip.appendChild(this.toolTipPopUp);
        this.position();
    }
    
    position() {
        this.toolTipPopUp.style.transform = "translateX(-50%)";
        this.toolTipPopUp.style.left = "50%";
    }

}

new ToolTip();
