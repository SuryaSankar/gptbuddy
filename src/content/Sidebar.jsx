import React, { useEffect, useState } from "react";
import { extractQuestionsForChatGPT, extractQuestionsForClaudeAI, extractQuestionsForPerplexityAI, extractQuestionsForGemini } from "./utils/dom_utils";

const Sidebar = ({onClose, isSidebarVisible}) => {
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
          case 'gemini.google.com':
            setQuestions(extractQuestionsForGemini());
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
    <>
      {/* Toggle Button */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: "50%",
          right: isSidebarVisible ? "300px" : "0",
          transform: "translateY(-50%)",
          width: "30px",
          height: "120px",
          backgroundColor: "#438c87",
          color: "#fff",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          writingMode: "vertical-rl",
          textAlign: "center",
          cursor: "pointer",
          zIndex: 10000,
          borderRadius: "5px 0 0 5px",
        }}
      >
        {isSidebarVisible ? "Hide GPTBuddy" : "Show GPTBuddy"}
      </div>

      {isSidebarVisible && <div
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          width: "300px",
          height: "100%",
          backgroundColor: "#ECECEC",
          borderLeft: "1px solid #ddd",
          boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.2)",
          zIndex: 9999,
          overflowY: "auto",
        }}
      >
        <h2 style={{ padding: "10px", margin: "0", backgroundColor: "#438c87", color: "#fff" }}>
          {questions.length} {questions.length == 1 ? 'Question' : 'Questions'}
        </h2>
        {
          questions.length == 0 && <div style={{padding: "10px",}}>
            Open a conversation thread or start a new conversation to view the questions in that conversation
            </div>
        }
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
            </li>
          ))}
        </ul>
      </div>}
    </>
  );
};

export default Sidebar;