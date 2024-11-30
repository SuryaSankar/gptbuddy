import React, { useEffect, useState } from "react";
import { extractQuestionsForChatGPT, extractQuestionsForClaudeAI, extractQuestionsForPerplexityAI } from "./utils/dom_utils";

const Sidebar = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const extractQuestions = () => {
      switch(location.hostname){
          case 'chatgpt.com':
              setQuestions(extractQuestionsForChatGPT());
              break;
          case 'claude.ai':
              setQuestions(extractQuestionsForClaudeAI());
              break;
          case 'www.perplexity.ai':
          case 'perplexity.ai':
              setQuestions(extractQuestionsForPerplexityAI());
              break;
          default:
              console.log("Unsupported host");
      }
    }

    // Extract questions initially
    extractQuestions();

    // Observe the DOM for changes (e.g., new questions added)
    const observer = new MutationObserver(() => {
      extractQuestions();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  // Scroll to the corresponding question
  const scrollToQuestion = (element) => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const trimToWords = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: "0",
        width: "300px",
        height: "100%",
        backgroundColor: "#f4f4f4",
        borderLeft: "1px solid #ddd",
        boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
        overflowY: "auto",
      }}
    >
      <h2 style={{ padding: "10px", margin: "0", backgroundColor: "#000000", color: "#fff" }}>
        {questions.length} {questions.length == 1 ? 'Questions' : 'Question'}
      </h2>
      <ul style={{ listStyle: "none", padding: "10px", margin: "0" }}>
        {questions.map((question, index) => (
          <li
            key={index}
            style={{
              padding: "10px",
              borderBottom: "3px solid #ddd",
              cursor: "pointer",
              position: "relative"
            }}
            onClick={() => scrollToQuestion(question)}
            title={question.textContent}
          >
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {index + 1 }. {trimToWords(question.textContent, 20)}
            </div>
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "105%",
                width: "300px",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                padding: "10px",
                whiteSpace: "normal",
                display: "none", // Hidden by default
                zIndex: 10000,
              }}
              className="tooltip"
            >
              {question.textContent}
            </div>
          </li>
        ))}
      </ul>
      <style>
        {`
          /* Show tooltip on hover */
          li:hover .tooltip {
            display: block;
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;