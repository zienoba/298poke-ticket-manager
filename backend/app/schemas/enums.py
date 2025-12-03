from enum import Enum

class StatusCode(Enum):
    CREATED = "201 Created"
    OK = "200 OK"
    BADREQUEST = "400 Bad Request"

class Activity(str, Enum):
    CARD = "card game"
    GAME = "game console"
