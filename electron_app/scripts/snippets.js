let snippets_list = new Map();
//HTML Snippets
snippets_list.set("html", `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title></title>
    <style></style>
    <script><\/script>
  </head>
  <body>

  </body>
</html>`);
snippets_list.set("w3css", "<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>");
snippets_list.set("style_tag", "<style></style>");
snippets_list.set("div_tag", "<div style=\"\" class=\"\"></div>");
snippets_list.set("span_tag", "<span style=\"\" class=\"\"></span>");
snippets_list.set("button_tag", "<button style=\"\" class=\"\"></button>")
snippets_list.set("p_tag", "<p style=\"\" class=\"\"></p>")
snippets_list.set("a_tag", "<a href=\"\" style=\"\"></a>")
snippets_list.set("select_tag", `<select style=\"\" class=\"\" id=\"\">
  <option value=""></option>
  <option value=""></option>
  <option value=""></option>
  <option value=""></option>
</select>`)
snippets_list.set("style_attr", "style=\"\"");
snippets_list.set("class_attr", "class=\"\"");
snippets_list.set("onclick_attr", "onclick=\"\"");
snippets_list.set("title_attr", "title=\"\"");
snippets_list.set("id_attr", "id=\"\"");
snippets_list.set("src_attr", "src=\"\"");
snippets_list.set("onload_attr", "onload=\"\"");
snippets_list.set("onbeforeunload_attr", "onbeforeunload=\"\"");

//JavaScript Snippets
snippets_list.set("js_func", `function name(params) {
  
}`);
snippets_list.set("js_if", `if () {
  
}`);
snippets_list.set("js_ifel", `if () {
  
} else {
  
}`);
snippets_list.set("js_elseif", `else if () {
  
}`);
snippets_list.set("js_while", `while () {
  
}`);
snippets_list.set("js_for", `for (var i = 0; i < ; i++) {
  
}`);
snippets_list.set("js_try_catch", `try{

}catch(error){

}`);
snippets_list.set("js_conlog", `console.log("")`);
snippets_list.set("js_getid", `document.getElementById("")`);
snippets_list.set("js_getclass", `document.getElementsByClassName("")`);
snippets_list.set("js_gettag", `document.getElementsByTagName("")`);
snippets_list.set("js_querysel", `document.querySelector("")`);

//Python Snippets
snippets_list.set("py_func", `def name(args):
  `);
snippets_list.set("py_if", `if:
  `);
snippets_list.set("py_ifel", `if:

else:
  `);
snippets_list.set("py_elseif", `elif:
  `);
snippets_list.set("py_while", `while:
  `);
snippets_list.set("py_for", `for x in y:
  `);
snippets_list.set("py_ifnameequalsmain", `if __name__ == "__main__":
  `);
snippets_list.set("py_try_except", `try:
  
except Exception as e:
  `);
snippets_list.set("py_class", `class X:
  def __init__(self):
    `);
function snippets(snippet) {
    let cursor_position = document.getElementById("textArea").selectionStart;
    let text = document.getElementById("textArea");
    let snippet_to_insert = snippets_list.get(snippet);
    text.value = (text.value).slice(0, cursor_position) + snippet_to_insert + (text.value).slice(cursor_position);
    line_numbers_on_load();
}
