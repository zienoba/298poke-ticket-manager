from fastapi import APIRouter
from schemas.manager import Ticket, TicketListResponse, TicketCreateRequest, TicketCreateResponse, StatusCode, TicketCallRequest, TicketCallResponse 
from schemas.ticket import Activity
from models import ticket
router = APIRouter()

@router.get("/manager", response_model=TicketListResponse)
async def ticket_list():
    return TicketListResponse(ticket_list=[Ticket(uuid=None, ticket_id=0, order=0, activity_type=Activity.CARD)])

@router.post("/manager", response_model=TicketCreateResponse)
async def create_ticket(ticket_data: TicketCreateRequest):
    return TicketCreateResponse(request=ticket_data, status=StatusCode.OK)

@router.put("/manager", response_model=TicketCallResponse)
async def call_number(called_ticket: TicketCallRequest):
    return TicketCallResponse(request=called_ticket, status=StatusCode.OK)