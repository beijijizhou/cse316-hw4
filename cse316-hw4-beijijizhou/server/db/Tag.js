// Tag related queries
exports.insert = function(conn, callback, name) {
    let t = {
      name: name
    };
    conn.query('insert into tag set ?', t, function(err, results, fields) {
      callback(err, results);
    })
  }
exports.selectAll= function(conn,callback){
    conn.query('select * from tag;',function(err,results){
        callback(err,results)
    })
}

exports.selectTagsForOneQuestion=function(conn,qid,callback){
    conn.query(`SELECT tag.name FROM qt
    INNER JOIN question ON question.qid = qt.qstnId
    INNER JOIN tag ON tag.tid = qt.tagId
    WHERE question.qid =${qid}`, function(err,result){
        callback(err,result)
    })
}
exports.search=function(conn,tag,callback){
  
  conn.query(`select * from tag where name='${tag}';`,function(err,result){
   
    callback(err,result)
  })
}