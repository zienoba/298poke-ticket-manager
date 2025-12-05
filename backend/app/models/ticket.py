from tortoise.models import Model
from tortoise import fields
from ..schemas.enums import Activity

class TicketState(Model):
    uuid = fields.UUIDField(pk=True)
    ticket_id = fields.IntField(required=True)
    activity_type= fields.CharEnumField(Activity)
    is_distributed = fields.BooleanField(required=True, default=True)
    distribution_time = fields.DatetimeField(auto_now=True)
    
    class Meta:
        table = "ticket_state"
        unique_together = ("ticket_id", "activity_type")
        
