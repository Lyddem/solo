# 5. User Accounts & Sessions

All serious web applications have user accounts. Understanding user accounts and sessions is essential to being a great web developer.

## Getting Started

```bash
$ npm install
$ npm test # <-- Make this pass!
```

## Requirements

- [ ] Implement an endpoint for users to sign up
- [ ] Implement an endpoint for users to sign in, creating a valid session to access other, authenticated endponits
- [ ] Implement an endpoint for signed-in users to create chat messages.

## Tips

- You have models in the `models/` to work with. Use these to retrieve and create your data.

    - Double check the `User` model – there is one method whose logic is incorrect!

- Although the models are synchronous, in real life the models' database interactions are always asynchronous (you would be working with promises, callbacks, etc.)

- Use the `extractSessionId` method to extract the incoming sessionId token from the request.

- Many tests are marked `test.skip(...)`. This is done so you can focus on one test at a time. Once you're ready for the next test, remove the `.skip` part so that test will run, e.g. `test(...)`
