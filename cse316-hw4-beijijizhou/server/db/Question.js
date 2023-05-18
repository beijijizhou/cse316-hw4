// Question-related Queries
const Tags=require('./Tag')
const Answers=require('./Answer')
exports.insert = function (
  conn,
  callback,
  title,
  text,
  asked_by,
  ask_date_time,
  views
) {
  let q = {
    title: title,
    text: text,
    asked_by: asked_by,
  };
  if (ask_date_time) q.ask_date_time = ask_date_time;
  if (views) q.views = views;
  conn.query(
    "insert into question set ?",
    q,
    function (error, results, fields) {
      callback(error, results);
    }
  );
};

exports.selectAll = function (conn, callback) {
  conn.query("select * from question;", function (error, results) {
    callback(error, results);
  });
};
exports.select = function (conn, callback) {
  conn.query("select * from question;", function (error, results) {
    callback(error, results);
  });
};
exports.selectOne = function (conn, qid, callback) {
  conn.query(
    `select * from question where qid=${qid};`,
    function (error, results) {
      callback(error, results);
    }
  );
};
exports.updateView = function (conn, qid,callback) {
  conn.query(
    `update question set views=views+1 where qid=${qid};`,
  );
  conn.query(
    `select * from question where qid=${qid};`,
    function (error, results) {
      callback(error, results);
    }
  );
};
exports.all=function(conn,callback){
  conn.query("select * from question;", function (error, allquestions) {
   allquestions.map(question=>Tags.selectTagsForOneQuestion(conn,question.qid,(err,tag)=>{
    callback(allquestions)
   
    }))
   
  });
  var search= conn.query("select * from question where text=")
  var result=search().
  conn.query("select * from question where text="+"input")
  [input]
}

