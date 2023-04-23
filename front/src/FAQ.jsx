import React, { useState } from "react";

const FAQ = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  const renderedQuestions = faqData.map((question, index) => {
    const active = index === activeIndex ? "active" : "";

    return (
      <div key={question.title} className="question">
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {question.title}
        </div>
        <div className={`content ${active}`}>
          <p>{question.content}</p>
        </div>
      </div>
    );
  });

  return <div className="ui styled accordion">{renderedQuestions}</div>;
};

export default FAQ;
