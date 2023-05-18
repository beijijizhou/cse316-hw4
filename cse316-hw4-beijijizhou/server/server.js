// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require("express");
const Questions = require("./db/Question");
const Answers = require("./db/Answer");
const Tags = require("./db/Tag");
const QA = require("./tests/db/qaTable");
const QT = require("./tests/db/qtTable");
const async = require("async");
const port = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require("cors");
app.use(cors());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "laogou123",
  database: "fake_so",
});
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Database connected");
});
app.get("/loadQuestions", async (req, res) => {
  Questions.select(connection, function (err, allquestions) {
    var i = 0;
    for (const question of allquestions) {
      Tags.selectTagsForOneQuestion(connection, question.qid, (err, tag) => {
        if (err) throw err;
        question.tag = tag;
      });
      Answers.selectAnswersForOneQuestion(
        connection,
        question.qid,
        (err, answers) => {
          question.answers = answers;
          i++;
          if (i == allquestions.length) {
            res.send(allquestions.reverse());
          }
        }
      );
    }
  });
});
app.post("/addAnswer", (req, res) => {
  var question = req.body.question;
  var answer = req.body.answer;
  Answers.insert(
    connection,
    (err, newanswer) => {
      if (err) throw err;
      else
        QA.insert(
          connection,
          (err, result) => {
            if (err) throw err;
            Questions.selectOne(connection, question.qid, (err, result) => {
              if (err) throw err;
              Answers.selectAnswersForOneQuestion(
                connection,
                question.qid,
                (err, answers) => {
                  res.send(answers);
                }
              );
            });
          },
          question.qid,
          newanswer.insertId
        );
    },
    answer.text,
    answer.ansBy,
    new Date()
  );
});
app.post("/addQuestion", (req, res) => {
  var question = req.body;
  var tagarray = question.tags;
  var c = 0;
  Questions.insert(
    connection,
    (err, newquestion) => {
      for (let tag of tagarray) {
        Tags.search(connection, tag, (err, foundtag) => {
          if (foundtag.length == 0) {
            Tags.insert(
              connection,
              (err, newtag) => {
                QT.insert(
                  connection,
                  (err, result) => {
                    c++;
                    if (c == tagarray.length) {
                      res.send(result);
                    }
                  },
                  newquestion.insertId,
                  newtag.insertId
                );
              },
              tag
            );
          } else {
            QT.insert(
              connection,
              (err, result) => {
                c++;
                if (c == tagarray.length) {
                  res.send(result);
                }
              },
              newquestion.insertId,
              foundtag[0].tid
            );
          }
        });
      }
    },
    question.title,
    question.text,
    question.askedBy,
    new Date()
  );
});
app.post("/updateViews", (req, res) => {
  var question = req.body;
  Questions.updateView(connection, question.qid, (err, result) => {
    res.json(result[0].views);
  });
});
process.on("SIGINT", function () {
  connection.end();
  console.log("Server closed. Database instance disconnected");
  process.exit(0);
});
