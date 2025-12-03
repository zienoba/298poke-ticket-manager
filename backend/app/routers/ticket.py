from fastapi import APIRouter
from ..schemas.ticket import WaitStatusResponse, Activity
from ..schemas.manager import StatusCode
from ..models.ticket import TicketState
router = APIRouter()

@router.get("/ticket/{activity_type}/{ticket_id}", response_model=WaitStatusResponse)
async def get_wait_num(activity_type: Activity, ticket_id: int):
    ticket_list = await TicketState.filter(activity_type=activity_type, is_available=False).order_by("distribution_time")
    wait_num = 1
    for ticket in ticket_list:
        if ticket.ticket_id != ticket_id:
            wait_num += 1
        else :    
            return WaitStatusResponse(ticket_id=ticket_id, order=wait_num, activity_type=activity_type, status=StatusCode.OK)

    return WaitStatusResponse(ticket_id=ticket_id, order=-1, activity_type=activity_type, status=StatusCode.BADREQUEST)