from pydantic import BaseModel, Field
from enum import Enum
from .enums import Activity, StatusCode

    
class WaitStatusBase(BaseModel):
    ticket_id: int
    activity_type: Activity = Field(Activity.CARD, description="カードor実機")
    
class WaitStatusResponse(WaitStatusBase):
    order: int
    status: StatusCode