from fastapi import APIRouter
from schemas.ticket import Wait_num
router = APIRouter()

@router.get("/ticket", response_model=Wait_num)
async def get_wait_num():
    return Wait_num(ticket_id=0, wait_num=0, is_card=True)