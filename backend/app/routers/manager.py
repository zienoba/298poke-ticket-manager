from fastapi import APIRouter
from ..schemas.manager import Ticket, TicketListResponse, TicketCreateRequest, TicketCreateResponse, StatusCode, TicketCallRequest, TicketCallResponse, TicketAvailableRequest, TicketAvailableResponse, TicketRecord, TicketRecordListResponse
from ..schemas.enums import Activity, WebSocketType
from ..models.ticket import TicketState
from ..models.record import TicketLog   
from ..utils.connection_manager import manager
router = APIRouter()

@router.get("/manager/ticket_list/{activity_type}", response_model=TicketListResponse)
async def ticket_list(activity_type: Activity):
    ticket_list = await TicketState.filter(activity_type=activity_type, is_distributed=True).order_by("distribution_time")
    response = [Ticket(ticket_id=ticket.ticket_id, order=order, activity_type=ticket.activity_type) for order, ticket in enumerate(ticket_list, start=1)]
    return TicketListResponse(ticket_list=response, status=StatusCode.BADREQUEST)

@router.post("/manager/create", response_model=TicketCreateResponse)
async def create_ticket(ticket_data: TicketCreateRequest):
    ticket, created = await TicketState.get_or_create(ticket_id=ticket_data.ticket_id, activity_type=ticket_data.activity_type)
    if not ticket.is_distributed:
        ticket.is_distributed = True
        await ticket.save()
    else:
        return TicketCreateResponse(request=ticket_data, status=StatusCode.BADREQUEST)
    return TicketCreateResponse(request=ticket_data, status=StatusCode.OK)

@router.put("/manager/call", response_model=TicketCallResponse)
async def call_number(called_ticket: TicketCallRequest):
    ticket = await TicketState.get_or_none(ticket_id=called_ticket.ticket_id, activity_type=called_ticket.activity_type)
    if ticket is None or not ticket.is_distributed:
        return TicketCallResponse(request=called_ticket, status=StatusCode.BADREQUEST)
    await manager.broadcast({"type": WebSocketType.CALL,"ticket_id": ticket.ticket_id, "activity_type": ticket.activity_type, "is_distributed": ticket.is_distributed})
    return TicketCallResponse(request=called_ticket, status=StatusCode.OK)

@router.put("/manager/collect", response_model=TicketAvailableResponse)
async def collect_ticket(ticket_data: TicketAvailableRequest):
    ticket = await TicketState.get_or_none(ticket_id=ticket_data.ticket_id, activity_type=ticket_data.activity_type, is_distributed=True)
    if ticket is None:
        return TicketAvailableResponse(request=ticket_data, status=StatusCode.BADREQUEST)
    await manager.broadcast({"type": WebSocketType.CLEAR, "ticket_id": ticket_data.ticket_id, "activity_type": ticket_data.activity_type, "is_distributed": ticket.is_distributed})
    await TicketLog.create(activity_type=ticket.activity_type, distribution_time=ticket.distribution_time)
    ticket.is_distributed = False
    await ticket.save()
    return TicketAvailableResponse(request=ticket_data, status=StatusCode.OK)

@router.get("/manager/record", response_model=TicketRecordListResponse)
async def get_record():
    ticket_log_list = await TicketLog.all()
    return TicketRecordListResponse(status = StatusCode.OK,ticket_record_list=[TicketRecord(activity_type=ticket_log.activity_type, distribution_time=ticket_log.distribution_time, call_time=ticket_log.call_time) for ticket_log in ticket_log_list])
