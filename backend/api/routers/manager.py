from fastapi import APIRouter
from schemas.manager import Ticket, GetTicketListResponce, CreateTicketRequest, CreateTicketResponce, StatusCode, CallNumberRequest, CallNumberResponce 
from schemas.ticket import Activity
from uuid import uuid4, UUID
router = APIRouter()

@router.get("/manager", response_model=GetTicketListResponce)
async def ticket_list():
    return GetTicketListResponce(ticket_list=[Ticket(uuid=None, ticket_id=0, order=0, activity_type=Activity.CARD)])

@router.post("/manager", response_model=CreateTicketResponce)
async def create_ticket(ticket_data: CreateTicketRequest):
    return CreateTicketResponce(request=ticket_data, status=StatusCode.OK)

@router.put("/manager", response_model=CallNumberResponce)
async def call_number(called_ticket: CallNumberRequest):
    return CallNumberResponce(request=called_ticket, status=StatusCode.OK)