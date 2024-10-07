# metal-pay-connect-example-nodejs

## project setup

Rename `.env.example` to `.env`

Retrieve your `SECRET_KEY` and `API_KEY` from metallicus. Place them in your `.env` file.

Update your `corsOptions` in the `index.js` file to limit traffic to your disired origins (ie. localhost:3000...).

```
npm install
```

```
npm run dev
```

open your browser or make an api call to `http://localhost:3005/v1/signature`
