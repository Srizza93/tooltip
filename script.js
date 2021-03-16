class ToolTip {
    
    constructor() {
        this.toolTip = document.querySelectorAll('[data-tooltip]');
        this.bridge = document.querySelector('.bridge');
        this.toolTipPopUp = undefined;
        this.toolTipClick = true;
        this.toolTipText = undefined;
        this.containerLeft = undefined;
        this.containerRight = undefined;
        this.containerWidth = undefined;
        this.containerHeight = undefined;
        this.centerToolTip = undefined;
        this.elementToObserve = document.querySelector('body');
        this.observer = undefined;
        this.updates = [];
        this.viewportWidth = document.documentElement.clientWidth;
        this.findAllTooltips();
        this.detectDynamicContentLoaded(this.toolTip, this.selectContainers);
    }
    
    detectDynamicContentLoaded(toolTips, selectContainers) {
        var insertedNodes = [];
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                for (var i = 0; i < mutation.addedNodes.length; i++)
                insertedNodes.push(mutation.addedNodes[i]);
            })
            toolTips = document.querySelectorAll('[data-tooltip]');
            toolTips.forEach((toolTip, index) => {
                selectContainers(toolTips[index]);
            });
        });
        observer.observe(this.elementToObserve, { subtree: true, childList: true });
    }
    
    // Loop through all elements in the page with data-tooltip property
    findAllTooltips() {
        this.toolTip.forEach((container) => {
            this.addEvents(container);
        });
    }
    
    // Add class to containers
    // This class can be customized on style.css
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
        this.toolTipText = container.currentTarget.dataset.tooltip;
        this.containerLeft = container.currentTarget.getBoundingClientRect().left;
        this.containerRight = container.currentTarget.getBoundingClientRect().right;
        this.containerTop = container.currentTarget.getBoundingClientRect().top;
        this.containerWidth = container.currentTarget.offsetWidth;
        this.containerHeight = container.currentTarget.offsetHeight;
        this.render();
    }

    mouseLeave() {
        this.deleteToolTip();
        this.toolTipPopUp.addEventListener('mouseenter', this.mount.bind(this));
        this.toolTipPopUp.addEventListener('mouseleave', this.deleteToolTip.bind(this));
    }
    
    // Switcher for touch screen devices
    switchToolTip(container) {
        if (!this.toolTipClick) {
            this.toolTipClick = true;
            this.detectToolTip(container);
        }
        else {
            this.toolTipClick = false;
            this.deleteOnClick();
        }
    }

    deleteToolTip() {
            this.toolTipPopUp.remove();
    }

    deleteOnClick() {
        document.querySelectorAll('.toolTipPopUp').forEach(tooltip => tooltip.remove());
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
        this.toolTipClick = true;
        this.calculatePosition();
    }
    
    // Calculate tooltip position
    calculatePosition() {
        this.centerToolTip = (this.toolTipPopUp.offsetWidth - this.containerWidth) / 2;
        if (this.containerLeft - this.centerToolTip <= 0) {
            this.centerToolTip = 0;
        }
        if (this.containerRight + this.centerToolTip >= this.viewportWidth) {
            this.setWidth();
            this.centerToolTip = this.toolTipPopUp.offsetWidth - this.containerWidth;
        } 
        this.setPosition();
    }
    
    setPosition() {
        this.toolTipPopUp.style.top = this.containerTop + this.containerHeight + 10 + 'px';
        this.toolTipPopUp.style.left = this.containerLeft - this.centerToolTip + 'px';
    }
    
    setWidth() {
        const toolTipPopUpWidth = this.toolTipPopUp.offsetWidth;
        this.toolTipPopUp.style.width = toolTipPopUpWidth + 'px';
    }
    
}

new ToolTip();
