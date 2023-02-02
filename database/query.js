/**
 * Insert dna data in database using the id sequence and boolean if it has mutation or not
 * @param {*} connection to mysql
 * @param {*} { id, hasMutation } 
 */
function insertDNA(connection, { id, hasMutation }) {
  const query = "INSERT IGNORE INTO dnaRegistry SET ?";
  const params = { dna: id, hasMutation: hasMutation };

  connection.query(query, params, (error) => {
    if (error) {
      throw error;
    }
  });
}

/**
 * Get stats from database in base of mutations 
 * @param {*} connection to mysql
 * @returns count of mutations, no mutations and ratio calculation
 */
function getStats(connection) {
  return new Promise(resolve => {
    let count_mutations = 0;
    let count_no_mutations = 0;

    // Get active mutations
    connection.query('SELECT COUNT(*) FROM dnaRegistry WHERE hasMutation = 1', (error, rows) => {
      if (error) {
        throw error;
      }
      count_mutations = rows[0]['COUNT(*)'];

      // Get count of no mutations
      connection.query('SELECT COUNT(*) FROM dnaRegistry WHERE hasMutation = 0', (error, rows) => {
        if (error) {
          throw error;
        }

        count_no_mutations = rows[0]['COUNT(*)'];

        // Calculate the ratio only if counts are greater than zero
        let ratio = (count_mutations > 0 && count_no_mutations > 0) ? count_mutations / count_no_mutations : 0;

        resolve({
          count_mutations,
          count_no_mutations,
          ratio
        });
      });
    });
  })
}


module.exports = {
  insertDNA,
  getStats
}