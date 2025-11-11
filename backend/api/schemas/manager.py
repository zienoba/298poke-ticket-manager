from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field

class Ticket(BaseModel):
    uuid: UUID
    ticket_id: int
    order: int

