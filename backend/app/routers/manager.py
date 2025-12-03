from fastapi import APIRouter
from ..schemas.manager import Ticket, TicketListResponse, TicketCreateRequest, TicketCreateResponse, StatusCode, TicketCallRequest, TicketCallResponse, TicketAvailableRequest, TicketAvailableResponse, TicketRecord, TicketRecordListResponse
from ..schemas.ticket import Activity
from ..models.ticket import TicketState
from ..models.record import TicketLog   
from ..utils.connection_manager import manager
router = APIRouter()

@router.get("/manager/ticket_list/{activity_type}", response_model=TicketListResponse)
async def ticket_list(activity_type: Activity):
    ticket_list = await TicketState.filter(activity_type=activity_type, is_available=False).order_by("distribution_time")
    response = [Ticket(ticket_id=ticket.ticket_id, order=order, activity_type=ticket.activity_type) for order, ticket in enumerate(ticket_list, start=1)]
    return TicketListResponse(ticket_list=response)

@router.post("/manager", response_model=TicketCreateResponse)
async def create_ticket(ticket_data: TicketCreateRequest):
    ticket, created = await TicketState.get_or_create(ticket_id=ticket_data.ticket_id, activity_type=ticket_data.activity_type)
    if ticket.is_available:
        ticket.is_available = False
        await ticket.save()
    else:
        return TicketCreateResponse(request=ticket_data, status=StatusCode.BAD_REQUEST)
    return TicketCreateResponse(request=ticket_data, status=StatusCode.OK)

@router.put("/manager", response_model=TicketCallResponse)
async def call_number(called_ticket: TicketCallRequest):
    ticket = await TicketState.get_or_none(ticket_id=called_ticket.ticket_id, activity_type=called_ticket.activity_type)
    if ticket is None:
        return TicketCallResponse(request=called_ticket, status=StatusCode.BAD_REQUEST)
    await manager.broadcast({"ticket_id": ticket.ticket_id, "activity_type": ticket.activity_type, "is_available": ticket.is_available})
    return TicketCallResponse(request=called_ticket, status=StatusCode.OK)

@router.put("/manager/available", response_model=TicketAvailableResponse)
async def available_ticket(ticket_data: TicketAvailableRequest):
    ticket = await TicketState.get_or_none(ticket_id=ticket_data.ticket_id, activity_type=ticket_data.activity_type, is_available=False)
    if ticket is None:
        return TicketAvailableResponse(request=ticket_data, status=StatusCode.BAD_REQUEST)
    await manager.broadcast({"ticket_id": ticket_data.ticket_id, "activity_type": ticket_data.activity_type, "is_available": ticket.is_available})
    await TicketLog.create(activity_type=ticket.activity_type, distribution_time=ticket.distribution_time)
    ticket.is_available = True
    await ticket.save()
    return TicketAvailableResponse(request=ticket_data, status=StatusCode.OK)

@router.get("/manager/record", response_model=TicketRecordListResponse)
async def get_record():
    ticket_log_list = await TicketLog.all()
    return TicketRecordListResponse(ticket_record_list=[TicketRecord(activity_type=ticket_log.activity_type, distribution_time=ticket_log.distribution_time, call_time=ticket_log.call_time) for ticket_log in ticket_log_list])
