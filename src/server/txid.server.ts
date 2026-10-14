import { sql } from "drizzle-orm";

// Mutations return their transaction ID so that the browser can wait, with
// `collection.utils.awaitTxId(txid)`, until the write arrives on the live
// stream before it drops the optimistic row. Add it to the `RETURNING` of a
// write that always changes a row: every statement in the transaction shares
// the ID, and reading it there saves a round trip.
export const txid = sql<string>`pg_current_xact_id()::text`;
