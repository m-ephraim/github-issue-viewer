import ReactMarkdown from 'react-markdown'

const IssueDetail = ({title, body}) => {

    return (
        <>
            <h1><ReactMarkdown>{title}</ReactMarkdown></h1>
            <ReactMarkdown>{body}</ReactMarkdown>
        </>
    )
}

export default IssueDetail;