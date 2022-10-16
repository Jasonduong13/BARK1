  const { Pool } = require("pg");


  var accountValues = Array(3);
  
  // Wrapper for a transaction.  This automatically re-calls the operation with
  // the client as an argument as long as the database server asks for
  // the transaction to be retried.
  async function retryTxn(n, max, client, operation, callback) {
    const backoffInterval = 100; // millis
    const maxTries = 5;
    let tries = 0;
  
    while (true) {
      await client.query('BEGIN;');
  
      tries++;
  
      try {
        const result = await operation(client, callback);
        await client.query('COMMIT;');
        return result;
      } catch (err) {
        await client.query('ROLLBACK;');
  
        if (err.code !== '40001' || tries == maxTries) {
          throw err;
        } else {
          console.log('Transaction failed. Retrying.');
          console.log(err.message);
          await new Promise(r => setTimeout(r, tries * backoffInterval));
        }
      }
    }
  }
  
  // This function is called within the first transaction. It inserts some initial values into the "accounts" table.
  async function initTable(client, callback) {
    let eventsStart = Array(2)
    let i = 0;
    while (i < eventsStart.length) {
      eventsStart[i] = "DummyData " + String(i)
      i++;
    }
  
    const insertStatement =
      "INSERT INTO accounts (id, lat, long) VALUES ($1, 37.8638966521624, -122.25743564415112), ($2, 37.86652233792536, -122.25881966400979)";
    await client.query(insertStatement, eventsStart, callback);
  
    const selectBalanceStatement = "SELECT id, lat, long FROM accounts;";
    await client.query(selectBalanceStatement, callback);
  }
  
  
  // This function deletes the third row in the accounts table.
  async function deleteAccounts(client, callback) {
    const deleteStatement = "DELETE FROM accounts WHERE id = $1;";
    await client.query(deleteStatement, [accountValues[2]], callback);
  
  
    const selectBalanceStatement = "SELECT id, balance FROM accounts;";
    await client.query(selectBalanceStatement, callback);
  }
  
  
  //CHECK TABLE
  async function checktable(client, callback) {
    const selectBalanceStatement = "SELECT id, lat, long FROM accounts;";
    await client.query(selectBalanceStatement, callback);
  }
  
  async function add1(client, callback) {
    let eventsStart = Array(3)
    eventsStart[0] = "DummyData";
    eventsStart[1] = 37.3604395;
    eventsStart[2] = -121.8363561;
    const selectBalanceStatement = "INSERT INTO accounts (id, lat, long) VALUES ($1, $2, $3)";
    await client.query(selectBalanceStatement, eventsStart, callback);
  }
  
  async function deleteAll(client, callback) {
    const deleteStatement = "DELETE FROM accounts;";
    await client.query(deleteStatement, callback);
  }
  
  // Run the transactions in the connection pool
  
  
  async function foo(){
    const connectionString = "postgresql://Bark:gdhF3hKeE5OBWHsJzpRG1A@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dcalhack-3988";
    const pool = new Pool({
      connectionString,
      application_name: "$ docs_simplecrud_node-postgres",
    });
  
    console.log(pool)
    
    // Connect to database
    const client = await pool.connect();
  
    // Callback
    function cb(err, res) {
      if (err) throw err;
  
      if (res.rows.length > 0) {
        console.log("New Data:");
        res.rows.forEach((row) => {
          console.log(row);
        });
      }
    }
  
    // Initialize table in transaction retry wrapper
  
    // console.log("Making Table with 2 Address");
    // await retryTxn(0, 15, client, initTable, cb);
  
    // Delete a row in transaction retry wrapper
    // console.log("Deleting a row...");
    // await retryTxn(0, 15, client, deleteAccounts, cb);
  
    // console.log("add 1");
    // await retryTxn(0, 15, client, add1, cb);
  
    console.log("check table");
    await retryTxn(0, 15, client, checktable, cb);
    
    // console.log("delete 1");
    // await retryTxn(0, 15, client, delete1, cb);
  
    // console.log("delete all");
    // await retryTxn(0, 15, client, deleteAll , cb);
  
  
    // Exit program
    process.exit();
  }

  foo()







