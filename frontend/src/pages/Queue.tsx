import * as React from 'react';
import { makeStyles, Title1, Button, tokens, Dropdown, Option, Input } from '@fluentui/react-components';
import type { SelectionEvents, OptionOnSelectData, InputOnChangeData } from '@fluentui/react-components';
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
});

import { api } from '../services/api';

export const Queue = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const [activityType, setActivityType] = React.useState<string>('card_game');
    const [ticketId, setTicketId] = React.useState<string>('');
    const [queueOrder, setQueueOrder] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const fetchQueueStatus = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            console.log(`Fetching queue status for ${activityType} / ${ticketId}`);
            const data = await api.fetchQueueStatus(activityType, ticketId);
            console.log('Response data:', data);

            if (data && typeof data.order === 'number' && data.order >= 0) {
                setQueueOrder(data.order);
            } else {
                console.warn('Invalid data format received:', data);
                setQueueOrder(null);
                setError('チケットが存在しません'); // Error for invalid data format
            }
        } catch (error) {
            console.error('Error fetching queue status:', error);
            setQueueOrder(null);
            setError('チケットが存在しません'); // Catch block error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button icon={<ArrowLeftRegular />} onClick={() => navigate('/')}>
                    Back
                </Button>
                <Title1>Waiting Number</Title1>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label id="activity-type-label" style={{ display: 'block', marginBottom: '8px' }}>
                    Activity Type
                </label>
                <Dropdown
                    aria-labelledby="activity-type-label"
                    value={activityType === 'card_game' ? 'カード' : '実機'}
                    selectedOptions={[activityType]}
                    onOptionSelect={(_e: SelectionEvents, data: OptionOnSelectData) => {
                        if (data.optionValue) {
                            setActivityType(data.optionValue);
                        }
                    }}
                >
                    <Option value="card_game" text="カード">
                        カード
                    </Option>
                    <Option value="game_console" text="実機">
                        実機
                    </Option>
                </Dropdown>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label id="ticket-id-label" style={{ display: 'block', marginBottom: '8px' }}>
                    Ticket ID
                </label>
                <Input
                    aria-labelledby="ticket-id-label"
                    value={ticketId}
                    onChange={(_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setTicketId(data.value)}
                />
            </div>
            <Button onClick={fetchQueueStatus} disabled={loading}>
                {loading ? 'Checking...' : 'Check Status'}
            </Button>
            {error && (
                <div style={{ marginTop: '20px' }}>
                    <Title1>{error}</Title1>
                </div>
            )}
            {queueOrder !== null && (
                <div style={{ marginTop: '20px' }}>
                    <Title1>Your Order: {queueOrder}</Title1>
                </div>
            )}
            <p>Queue status goes here.</p>
        </div>
    );
};
