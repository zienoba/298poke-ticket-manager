import type { Ticket, TicketRecord } from '../types';

const API_BASE_URL = 'http://localhost:8000';

export const api = {
    fetchQueueStatus: async (activityType: string, ticketId: string) => {
        const response = await fetch(`${API_BASE_URL}/ticket/${activityType}/${ticketId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    fetchTicketList: async (activityType: string): Promise<{ ticket_list: Ticket[] }> => {
        const response = await fetch(`${API_BASE_URL}/manager/ticket_list/${activityType}`);
        if (!response.ok) {
            throw new Error('Failed to fetch ticket list');
        }
        return response.json();
    },

    callTicket: async (ticketId: number, activityType: string) => {
        const response = await fetch(`${API_BASE_URL}/manager/call`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ticket_id: ticketId,
                activity_type: activityType,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to call ticket');
        }
        return response;
    },

    collectTicket: async (ticketId: number, activityType: string) => {
        const response = await fetch(`${API_BASE_URL}/manager/collect`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ticket_id: ticketId,
                activity_type: activityType,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to collect ticket');
        }
        return response;
    },

    createTicket: async (ticketId: number, activityType: string) => {
        const response = await fetch(`${API_BASE_URL}/manager/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ticket_id: ticketId,
                activity_type: activityType,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to create ticket');
        }
        return response;
    },

    fetchRecords: async (): Promise<{ ticket_record_list: TicketRecord[] }> => {
        const response = await fetch(`${API_BASE_URL}/manager/record`);
        if (!response.ok) {
            throw new Error('Failed to fetch records');
        }
        return response.json();
    }
};
