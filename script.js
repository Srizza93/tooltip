class ToolTip {
    
    constructor() {
        this.toolTip = document.querySelectorAll('[data-tooltip]');
        this.bridge = document.querySelector('.bridge');
        this.toolTipPopUp = undefined;
        this.closingTag = undefined;
        this.toolTipClick = false;
        this.findAllTooltips();
    }
    
    // Loop through all elements in the page with data-tooltip property
    findAllTooltips() {
        this.toolTip.forEach((container) => { 
            this.render(container) 
            this.addEvents(container);
        });
    }

    addEvents(container) {
        container.addEventListener('mouseenter', this.detectTooltip.bind(this));
        container.addEventListener('click', this.detectTooltip.bind(this));
        this.closingTag.addEventListener('click', this.closeToolTip.bind(this));
    }
    
    render(container) {
        this.textPopUp = container.getAttribute('data-tooltip');
        // Create new elements
        this.toolTipPopUp = document.createElement('span');
        this.closingTag = document.createElement('span');
        // Add text in tooltip and closing tag
        this.toolTipPopUp.appendChild(this.closingTag);
        this.closingTag.appendChild(document.createTextNode('x'));
        this.toolTipPopUp.appendChild(document.createTextNode(this.textPopUp));
        // Add classes
        container.classList.add('toolTip');
        this.toolTipPopUp.classList.add('toolTipPopUp');
        this.closingTag.classList.add('closingTag');
        // Assign attribute
        this.toolTipPopUp.setAttribute('data-tooltip', this.textPopUp);
        this.mount();
    }
    
    // Mount into DOM
    mount() {
        this.bridge.appendChild(this.toolTipPopUp);
    }
    
    // Detect the hovered or clicked tooltip
    detectTooltip(container) {
        this.detectedMessage = container.currentTarget.dataset.tooltip;
        this.detectedToolTip = document.querySelector(`[data-tooltip="${this.detectedMessage}"]`);
        this.containerCoords = container.currentTarget.getBoundingClientRect();
        this.containerWidth = container.currentTarget.offsetWidth;
        this.positionDifference = (this.detectedToolTip.offsetWidth - this.containerWidth) / 2;
        this.position();
        this.displayToolTip();
    }
    
    // Open or close tooltip
    displayToolTip() {
        if (!this.toolTipClick) {
            this.openToolTip();
            this.toolTipClick = true;
        }
        else {
            this.closeToolTip();
            this.toolTipClick = false;
        }
    }

    openToolTip() {
        this.detectedToolTip.style.visibility = 'visible';
    }
    
    closeToolTip() {
        document.querySelectorAll('.toolTipPopUp').forEach(element => element.style.visibility = 'hidden');
    }

    // Set position of tooltip
    position() {
        this.detectedToolTip.style.left = (this.containerCoords.left - this.positionDifference) + 'px';
        this.detectedToolTip.style.top = (this.containerCoords.top + 35) + 'px';
    }

}

new ToolTip();
