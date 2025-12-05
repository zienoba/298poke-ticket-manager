import * as React from 'react';
import {
    makeStyles,
    Title1,
    Button,
    tokens,
    Dropdown,
    Option,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Input,
    Title3
} from '@fluentui/react-components';
import type { SelectionEvents, OptionOnSelectData, InputOnChangeData } from '@fluentui/react-components';
import { ArrowLeftRegular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Ticket } from '../types';

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
    controls: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    section: {
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: '8px',
    },
    inputGroup: {
        display: 'flex',
        gap: '20px',
        alignItems: 'end',
    }
});

export const Admin = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const [activityType, setActivityType] = React.useState<string>('card_game');
    const [ticketList, setTicketList] = React.useState<Ticket[]>([]);

    // Create Ticket State
    const [createActivityType, setCreateActivityType] = React.useState<string>('card_game');
    const [createTicketId, setCreateTicketId] = React.useState<string>('');

    const fetchTicketList = async () => {
        try {
            const data = await api.fetchTicketList(activityType);
            setTicketList(data.ticket_list);
        } catch (error) {
            console.error('Error fetching ticket list:', error);
            setTicketList([]);
        }
    };

    const handleCall = async (ticketId: number) => {
        try {
            await api.callTicket(ticketId, activityType);
        } catch (error) {
            console.error('Error calling ticket:', error);
        }
    };

    const handleCollect = async (ticketId: number) => {
        try {
            await api.collectTicket(ticketId, activityType);
            fetchTicketList();
        } catch (error) {
            console.error('Error collecting ticket:', error);
        }
    };

    const handleCreateTicket = async () => {
        if (!createTicketId) return;
        try {
            await api.createTicket(parseInt(createTicketId, 10), createActivityType);
            setCreateTicketId('');
            // If created ticket matches current view, refresh list
            if (createActivityType === activityType) {
                fetchTicketList();
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    React.useEffect(() => {
        fetchTicketList();
    }, [activityType]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button icon={<ArrowLeftRegular />} onClick={() => navigate('/')}>
                    Back
                </Button>
                <Title1>Administrator Dashboard</Title1>
                <Button onClick={() => navigate('/record')} style={{ marginLeft: 'auto' }}>
                    View Records
                </Button>
            </div>

            <div className={styles.controls}>
                {/* Create Ticket Section */}
                <div className={styles.section}>
                    <Title3 style={{ marginBottom: '15px', display: 'block' }}>Create Ticket</Title3>
                    <div className={styles.inputGroup}>
                        <div>
                            <label id="create-activity-label" style={{ display: 'block', marginBottom: '8px' }}>
                                Activity Type
                            </label>
                            <Dropdown
                                aria-labelledby="create-activity-label"
                                value={createActivityType === 'card_game' ? 'カード' : '実機'}
                                selectedOptions={[createActivityType]}
                                onOptionSelect={(_e: SelectionEvents, data: OptionOnSelectData) => {
                                    if (data.optionValue) {
                                        setCreateActivityType(data.optionValue);
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
                        <div>
                            <label id="create-ticket-id-label" style={{ display: 'block', marginBottom: '8px' }}>
                                Ticket ID
                            </label>
                            <Input
                                aria-labelledby="create-ticket-id-label"
                                value={createTicketId}
                                onChange={(_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setCreateTicketId(data.value)}
                                type="number"
                            />
                        </div>
                        <Button appearance="primary" onClick={handleCreateTicket}>Create Ticket</Button>
                    </div>
                </div>

                {/* Ticket List Section */}
                <div>
                    <Title3 style={{ marginBottom: '15px', display: 'block' }}>Ticket List</Title3>
                    <div style={{ marginBottom: '15px' }}>
                        <label id="activity-type-label" style={{ display: 'block', marginBottom: '8px' }}>
                            Select Activity to View
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

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Ticket ID</TableHeaderCell>
                                <TableHeaderCell>Activity Type</TableHeaderCell>
                                <TableHeaderCell>Order</TableHeaderCell>
                                <TableHeaderCell>Actions</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ticketList.map((ticket) => (
                                <TableRow key={ticket.ticket_id}>
                                    <TableCell>{ticket.ticket_id}</TableCell>
                                    <TableCell>{ticket.activity_type}</TableCell>
                                    <TableCell>{ticket.order}</TableCell>
                                    <TableCell>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Button onClick={() => handleCall(ticket.ticket_id)}>Call</Button>
                                            <Button appearance="primary" onClick={() => handleCollect(ticket.ticket_id)}>Collect</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
