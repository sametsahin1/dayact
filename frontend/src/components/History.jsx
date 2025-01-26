import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLogs } from '../features/logs/logSlice';
import './History.css';

function History() {
    const dispatch = useDispatch();
    const { logs, isLoading, isError, message } = useSelector((state) => state.logs);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(getLogs());
        }
    }, [dispatch, user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {message}</div>;
    }

    return (
        <div className="history-container">
            <h3>History</h3>
            <div className="history-list">
                {logs.map((log) => (
                    <div key={log._id} className={`history-item ${log.type}`}>
                        <div className="history-content">
                            <span className="activity-name">
                                {log.description}
                            </span>
                            {log.points !== 0 && (
                                <span className={`points ${log.points >= 0 ? 'positive' : 'negative'}`}>
                                    {log.points >= 0 ? '+' : ''}{log.points} points
                                </span>
                            )}
                        </div>
                        <div className="history-date">
                            {new Date(log.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default History; 