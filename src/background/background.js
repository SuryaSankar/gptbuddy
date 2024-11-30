chrome.commands.onCommand.addListener(command=>{
    console.log(`got command ${command}`);
    if(command=="toggle_sidebar"){
        chrome.tabs.query({active: true, currentWindow: true}, tabs=>{
            chrome.tabs.sendMessage(tabs[0].id, {"type": "toggle_sidebar"});
        });
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { type: "toggle_sidebar" });
});