# Baross Library

[Documentation](docs/README.md)

## Todo

- [x] Disable sorting on `actions` column
- [x] Generate random profile picture with **DiceBear**

## Bugs

- When the email sending fails the reset token is still in the database
- Duplicate days displayed on chart

## Workarounds
### MongooseServerSelectionError
It can occur on Windows OS when the `MONGODB_URI` environment variable is set to `mongodb://localhost:27017`. 
The **solution** is to change `localhost` to `127.0.0.1`. So the value of `MONGODB_URI` should be `mongodb://127.0.0.1:27017`.
