// Answer-related queries
exports.insert = function(conn, callback, text, ans_by, ans_date_time) {
    let a = {
      text: text,
      ans_by: ans_by
    };
    if(ans_date_time) a.ans_date_time = ans_date_time;
    conn.query('insert into answer set ?', a, function(error, results, fields) {
      callback(error, results);
    })
  }
exports.selectAnswersForOneQuestion=function(conn,qid, callback) {
    conn.query(`SELECT answer.* From qa
    inner join question on question.qid=qa.qstnId
    inner join answer on qa.ansId=answer.aid
    where question.qid=${qid}`, function(err,result){
         callback(err,result)
    })
} 
