import './App.css';
import { useEffect, useState } from 'react';
import IssueList from './components/IssueList';
import IssueDetail from './components/IssueDetail';

function App() {
  const API_URL = "http://127.0.0.1:8000/api/v1";
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState({
    title: "",
    body: "",
  });
  useEffect(() => {
    const getIssues = async () => {
      const response = await fetch(`${API_URL}/issues`);
      // TODO: Handle unsuccessfull response
      const json = await response.json();
      if(json.error) {
        setIssues([{ id: "error", number: "error", title: json.error}]);
      } else {
        setIssues(json);
      }
    }
    getIssues()
  }, []);

  const issueClickHandler = async (issue_number) => {
      const response = await fetch(`${API_URL}/issues/${issue_number}`);
      // TODO: Handle unsuccessfull response
      const json = await response.json();
      setSelectedIssue({title: json.title, body: json.body})

  }
  return (
    <div className="App row">
      <div className="column">
        <IssueList issues={issues} onIssueClick={issueClickHandler} />
      </div>
      <div className="column">
        <IssueDetail title={selectedIssue.title} body={selectedIssue.body} />
      </div>
    </div>
  );
}

export default App;
