class ToolTip {
  constructor() {
    this.wrapper = undefined;
    this.toolTipPopUp = undefined;
    this.triangle = undefined;
    this.containerWidth = undefined;
    this.containerHeight = undefined;
    this.eventDetector();
    // this.addTooltips(document);
    // document.addEventListener('DOMContentLoaded', this.detectDynamicContentLoaded.bind(this));
  }

  // 1st Method
  // Event delegation
  eventDetector() {
    const container = document.querySelectorAll(".wrapper");
    const lastContainer = container[container.length - 1];
    lastContainer.onmouseover = (event) => {
      let target = event.target;
      if (!target.hasAttribute("data-tooltip")) {
        return;
      }
      this.addEvents(target);
    };
  }

  // 2nd Method
  // Detect changes in DOM - MUTATION OBSERVER
  detectDynamicContentLoaded() {
    const toolTipClasses = ["toolTipWrapper", "toolTipPopUp", "triangle"];
    const elementToObserve = document.body;
    const config = { childList: true, subtree: true };
    this.callBackObserver = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.addedNodes.length > 0) {
          const containerClass = mutation.addedNodes.item(0).classList.value;
          if (!toolTipClasses.includes(containerClass)) {
            this.addTooltips(document);
          }
        }
      }
    };
    const observer = new MutationObserver(this.callBackObserver);
    observer.observe(elementToObserve, config);
  }

  // 3rd Method
  // Search for the last wrapper and add tooltips
  addTooltips(root) {
    const allWrappers = root.querySelectorAll(".wrapper");
    const lastWrapper =
      allWrappers[allWrappers.length - 1].querySelectorAll("[data-tooltip]");
    lastWrapper.forEach((tooltip) => {
      this.selectContainers(tooltip);
      this.addEvents(tooltip);
    });
  }

  // Add class to containers
  selectContainers(container) {
    container.classList.add("toolTip");
  }

  addEvents(container) {
    container.addEventListener("mouseenter", this.detectToolTip.bind(this));
    container.addEventListener("mouseleave", this.mouseLeave.bind(this));
    container.addEventListener("click", this.switchToolTip.bind(this));
  }

  // Detect the hovered or clicked tooltip container
  detectToolTip(container) {
    const toolTipText = container.currentTarget.dataset.tooltip;
    this.containerRect = container.currentTarget.getBoundingClientRect();
    this.containerWidth = container.currentTarget.offsetWidth;
    this.containerHeight = container.currentTarget.offsetHeight;
    this.render(toolTipText);
  }

  // Delete the existing tooltip and create a new one when wrapper is hovered
  // Delete when leaving the wrapper
  mouseLeave(container) {
    const clone = container.target.cloneNode(true);
    container.target.parentNode.replaceChild(clone, container.target);
    this.deleteToolTip();
    this.wrapper.addEventListener("mouseenter", this.mount.bind(this));
    this.wrapper.addEventListener("mouseleave", this.deleteToolTip.bind(this));
  }

  // Switcher for touch screen devices
  switchToolTip(container) {
    if (container.target.classList.contains("Off")) {
      container.target.classList.remove("Off");
      this.detectToolTip(container);
    } else {
      container.target.classList.add("Off");
      this.deleteToolTip();
    }
  }

  deleteToolTip() {
    document
      .querySelectorAll(".toolTipWrapper")
      .forEach((tooltip) => tooltip.remove());
  }

  render(toolTipText) {
    // Create new elements
    this.wrapper = document.createElement("div");
    this.toolTipPopUp = document.createElement("div");
    this.triangle = document.createElement("div");
    // Add text in tooltip
    this.toolTipPopUp.appendChild(document.createTextNode(toolTipText));
    // Add classes
    this.wrapper.classList.add("toolTipWrapper");
    this.toolTipPopUp.classList.add("toolTipPopUp");
    this.triangle.classList.add("triangle");
    this.mount();
  }

  // Mount into DOM
  mount() {
    document.querySelector("body").prepend(this.wrapper);
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
    else if (
      this.containerRect.left +
        scrollLeft +
        this.containerWidth +
        centerToolTip >
      windowWidth
    ) {
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
}

const bookingTooltips = new ToolTip();
