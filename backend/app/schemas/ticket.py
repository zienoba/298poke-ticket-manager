from pydantic import BaseModel, Field
from enum import Enum

class Activity(Enum):
    CARD = "card game"
    GAME = "game console"
    
class WaitStatusBase(BaseModel):
    ticket_id: int
    activity_type: Activity = Field(Activity.CARD, description="カードor実機")
    
class WaitStatusResponse(WaitStatusBase):
    wait_num: int
    
class WaitStatusRequest(WaitStatusBase):
    pass