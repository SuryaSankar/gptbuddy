import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./Sidebar";

const sidebarId = "gptbuddy-sidebar";

const toggleSidebar = () => {
    const existingSidebar = document.getElementById(sidebarId);
    if(existingSidebar){
        existingSidebar.remove();
    } else {
        const mountNode = document.createElement("div");
        mountNode.id = sidebarId;
        document.body.appendChild(mountNode);
        ReactDOM.render(<Sidebar />, mountNode);
    }
}

chrome.runtime.onMessage.addListener(message=>{
    console.log(`Received message ${message.type}`)
    if(message.type=='toggle_sidebar'){
        toggleSidebar();
    }
})

