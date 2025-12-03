from tortoise.models import Model
from tortoise import fields
from ..schemas.enums import Activity

class TicketLog(Model):
    uuid = fields.UUIDField(pk=True)
    activity_type= fields.CharEnumField(Activity)
    distribution_time = fields.DatetimeField(required = True)
    call_time = fields.DatetimeField(auto_now_add=True)
    
    class Meta:
        table = "ticket_log"