from pydantic import BaseModel, Field
from enum import Enum

class Activity(Enum):
    CARD = "card game"
    GAME = "game console"
    
class GetWaitNumBase(BaseModel):
    ticket_id: int
    activity_type: Activity = Field(Activity.CARD, description="カードor実機")
    
class GetWaitNumResponce(GetWaitNumBase):
    wait_num: int
    
class GetWaitNumRequest(GetWaitNumBase):
    pass