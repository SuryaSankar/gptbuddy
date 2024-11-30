import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Function to extract questions from the ChatGPT DOM
    const extractQuestions = () => {
      const articles = document.querySelectorAll("article");
      const userQuestions = [];
      articles.forEach(article=>{
        const articleType = article.children[0].textContent;
        if(articleType=='You said:'){
          const userQuestion = article.getElementsByClassName("whitespace-pre-wrap")[0];
          userQuestions.push(userQuestion);
        }
      });
      setQuestions(userQuestions);
    };

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
        Questions
      </h2>
      <ul style={{ listStyle: "none", padding: "10px", margin: "0" }}>
        {questions.map((question, index) => (
          <li
            key={index}
            style={{
              padding: "10px",
              borderBottom: "3px solid #ddd",
              cursor: "pointer",
            }}
            onClick={() => scrollToQuestion(question)}
          >
            {question.textContent}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;