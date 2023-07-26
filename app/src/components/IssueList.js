import { useState } from 'react';

import './IssueList.css'
import IssueListItem from './IssueListItem';

const IssueList = ({issues, onIssueClick}) => {
  const [selectedId, setSelectedId] = useState("");

  const issueListItemClickHandler = (issue_number) => {
    setSelectedId(issue_number);
    onIssueClick(issue_number);
  }
  return (
    <ul className="issue-list">
      {issues.map(issue => (
        <IssueListItem
          key={issue.id}
          issue_number={issue.number}
          selected={selectedId === issue.number ? true : false}
          onClickIssue={issueListItemClickHandler}
        >
          {`${issue.number}: ${issue.title}`}
        </IssueListItem>
      ))}

    </ul>
  );
};

export default IssueList;