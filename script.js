class Tool_tip {
    constructor() {
        this.toolTip = document.querySelector(".tool_tip");
        this.toolTip_text = document.createElement("span");
        this.text = "200 x 200";
        this.text_marginLeft = 0;
        this.createNewElement();
    }
    
    // Assign class to the new span and center it to the div
    rendering() {
        this.toolTip_text.className += "tool_tip_text";
        this.calculations();
        this.toolTip_text.style.marginLeft = - this.text_marginLeft + 'px';
    }
    
    // Create the new span and append it to the tool_tip class elements
    createNewElement() {
        this.toolTip_text.appendChild(document.createTextNode(this.text));
        this.toolTip.appendChild(this.toolTip_text);
        this.rendering();
    }
    
    calculations() {
        this.text_marginLeft = this.toolTip_text.offsetWidth / 2;
    }
}

new Tool_tip();
