# 2. Complete Chat App

Currently, the server responds to a `POST /chats` request, which accepts a new chat and saves it to an array. A frontend is provided as `client.html`; it already constructs a POST request to this endpoint. Your task is to add code to retrieve and display the current chats on the server.

## Getting Started

```bash
$ npm install
$ npm start
```

Now visit [localhost:3030](http://localhost:3030)

## Requirements

- [x] Alter the server file to return all chats in response to `GET /chats`
- [x] Update `client.html` to make this request, then console log the result
- [x] Display these results on the page (within the `<div class="chats">` element)
