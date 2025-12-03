import asyncio
import websockets
import httpx

async def test_broadcast():
    uri = "ws://localhost:8000/display"
    async with websockets.connect(uri) as websocket:
        print("Connected to WebSocket")
        
        # Trigger the broadcast
        async with httpx.AsyncClient() as client:
            # We need to create a ticket first to call it, or assume one exists.
            # Let's create one first to be safe.
            create_response = await client.post("http://localhost:8000/manager", json={"ticket_id": "T-999", "activity_type": "attraction"})
            print(f"Create response: {create_response.status_code}")

            call_response = await client.put("http://localhost:8000/manager", json={"ticket_id": "T-999", "activity_type": "attraction"})
            print(f"Call response: {call_response.status_code}")

        # Wait for message
        try:
            message = await asyncio.wait_for(websocket.recv(), timeout=5.0)
            print(f"Received: {message}")
        except asyncio.TimeoutError:
            print("Timeout waiting for message")

if __name__ == "__main__":
    asyncio.run(test_broadcast())
