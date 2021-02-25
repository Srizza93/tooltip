class Tool_tip {
    constructor() {
        this.toolTip = document.getElementsByClassName("tool_tip");
        this.toolTip_text = null;
        this.text = "200 x 200";
        this.text_marginLeft = 0;
        this.loop();
    }
    
    // Assign class to the new span and center it to the div
    rendering() {
        this.toolTip_text.className += "tool_tip_text";
        this.calculations();
        this.toolTip_text.style.marginLeft = - this.text_marginLeft + 'px';
    }
    
    // Create the new span and append it to the tool_tip class elements
    createNewElement(div) {
        this.toolTip_text = document.createElement("span");
        this.toolTip_text.appendChild(document.createTextNode(this.text));
        div.appendChild(this.toolTip_text);
        this.rendering();
    }
    
    calculations() {
        this.text_marginLeft = this.toolTip_text.offsetWidth / 2;
    }

    loop() {
        for (let i = 0; i < this.toolTip.length; i++) {
            this.createNewElement(this.toolTip[i]);
        }
    }
}

new Tool_tip();
