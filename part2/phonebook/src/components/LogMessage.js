const LogMessage = ({ logMessage }) => {

    if (logMessage === null) {
        return null
    }

    return (
        <div className="message">
            {logMessage}
        </div>
    )
}

export default LogMessage