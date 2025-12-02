from tortoise.models import Model
from tortoise import fields

class TicketLog(Model):
    uuid = fields.UUIDField(pk=True)
    ticket_id = fields.IntField(required=True)
    activity_type= fields.CharField(max_length=10, required=True)
    distribution_time = fields.TimeField(null = True)
    call_time = fields.TimeField(null = True)
    