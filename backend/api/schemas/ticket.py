from pydantic import BaseModel, Field

class Wait_num(BaseModel):
    ticket_id: int
    wait_num: int
    is_card: bool = Field(False, description="カードor実機")