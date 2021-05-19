class ToolTip {
<<<<<<< HEAD
  constructor() {
    this.tooltipClasses = [
      "triangle",
      "toolTipWrapper",
      "toolTipPopUp",
      "toolTip",
    ];
    this.wrapper = undefined;
    this.toolTipPopUp = undefined;
    this.triangle = undefined;
    this.containerWidth = undefined;
    this.containerHeight = undefined;
    this.eventDelegation();
  }

  eventDelegation() {
    document.addEventListener("mouseover", this.mouseOverTooltip.bind(this));
    document.addEventListener("mouseout", this.mouseOutTooltip.bind(this));
    document.addEventListener("click", this.clickTooltip.bind(this));
  }

  mouseOverTooltip(event) {
    let target = event.target.closest("span");
    if (!target) {
      return;
    }
    if (!target.hasAttribute("data-tooltip")) {
      return;
    }
    if (event.fromElement === null) {
      return;
    }
    let fromElementClass = event.fromElement.classList.value;
    if (this.tooltipClasses.includes(fromElementClass)) {
      return;
    }
    this.detectToolTip(target);
  }

  mouseOutTooltip(event) {
    const tooltipWrapper = document.querySelector(".toolTipWrapper");
    let target = event.target.closest("span");
    let targetPath = event.path;
    if (event.toElement === null) {
      return;
    }
    let toElementClass = event.toElement.classList.value;
    if (
      (!targetPath.includes(tooltipWrapper) &&
        this.tooltipClasses.includes(toElementClass)) ||
      (!target && this.tooltipClasses.includes(toElementClass))
    ) {
      return;
    }
    this.deleteToolTip();
  }

  clickTooltip(event) {
    let target = event.target.closest("span");
    if (!target) {
      return;
    }
    if (!target.hasAttribute("data-tooltip")) {
      return;
    }
    this.switchToolTip(target);
  }

  detectToolTip(container) {
    const toolTipText = container.dataset.tooltip;
    this.containerRect = container.getBoundingClientRect();
    this.containerWidth = container.offsetWidth;
    this.containerHeight = container.offsetHeight;
    this.render(toolTipText);
  }

  // Switcher for touch screen devices
  switchToolTip(container) {
    if (container.classList.contains("Off")) {
      container.classList.remove("Off");
      this.detectToolTip(container);
    } else {
      container.classList.add("Off");
      this.deleteToolTip();
    }
  }

  deleteToolTip() {
    document
      .querySelectorAll(".toolTipWrapper")
      .forEach((tooltip) => tooltip.remove());
  }

  render(toolTipText) {
    this.wrapper = document.createElement("div");
    this.toolTipPopUp = document.createElement("div");
    this.triangle = document.createElement("div");
    this.toolTipPopUp.appendChild(document.createTextNode(toolTipText));
    this.wrapper.classList.add("toolTipWrapper");
    this.toolTipPopUp.classList.add("toolTipPopUp");
    this.triangle.classList.add("triangle");
    this.mount();
  }

  mount() {
    document.querySelector("body").prepend(this.wrapper);
    this.wrapper.appendChild(this.toolTipPopUp);
    this.toolTipPopUp.appendChild(this.triangle);
    this.calculatePosition();
  }

  calculatePosition() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;
    const windowWidth = document.body.scrollWidth;
    const wrapperWidth = this.wrapper.offsetWidth;
    const centerToolTip = (this.wrapper.offsetWidth - this.containerWidth) / 2;
    this.setWidth(wrapperWidth);
    if (this.containerRect.left - centerToolTip <= 0 - scrollLeft) {
      this.leftEdge(scrollLeft);
    } else if (
      this.containerRect.left +
        scrollLeft +
        this.containerWidth +
        centerToolTip >
      windowWidth
    ) {
      this.rightEdge(wrapperWidth, scrollLeft);
    } else {
      this.noEdges(centerToolTip, scrollLeft);
    }
    this.setTop(scrollTop);
    if (this.wrapper.offsetTop - scrollTop < 0) {
      this.topEdge(scrollTop);
    }
  }

  setWidth(wrapperWidth) {
    this.wrapper.style.width = wrapperWidth + "px";
  }

  leftEdge(scrollLeft) {
    this.triangle.style.left = this.containerWidth / 2 + "px";
    this.wrapper.style.left = this.containerRect.left + scrollLeft + "px";
  }

  rightEdge(wrapperWidth, scrollLeft) {
    this.wrapper.style.left =
      this.containerRect.left +
      this.containerWidth +
      scrollLeft -
      wrapperWidth +
      "px";
    this.triangle.style.left =
      this.wrapper.offsetWidth - this.containerWidth / 2 + "px";
  }

  noEdges(centerToolTip, scrollLeft) {
    this.wrapper.style.left =
      this.containerRect.left + scrollLeft - centerToolTip + "px";
  }

  setTop(scrollTop) {
    this.wrapper.style.top =
      this.containerRect.top + scrollTop - this.wrapper.offsetHeight - 1 + "px";
  }

  topEdge(scrollTop) {
    this.wrapper.style.top =
      this.containerRect.top + scrollTop + this.containerHeight - 1 + "px";
    this.toolTipPopUp.style.marginTop = "15px";
    this.toolTipPopUp.style.marginBottom = "0px";
    this.triangle.style.top = "-30px";
    this.triangle.style.transform = "rotate(180deg)";
  }
=======
    
    constructor() {
        this.wrapper =  undefined;
        this.toolTipPopUp = undefined;
        this.triangle = undefined;
        this.containerWidth = undefined;
        this.containerHeight = undefined;
        this.eventDetector();
    }

    // Event delegation
    eventDetector() {
        this.addTooltips(document);
        const tooltipClasses = ['triangle', 'toolTipWrapper', 'toolTipPopUp', 'toolTip'];
        const tooltipWrapper = document.querySelector('.toolTipWrapper');
        document.body.onmouseover = (event) => {
            let target = event.target.closest('span');
            if (!target) {
                return;
            }
            if (!target.hasAttribute('data-tooltip')) {
                return;
            }
            if (event.fromElement === null) {
                return;
            }
            let fromElementClass = event.fromElement.classList.value;
            if (tooltipClasses.includes(fromElementClass)) {
                return;
            }
            this.detectToolTip(target);
        };
        document.body.onmouseout = (event) => {
            let target = event.target.closest('span');
            let targetPath = event.path;
            if (event.toElement === null) {
                return;
            }
            let toElementClass = event.toElement.classList.value;
            if (!targetPath.includes(tooltipWrapper) && tooltipClasses.includes(toElementClass) ||
            !target && tooltipClasses.includes(toElementClass)) {
                return;
            }
            this.deleteToolTip();
        };
        document.body.onclick = (event) => {
            let target = event.target.closest('span');
            if (!target) {
                return;
            }
            if (!target.hasAttribute('data-tooltip')) {
                return;
            }
            this.switchToolTip(target);
        };
      
    }

    addTooltips(root) {
        const allWrappers = root.querySelectorAll('.wrapper');
        const lastWrapper = allWrappers[allWrappers.length - 1].querySelectorAll('[data-tooltip]');
        lastWrapper.forEach((tooltip) => {
            tooltip.classList.add('toolTip');
        });
    }

    // Detect the hovered or clicked tooltip container
    detectToolTip(container) {
        const toolTipText = container.dataset.tooltip;
        this.containerRect = container.getBoundingClientRect();
        this.containerWidth = container.offsetWidth;
        this.containerHeight = container.offsetHeight;
        this.render(toolTipText);
    }
    
    // Switcher for touch screen devices
    switchToolTip(container) {
        if (container.classList.contains('Off')) {
            container.classList.remove('Off');
            this.detectToolTip(container);
        }
        else {
            container.classList.add('Off');
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
        this.calculatePosition();
    }
    
    // Calculate tooltip position
    calculatePosition() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollLeft = document.documentElement.scrollLeft;
        const windowWidth = document.body.scrollWidth;
        const wrapperWidth = this.wrapper.offsetWidth;
        const centerToolTip = (this.wrapper.offsetWidth - this.containerWidth) / 2;
        // Set Width
        this.setWidth(wrapperWidth);
        // Left Edge
        if (this.containerRect.left - centerToolTip <= 0 - scrollLeft) {
            this.leftEdge(scrollLeft);
        }
        // Right Edge
        else if (this.containerRect.left + scrollLeft + this.containerWidth + centerToolTip > windowWidth) {
            this.rightEdge(wrapperWidth, scrollLeft);
        }
        // No edges
        else {
            this.noEdges(centerToolTip, scrollLeft);
        }
        // Set Top
        this.setTop(scrollTop);
        // Top Edge
        if (this.wrapper.offsetTop - scrollTop < 0) {
            this.topEdge(scrollTop);
        }
    }

    setWidth(wrapperWidth) {
        this.wrapper.style.width = wrapperWidth + 'px';
    }
    
    leftEdge(scrollLeft) {
        this.triangle.style.left = this.containerWidth / 2 + 'px';
        this.wrapper.style.left = this.containerRect.left + scrollLeft + 'px';
    }
    
    rightEdge(wrapperWidth, scrollLeft) {
        this.wrapper.style.left = this.containerRect.left + this.containerWidth + scrollLeft - wrapperWidth + 'px';
        this.triangle.style.left = this.wrapper.offsetWidth - (this.containerWidth / 2) + 'px';
    }

    noEdges(centerToolTip, scrollLeft) {
        this.wrapper.style.left = this.containerRect.left + scrollLeft - centerToolTip + 'px';
    }
    
    setTop(scrollTop) {
        this.wrapper.style.top = this.containerRect.top + scrollTop - this.wrapper.offsetHeight - 1 + 'px';
    }
    
    topEdge(scrollTop) {
        this.wrapper.style.top = this.containerRect.top + scrollTop + this.containerHeight - 1 + 'px';
        this.toolTipPopUp.style.marginTop = '15px';
        this.toolTipPopUp.style.marginBottom = '0px';
        this.triangle.style.top = '-30px';
        this.triangle.style.transform = 'rotate(180deg)';
    } 
    
>>>>>>> df4dcb9bd00628293e732034ecc4e94dd475a3a9
}

const bookingTooltips = new ToolTip();
