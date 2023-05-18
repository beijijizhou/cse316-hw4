exports.insert = function(conn, callback, qid, aid) {
  let qa = {
    qstnId: qid,
    ansId: aid
  };
  console.log(qa)
  conn.query('insert into qa set ?', qa, function(error, results, fields) {
    callback(error, results);
  })
}
