from fastapi import APIRouter
from schemas.manager import Ticket
from typing import List
router = APIRouter()

@router.get("/manager/{type}")
async def ticket_list():
    return 

@router.post("/manager")
async def create_ticket():
    pass

@router.delete("/manager/{id}")
async def call_number():
    pass