from typing import Optional, List
from .enums import Activity, StatusCode
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

    
class TicketBase(BaseModel):
    ticket_id: int
    activity_type: Activity = Field(Activity.CARD, description="カードor実機") 
    
class Ticket(TicketBase):
    order: int 
    
class TicketListResponse(BaseModel):
    ticket_list: List[Ticket]    
    
class TicketCreateRequest(TicketBase):
    pass
    
class TicketCreateResponse(BaseModel):
    status: StatusCode
    request: TicketCreateRequest
    
class TicketCallRequest(TicketBase):
    pass

class TicketCallResponse(BaseModel):
    status: StatusCode
    request: TicketCallRequest

class TicketAvailableRequest(TicketBase):
    pass

class TicketAvailableResponse(BaseModel):
    status: StatusCode
    request: TicketAvailableRequest    

class TicketRecord(BaseModel):
    activity_type: Activity = Field(description="カードor実機") 
    distribution_time: datetime = Field(description="配当時間")
    call_time: datetime = Field(description="呼び出し時間")
    
class TicketRecordListResponse(BaseModel):
    ticket_record_list: List[TicketRecord]


