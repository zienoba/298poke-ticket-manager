import * as React from 'react';
import { makeStyles, Title1, tokens, Card, Text, Button } from '@fluentui/react-components';
import { ArrowLeftRegular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        padding: '40px',
        backgroundColor: tokens.colorNeutralBackground1,
        minHeight: '100vh',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '40px',
    },
    status: {
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    card: {
        marginTop: '20px',
        padding: '20px',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
});

interface WebSocketMessage {
    type: 'CALL' | 'CLEAR';
    ticket_id?: number;
    activity_type?: string;
    is_distributed?: boolean;
}

export const Display = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const [messages, setMessages] = React.useState<WebSocketMessage[]>([]);
    const [status, setStatus] = React.useState<string>('Disconnected');

    React.useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/display');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
            setStatus('Connected');
        };

        ws.onmessage = (event) => {
            console.log('Received message:', event.data);
            try {
                const data: WebSocketMessage = JSON.parse(event.data);
                if (data.type === 'CALL') {
                    setMessages((prev) => {
                        if (prev.length > 0 && prev[0].ticket_id === data.ticket_id && prev[0].activity_type === data.activity_type) {
                            return prev;
                        }
                        return [data, ...prev];
                    });
                } else if (data.type === 'CLEAR') {
                    setMessages((prev) => prev.filter((msg) =>
                        !(msg.ticket_id === data.ticket_id && msg.activity_type === data.activity_type)
                    ));
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
            setStatus('Disconnected');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setStatus('Error');
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button icon={<ArrowLeftRegular />} onClick={() => navigate('/')}>
                    Back
                </Button>
                <Title1>Call Display</Title1>
            </div>
            <div className={styles.status}>
                Status: <span style={{ color: status === 'Connected' ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1 }}>{status}</span>
            </div>

            {messages.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                    <Title1 as="h2" style={{ marginBottom: '20px' }}>Current Call</Title1>
                    <Card className={styles.card} style={{ padding: '40px', backgroundColor: tokens.colorBrandBackground2 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                            <Text size={900} weight="bold">Ticket ID: {messages[0].ticket_id}</Text>
                            <Text size={600}>Activity: {messages[0].activity_type}</Text>
                        </div>
                    </Card>
                </div>
            )}

            {messages.length > 1 && (
                <div>
                    <Title1 as="h3" style={{ marginBottom: '20px', fontSize: '24px' }}>History</Title1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {messages.slice(1).map((msg, index) => (
                            <Card key={index} className={styles.card} style={{ padding: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text size={400} weight="semibold">Ticket ID: {msg.ticket_id}</Text>
                                    <Text size={300}>{msg.activity_type}</Text>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
