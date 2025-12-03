import asyncio
import websockets

async def test_websocket():
    uri = "ws://localhost:8000/display"
    async with websockets.connect(uri) as websocket:
        await websocket.send("Hello, Server!")
        print("Sent: Hello, Server!")
        # The server echoes back or just prints?
        # Looking at display.py:
        # while True:
        #     data = await websocket.receive_text()
        #     print(data)
        # It just prints to server console.
        # So we can just send data and if no exception, it's connected.
        # We can also try to receive if the server sends anything back, but it doesn't seem to.
        print("Connected successfully")

if __name__ == "__main__":
    asyncio.run(test_websocket())
