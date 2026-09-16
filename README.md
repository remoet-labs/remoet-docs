# docs.remoet.dev

Public developer documentation for Remoet: the MCP server that agents connect to, and the REST API for your own code. Live at [docs.remoet.dev](https://docs.remoet.dev).

The API is served from:

```
https://api.remoet.dev
```

## Where the facts come from

This site is a surface, not a source. Before changing any claim about the MCP server, check it against:

- the live `tools/list` response from `https://api.remoet.dev/mcp`
- `remoet-backend/apps/backend/src/mcp/MCP.md` and the zod schemas beside it
- `remoet-backend/apps/backend/src/subscriptions/subscription-limits.ts` for stars, unstars, requests and link trees

Two limits are not in that file. The 5 key cap is a hardcoded `5` in
`users/services/userApiKeys.service.ts:40`, duplicated as `MAX_API_KEYS` in the frontend, and
the 365 day key lifetime is the `expiresAt` set beside it. Check both when you touch keys.

Do not restate limits, tool names or prices from memory. This site went eleven months telling readers Remoet cost $15 a month because nobody re-checked.

Remoet is free. There are no plans, so no page here should describe one.

## Contributions

Found something wrong or missing? Raise an issue and we will take a look.

## Local development

Run `yarn` to install dependencies, then `yarn dev` and visit localhost:4000.

## License

MIT.
