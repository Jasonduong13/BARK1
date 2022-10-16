// const form = document.getElementById('submit2')
// form.addEventListener('submit', runMain)

const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

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

async function add1(client, callback) {
    let eventsStart = Array(3)
    eventsStart[0] = "DummyData";
    eventsStart[1] = 37.3604395;
    eventsStart[2] = -121.8363561;
    const selectBalanceStatement = "INSERT INTO accounts (id, lat, long) VALUES ($1, $2, $3)";
    await client.query(selectBalanceStatement, eventsStart, callback);
}

async function checktable(client, callback) {
    const selectBalanceStatement = "SELECT id, lat, long FROM accounts;";
    await client.query(selectBalanceStatement, callback);
}


async function runMain(){
    console.log("HERE");
    const connectionString = "postgresql://Bark:gdhF3hKeE5OBWHsJzpRG1A@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dcalhack-3988"
    const pool = new Pool({
        connectionString,
        application_name: "$ docs_simplecrud_node-postgres",
    });

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

    console.log("check table");
    await retryTxn(0, 15, client, checktable, cb);
}