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
    
class TicketListResponse(BaseModel):
    ticket_list: List[Ticket]    
    
class TicketCreateRequest(TicketBase):
    pass
    
class TicketCreateResponse(BaseModel):
    status: StatusCode
    request: TicketCreateRequest
    
class TicketCallRequest(TicketBase):
    uuid: Optional[UUID]
    
class TicketCallResponse(BaseModel):
    status: StatusCode
    request: TicketCallRequest
     


