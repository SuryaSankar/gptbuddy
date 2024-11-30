import React, { useState } from "react";
import ReactDOM from "react-dom";
import Sidebar from "./Sidebar";

const sidebarId = "gptbuddy-sidebar";

// Main component to manage sidebar visibility
const App = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  // Listen for messages from the background script or popup
  React.useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "toggle_sidebar") {
        toggleSidebar();
      }
    });
  }, []);

  return (
    <Sidebar
      onClose={toggleSidebar}
      isSidebarVisible={isSidebarVisible}
    />
  );
};

// Mount the sidebar toggle button (and sidebar container)
const mountSideBar = () => {
  const container = document.createElement("div");
  container.id = sidebarId;
  document.body.appendChild(container);
  ReactDOM.render(<App />, container);
};

mountSideBar();
