import * as React from 'react';
import {
    makeStyles,
    Title1,
    Button,
    tokens,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Dropdown,
    Option
} from '@fluentui/react-components';
import type { SelectionEvents, OptionOnSelectData } from '@fluentui/react-components';
import { ArrowLeftRegular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { TicketRecord } from '../types';

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
    },
});

export const Record = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const [records, setRecords] = React.useState<TicketRecord[]>([]);
    const [selectedActivity, setSelectedActivity] = React.useState<string>('all');

    const fetchRecords = async () => {
        try {
            const data = await api.fetchRecords();
            setRecords(data.ticket_record_list);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    React.useEffect(() => {
        fetchRecords();
    }, []);

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString();
    };

    const filteredRecords = selectedActivity === 'all'
        ? records
        : records.filter(record => record.activity_type === selectedActivity);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button icon={<ArrowLeftRegular />} onClick={() => navigate('/admin')}>
                    Back to Admin
                </Button>
                <Title1>Ticket Records</Title1>
            </div>

            <div className={styles.controls}>
                <label id="filter-activity-label" style={{ display: 'block', marginBottom: '8px' }}>
                    Filter by Activity
                </label>
                <Dropdown
                    aria-labelledby="filter-activity-label"
                    value={selectedActivity === 'all' ? 'All' : (selectedActivity === 'card_game' ? 'カード' : '実機')}
                    selectedOptions={[selectedActivity]}
                    onOptionSelect={(_e: SelectionEvents, data: OptionOnSelectData) => {
                        if (data.optionValue) {
                            setSelectedActivity(data.optionValue);
                        }
                    }}
                >
                    <Option value="all" text="All">All</Option>
                    <Option value="card_game" text="カード">カード</Option>
                    <Option value="game_console" text="実機">実機</Option>
                </Dropdown>
                <div style={{ marginTop: '10px' }}>
                    <strong>Total Records: {filteredRecords.length}</strong>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Activity Type</TableHeaderCell>
                        <TableHeaderCell>Distribution Time</TableHeaderCell>
                        <TableHeaderCell>Call Time</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredRecords.map((record, index) => (
                        <TableRow key={index}>
                            <TableCell>{record.activity_type}</TableCell>
                            <TableCell>{formatDate(record.distribution_time)}</TableCell>
                            <TableCell>{formatDate(record.call_time)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
