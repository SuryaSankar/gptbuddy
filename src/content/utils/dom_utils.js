export const extractQuestionsForChatGPT = () => {
    const articles = document.querySelectorAll("article");
    const userQuestions = [];
    articles.forEach(article=>{
        const articleType = article.children[0].textContent;
        if(articleType=='You said:'){
            const userQuestion = article.getElementsByClassName("whitespace-pre-wrap")[0];
            if(userQuestion){
                userQuestions.push(userQuestion);
            }
        }
    });
    return userQuestions;
}

export const extractQuestionsForClaudeAI = () => {
    const elements = document.getElementsByClassName("font-user-message");
    return Array.from(elements).filter(elem=>elem).map(elem=>elem.children[0]).filter(elem=>elem.nodeName=='P');
}

export const extractQuestionsForPerplexityAI = () => {
    const elements = document.getElementsByClassName("group/query");
    return Array.from(elements).filter(elem=>elem);
}

export const extractQuestionsForGemini = () => {
    const elements = document.getElementsByClassName("query-text");
    return Array.from(elements).filter(elem=>elem).map(elem=>elem.children[0]);
}