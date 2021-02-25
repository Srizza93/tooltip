class Tool_tip {
  
    constructor() {
        this.tool_tip = document.querySelector(".tool_tip_text");
        this.toolTip_width = this.tool_tip.offsetWidth;
        this.calculations();
    }

    rendering() {
        this.tool_tip.style.marginLeft = this.toolTip_width + 'px';
    }

    calculations() {
        this.toolTip_width = - this.toolTip_width / 2;
        this.rendering();
    }
}

new Tool_tip();
