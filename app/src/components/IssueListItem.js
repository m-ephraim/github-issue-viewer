import React from 'react';

import './IssueListItem.css';

const IssueListItem = ({issue_number, selected, onClickIssue, children }) => {



  return (
    <li className={`issue-item${selected ? " selected" : ""}`} onClick={(ev) => { onClickIssue(issue_number)}}>
      {children}
    </li>
  );
};

export default IssueListItem;
