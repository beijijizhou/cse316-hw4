import React from "react";

import "./index.css";
import FakeStackOverflow from "./components/fakestackoverflow.js";
import axios from "axios";

import { createRoot } from "react-dom/client";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
axios.get("http://localhost:8000/loadQuestions").then((res) => {
  root.render(<FakeStackOverflow data={res.data} />);
});
