class ToolTip {
    
    constructor() {
        this.containers = document.querySelectorAll('[data-tooltip]');
        this.toolTipClasses = ['toolTipWrapper', 'toolTipPopUp', 'triangle'];
        this.elementToObserve = document.querySelector('body');
        this.toolTipClick = true;
        this.toolTipPopUp = undefined;
        this.wrapper =  undefined;
        this.containerWidth = undefined;
        this.containerHeight = undefined;
        this.scrollTop = undefined;
        this.scrollLeft = undefined;
        this.triangle = undefined;
        this.findAllToolTips(this.containers);
        document.addEventListener('DOMContentLoaded', this.detectDynamicContentLoaded.bind(this));
    }
    
    // Search for changes in the DOM
    detectDynamicContentLoaded() {
        const config = { childList: true, subtree: true };
        this.callBackObserver = mutationsList => {
            for (let mutation of mutationsList) {
                if (mutation.addedNodes.length > 0) {
                    const containerClass = mutation.addedNodes.item(0).classList.value;
                    if (!this.toolTipClasses.includes(containerClass)) {
                        const containers = mutation.addedNodes.item(0).querySelectorAll('[data-tooltip]');
                        this.findAllToolTips(containers);
                    }
                }
            }
        }
        const observer = new MutationObserver(this.callBackObserver);
        observer.observe(this.elementToObserve, config);
    }
    
    // Loop through all containers
    findAllToolTips(container) {
        container.forEach((tooltip) => {
            this.selectContainers(tooltip);
            this.addEvents(tooltip);
        });
    }
    
    // Add class to containers
    selectContainers(container) {
        container.classList.add('toolTip');
    }
    
    addEvents(container) {
        container.addEventListener('mouseenter', this.detectToolTip.bind(this));
        container.addEventListener('mouseleave', this.mouseLeave.bind(this));
        container.addEventListener('click', this.switchToolTip.bind(this));
    }
    
    // Detect the hovered or clicked tooltip container
    detectToolTip(container) {
        const toolTipText = container.currentTarget.dataset.tooltip;
        this.scrollTop = document.documentElement.scrollTop;
        this.scrollLeft = document.documentElement.scrollLeft;
        this.containerRect = container.currentTarget.getBoundingClientRect();
        this.containerWidth = container.currentTarget.offsetWidth;
        this.containerHeight = container.currentTarget.offsetHeight;
        this.render(toolTipText);
    }
    
    mouseLeave() {
        this.deleteToolTip();
        this.wrapper.addEventListener('mouseenter', this.mount.bind(this));
        this.wrapper.addEventListener('mouseleave', this.deleteToolTip.bind(this));
    }
    
    // Switcher for touch screen devices
    switchToolTip(container) {
        if (!this.toolTipClick) {
            this.toolTipClick = true;
            this.detectToolTip(container);
        }
        else {
            this.toolTipClick = false;
            this.deleteToolTip();
        }
    }
    
    deleteToolTip() {
        document.querySelectorAll('.toolTipWrapper').forEach(tooltip => tooltip.remove());
    }
    
    render(toolTipText) {
        // Create new elements
        this.wrapper = document.createElement('div');
        this.toolTipPopUp = document.createElement('div');
        this.triangle = document.createElement('div');
        // Add text in tooltip
        this.toolTipPopUp.appendChild(document.createTextNode(toolTipText));
        // Add classes
        this.wrapper.classList.add('toolTipWrapper');
        this.toolTipPopUp.classList.add('toolTipPopUp');
        this.triangle.classList.add('triangle');
        this.mount();
    }
    
    // Mount into DOM
    mount() {
        document.querySelector('body').prepend(this.wrapper);
        this.wrapper.appendChild(this.toolTipPopUp);
        this.toolTipPopUp.appendChild(this.triangle);
        this.toolTipClick = true;
        this.calculatePosition();
    }
    
    // Calculate tooltip position
    calculatePosition() {
        const windowWidth = document.body.scrollWidth;
        const wrapperWidth = this.wrapper.offsetWidth;
        const centerToolTip = (this.wrapper.offsetWidth - this.containerWidth) / 2;
        // Set Width
        this.setWidth(wrapperWidth);
        // Left Edge
        if (this.containerRect.left - centerToolTip <= 0 - this.scrollLeft) {
            this.leftEdge();
        }
        // Right Edge
        else if (this.containerRect.left + this.scrollLeft + this.containerWidth + centerToolTip > windowWidth) {
            this.rightEdge(wrapperWidth);
        }
        // No edges
        else {
            this.noEdges(centerToolTip);
        }
        // Set Top
        this.setTop();
        // Top Edge
        if (this.wrapper.offsetTop - this.scrollTop < 0) {
            this.topEdge();
        }
    }

    setWidth(wrapperWidth) {
        this.wrapper.style.width = wrapperWidth + 'px';
    }
    
    leftEdge() {
        this.triangle.style.left = this.containerWidth / 2 + 'px';
        this.wrapper.style.left = this.containerRect.left + this.scrollLeft + 'px';
    }
    
    rightEdge(wrapperWidth) {
        this.wrapper.style.left = this.containerRect.left + this.containerWidth + this.scrollLeft - wrapperWidth + 'px';
        this.triangle.style.left = this.wrapper.offsetWidth - (this.containerWidth / 2) + 'px';
    }

    noEdges(centerToolTip) {
        this.wrapper.style.left = this.containerRect.left + this.scrollLeft - centerToolTip + 'px';
    }
    
    setTop() {
        this.wrapper.style.top = this.containerRect.top + this.scrollTop - this.wrapper.offsetHeight - 1 + 'px';
    }
    
    topEdge() {
        this.wrapper.style.top = this.containerRect.top + this.scrollTop + this.containerHeight - 1 + 'px';
        this.toolTipPopUp.style.marginTop = '15px';
        this.toolTipPopUp.style.marginBottom = '0px';
        this.triangle.style.top = '-30px';
        this.triangle.style.transform = 'rotate(180deg)';
    } 
    
}

new ToolTip();
