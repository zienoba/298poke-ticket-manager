from typing import Optional, List
from uuid import UUID
from .ticket import Activity
from pydantic import BaseModel, Field
from enum import Enum

class StatusCode(Enum):
    CREATED = "201 Created"
    OK = "200 OK"
    BADREQUEST = "400 Bad Request"
    
class TicketBase(BaseModel):
    ticket_id: int
    activity_type: Activity = Field(Activity.CARD, description="カードor実機") 
    
class Ticket(TicketBase):
    uuid: Optional[UUID]
    order: int 
    
class GetTicketListResponce(BaseModel):
    ticket_list: List[Ticket]    
    
class CreateTicketRequest(TicketBase):
    pass
    
class CreateTicketResponce(BaseModel):
    status: StatusCode
    request: CreateTicketRequest
    
class CallNumberRequest(TicketBase):
    uuid: Optional[UUID]
    
class CallNumberResponce(BaseModel):
    status: StatusCode
    request: CallNumberRequest
     


