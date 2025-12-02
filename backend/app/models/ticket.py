from tortoise.models import Model
from tortoise import fields

class TicketState(Model):
    id = fields.IntField(pk=True)
    ticket_id = fields.IntField(required=True)
    activity_type= fields.CharField(max_length=10)
    is_available = fields.BooleanField(required=True)
    distribution_time = fields.TimeField(null = True)
    
    class Meta:
        table = "ticket_state"
        unique_together = ("ticket_id", "activity_type")
        
