class ToolTip {
    
    constructor() {
        this.containers = document.querySelectorAll('[data-tooltip]');
        this.toolTipPopUp = undefined;
        this.wrapper =  undefined;
        this.toolTipClick = true;
        this.toolTipText = undefined;
        this.containerLeft = undefined;
        this.containerRight = undefined;
        this.containerWidth = undefined;
        this.containerHeight = undefined;
        this.centerToolTip = undefined;
        this.scrollTop = undefined;
        this.triangle = undefined;
        this.elementToObserve = document.querySelector('body');
        this.viewportWidth = document.documentElement.clientWidth;
        this.target = undefined;
        this.observer = undefined;
        this.findAllToolTips(this.containers);
        this.detectDynamicContentLoaded();
    }
    
    // Search for changes in the DOM
    detectDynamicContentLoaded() {
        let self = this;
        this.target = document.querySelector('body');
        this.config = { childList: true, subtree: true };
        this.callBackObserver = function(mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.addedNodes[0] && mutation.addedNodes[0].classList) {
                    let containerClass = mutation.addedNodes[0].classList;
                    if (!containerClass.contains('toolTipPopUp')) {
                        this.containers = mutation.addedNodes[0].querySelectorAll('[data-tooltip]');
                        self.findAllToolTips(this.containers);
                    }
                }
            }
        }
        this.observer = new MutationObserver(this.callBackObserver);
        this.observer.observe(this.target, this.config);
    }
    
    // Loop through all containers
    findAllToolTips(container) {
        let self  = this;
        container.forEach((tooltip) => {
            self.selectContainers(tooltip);
            self.addEvents(tooltip);
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
        this.scrollTop = document.documentElement.scrollTop;
        this.toolTipText = container.currentTarget.dataset.tooltip;
        this.containerLeft = container.currentTarget.getBoundingClientRect().left;
        this.containerRight = container.currentTarget.getBoundingClientRect().right;
        this.containerTop = container.currentTarget.getBoundingClientRect().top + this.scrollTop;
        this.containerWidth = container.currentTarget.offsetWidth;
        this.containerHeight = container.currentTarget.offsetHeight;
        this.render();
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

    render() {
        // Create new elements
        this.wrapper = document.createElement('div');
        this.toolTipPopUp = document.createElement('div');
        this.triangle = document.createElement('div');
        // Add text in tooltip
        this.toolTipPopUp.appendChild(document.createTextNode(this.toolTipText));
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
        this.centerToolTip = (this.wrapper.offsetWidth - this.containerWidth) / 2;
        // Left Edge
        if (this.containerLeft - this.centerToolTip <= 0) {
            this.leftEdge();
            this.centerToolTip = 0;
        }
        // Right Edge
        if (this.containerRight + this.centerToolTip >= this.viewportWidth) {
            this.rightEdge();
            this.centerToolTip = this.toolTipPopUp.offsetWidth - this.containerWidth;
        }
        this.setPosition();
        // Top Edge
        if (this.wrapper.offsetTop < 0) {
            this.topEdge();
        }
    }
    
    setPosition() {
        this.wrapper.style.top = this.containerTop - this.wrapper.offsetHeight + 'px';
        this.wrapper.style.left = this.containerLeft - this.centerToolTip + 'px';
    }
    
    leftEdge() {
        this.triangle.style.left = this.containerWidth / 2 + 'px';
    }

    rightEdge() {
        const toolTipPopUpWidth = this.toolTipPopUp.offsetWidth;
        this.wrapper.style.width = toolTipPopUpWidth + 'px';
        this.triangle.style.left = this.toolTipPopUp.offsetWidth - (this.containerWidth / 2) + 'px';
    }

    topEdge() {
        this.wrapper.style.top = this.containerTop + this.containerHeight + 'px';
        this.toolTipPopUp.style.marginTop = '15px';
        this.toolTipPopUp.style.marginBottom = '0px';
        this.triangle.style.top = '-30px';
        this.triangle.style.transform = 'rotate(180deg)';
    } 
    
}

new ToolTip();
