# 4. Add Persistence

A shopping list app is set up for you. However, it uses an in-memory array to store data. This is not good, since that array gets lost when we restart the server. We need a database!

## Getting Started
	
```bash
$ npm install
$ npm test # <-- This should already pass
```

## Requirements

Convert each endpoint to use `knex` and `sqlite3` for proper persistance. When you're finished, all the tests should still pass (don't modify the tests). Don't forget to install the necessary libraries!

You will find commented-out database code in `server.js` to get you started. Good luck!