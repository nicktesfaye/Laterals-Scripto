var right = document.getElementById("codeEditor");
var language = "javascript";
var editor = CodeMirror(right, {
  mode: "javascript",
  theme: "midnight",
  tabSize: 4,
  lineNumbers: true,
});

lang = document.getElementById("lang");
lang.addEventListener("change", function (e) {
  language = e.target.value;
  editor.setOption("mode", language);
});

theme = document.getElementById("theme");
theme.addEventListener("change", function (e) {
  editor.setOption("theme", e.target.value);
});

//sample output from
axios
  .post("/run", {
    file: document.getElementById("name").innerHTML,
    lang: language,
  })
  .then(({ data }) => {
    document.getElementById("outputSample").value += data.result;
  })
  .catch((e) => {
    console.log(e.message);
  });

//file systems
var file;
editor.on("changes", function (e) {
  file = editor.getValue();
});

document.getElementById("run").addEventListener("click", function (e) {
  axios
    .post("/run/" + document.getElementById("name").innerHTML, {
      code: file,
      lang: language,
    })
    .then(({ data }) => {
      document.getElementById("output").value = data.result;
    })
    .catch((e) => {
      console.log(e.message);
    });
});

document.getElementById("submit").addEventListener("click", function (e) {
  axios
    .post("/submit/" + document.getElementById("name").innerHTML, {
      code: file,
      lang: language,
    })
    .then(({ data }) => {
      if (data === true) console.log(data);
      axios.post("/check", {}).then(({ data }) => {
        console.log(data);
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
});
