class Tool_tip {
    constructor() {
        this.toolTip = document.querySelectorAll("div.tool_tip");
        this.toolTip_text = undefined;
        this.text = "200 x 200";
        this.text_marginLeft = 0;
        this.textWidth = "";
        this.loop();
    }
    
    // Loop through all divs in the page with tool_tip class name
    loop() {
        this.toolTip.forEach((div) => this.createNewElement(div));
    }
    
    // Create the new span and append it to the tool_tip class elements
    createNewElement(div) {
        this.toolTip_text = document.createElement("span");
        this.toolTip_text.appendChild(document.createTextNode(this.text));
        div.appendChild(this.toolTip_text);
        this.rendering();
    }
    
    // Assign class to the new span and center it to the div
    rendering() {
        this.toolTip_text.className = "tool_tip_text";
        this.calculations();
        this.toolTip_text.style.marginLeft = - this.text_marginLeft + 'px';
    }
    
    calculations() {
        this.text_marginLeft = this.toolTip_text.offsetWidth / 2;
    }

}

new Tool_tip();
