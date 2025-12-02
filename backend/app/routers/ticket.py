from fastapi import APIRouter
from schemas.ticket import WaitStatusResponse, WaitStatusRequest
router = APIRouter()

@router.get("/ticket", response_model=WaitStatusResponse)
async def get_wait_num(ticket_data: WaitStatusRequest):
    return WaitStatusResponse(ticket_id=ticket_data.ticket_id, wait_num=0, activity_type=ticket_data.activity_type)