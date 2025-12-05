export interface Ticket {
    ticket_id: number;
    activity_type: string;
    order: number;
}

export interface TicketRecord {
    activity_type: string;
    distribution_time: string;
    call_time: string;
}

export interface WebSocketMessage {
    type: 'CALL' | 'CLEAR';
    ticket_id?: number;
    activity_type?: string;
    is_distributed?: boolean;
}
