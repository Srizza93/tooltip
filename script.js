class ToolTip {
    
    constructor() {
        this.toolTip = document.querySelectorAll('[data-tooltip]');
        this.toolTipPopUp = undefined;
        this.toolTipClick = true;
        this.toolTipText = undefined;
        this.containerLeft = undefined;
        this.containerRight = undefined;
        this.containerWidth = undefined;
        this.containerHeight = undefined;
        this.centerToolTip = undefined;
        this.scrollTop = undefined;
        this.elementToObserve = document.querySelector('body');
        this.viewportWidth = document.documentElement.clientWidth;
        this.target = undefined;
        this.observer = undefined;
        this.findAllToolTips(this.toolTip);
        this.detectDynamicContentLoaded();
    }
    
    detectDynamicContentLoaded() {
        let self = this;
        this.target = document.querySelector('body');
        this.config = { childList: true, subtree: true };
        this.callBackObserver = function(mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.addedNodes[0] && mutation.addedNodes[0].classList) {
                    let containerClass = mutation.addedNodes[0].classList[0];
                    if (containerClass && containerClass !== 'toolTipPopUp') {
                        this.toolTip = mutation.addedNodes[0].querySelectorAll('[data-tooltip]');
                        self.findAllToolTips(this.toolTip);
                    }
                }
            }
        }
        this.observer = new MutationObserver(this.callBackObserver);
        this.observer.observe(this.target, this.config);
    }
    
    // Loop through all elements on new text
    findAllToolTips(container) {
        let self  = this;
        container.forEach((tooltip) => {
            self.selectContainers(tooltip);
            self.addEvents(tooltip);
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
            this.deleteToolTip();
        }
    }

    deleteToolTip() {
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
        document.querySelector('body').prepend(this.toolTipPopUp);
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
