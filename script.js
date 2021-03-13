class ToolTip {
    
    constructor() {
        this.toolTip = document.querySelectorAll('[data-tooltip]');
        this.bridge = document.querySelector('.bridge');
        this.toolTipPopUp = undefined;
        this.toolTipClick = false;
        this.toolTipText = undefined;
        this.containerLeft = undefined;
        this.containerRight = undefined;
        this.containerWidth = undefined;
        this.containerHeight = undefined;
        this.centerToolTip = undefined;
        this.checkMouseEnter = false;
        this.viewportWidth = document.documentElement.clientWidth;
        this.findAllTooltips();
    }
    
    // Loop through all elements in the page with data-tooltip property
    findAllTooltips() {
        this.toolTip.forEach((container) => {
            this.selectContainers(container); 
            this.addEvents(container);
        });
    }
    
    // Add class to containers
    // This class can be customized on style.css
    selectContainers(container) {
        container.classList.add('toolTip');
    }

    addEvents(container) {
        container.addEventListener('mouseenter', this.openToolTip.bind(this));
        container.addEventListener('mouseleave', this.closeToolTip.bind(this));
        container.addEventListener('click', this.switchToolTip.bind(this));
    }
    // Detect the hovered or clicked tooltip container
    openToolTip(container) {
        this.toolTipText = container.currentTarget.dataset.tooltip;
        this.containerLeft = container.currentTarget.getBoundingClientRect().left;
        this.containerRight = container.currentTarget.getBoundingClientRect().right;
        this.containerTop = container.currentTarget.getBoundingClientRect().top;
        this.containerWidth = container.currentTarget.offsetWidth;
        this.containerHeight = container.currentTarget.offsetHeight;
        this.render();
    }
    
    closeToolTip() {
            this.toolTipPopUp.remove();
    }

    closeOnClick() {
        document.querySelectorAll('.toolTipPopUp').forEach(element => element.remove());
    }

    // Switcher for touch screen devices
    switchToolTip(container) {
        if (!this.toolTipClick) {
            this.toolTipClick = true;
            this.openToolTip(container);
        }
        else {
            this.toolTipClick = false;
            this.closeOnClick();
        }
    }

    render() {
        // Create new element
        this.toolTipPopUp = document.createElement('div');
        // Add text in tooltip
        this.toolTipPopUp.appendChild(document.createTextNode(this.toolTipText));
        // Add class
        this.toolTipPopUp.classList.add('toolTipPopUp');
        this.mount();
    }
    
    // Mount into DOM
    mount() {
        this.bridge.appendChild(this.toolTipPopUp);
        this.calculatePosition();
    }
    
    // Calculate tooltip position
    calculatePosition() {
        this.centerToolTip = (this.toolTipPopUp.offsetWidth - this.containerWidth) / 2;
        if (this.containerLeft - this.centerToolTip <= 0) {
            this.centerToolTip = 0;
            this.setLeftPosition();
        }
        else if (this.containerRight + (this.toolTipPopUp.offsetWidth / 2) >= this.viewportWidth) {
            this.setRightPosition();
        } 
        else {
            this.setLeftPosition();
        }
    }
    
    // Set left and top tooltip position
    setLeftPosition() {
        this.toolTipPopUp.style.left = (this.containerLeft - this.centerToolTip) + 'px';
        this.toolTipPopUp.style.top = (this.containerTop + this.containerHeight) + 'px';
    }

    // Set right and top tooltip position
    setRightPosition() {
        const toolTipPopUpWidth = this.toolTipPopUp.offsetWidth;
        this.toolTipPopUp.style.width = toolTipPopUpWidth + 'px';
        this.toolTipPopUp.style.left = (this.containerRight - this.toolTipPopUp.offsetWidth) + 'px';
        this.toolTipPopUp.style.top = (this.containerTop + this.containerHeight) + 'px';
    }
    
}

new ToolTip();
