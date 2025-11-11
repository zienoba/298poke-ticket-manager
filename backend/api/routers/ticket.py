from fastapi import APIRouter
from schemas.ticket import GetWaitNumResponce, GetWaitNumRequest
router = APIRouter()

@router.get("/ticket", response_model=GetWaitNumResponce)
async def get_wait_num(ticket_data: GetWaitNumRequest):
    return GetWaitNumResponce(ticket_id=ticket_data.ticket_id, wait_num=0, activity_type=ticket_data.activity_type)