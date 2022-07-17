function open_file() {
    var input = document.getElementById("file_input");
    if (typeof (input.files[0]) == 'undefined') {
        input.click();
        return;
    }
    var file_name_selector_val = document.getElementById("file_name_selector");
    reader.onload = function () {
        document.title = input.files[0].name + " - " + "Code Editor";
        textarea.value = reader.result;
        line_numbers_open_file(reader.result);
        if (((reader.result).split("\n")).length > 300) {
            if (!(turn_off_line_numbers)) {
                alert("The file you have opened seems large. The webpage may get unresponsive and slow. Go to Settings(Alt+Shift+S) and turn on \"Turn off Line Numbers.\"");
            }
        }
    }
    reader.readAsText(input.files[0]);
    file_name_without_extension = (input.files[0].name).slice(0, (input.files[0].name).lastIndexOf("."));
    file_name_selector_val.value = input.files[0].name;
    file_name = file_name_without_extension;
}
function download(content, filename, contentType) {
    if (!contentType) contentType = 'application/octet-stream';
    var a = document.createElement('a');
    var blob = new Blob([content], { 'type': contentType });
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}
function download_file() {
    var temp = file_name;
    //file_name_without_extension = (file_name).slice(0, (file_name).lastIndexOf("."));
    //file_name = file_name_without_extension;
    var content = textarea.value;
    content = content.replace(/\n/g, "\r\n");
    var file_name_final;
    var file_type_final;
    if (file_type == "plain") {
        file_name_final = file_name + ".txt";
        file_type_final = "text/plain";
    } else if (file_type == "html") {
        file_name_final = file_name + ".html";
        file_type_final = "text/html";
    } else if (file_type == "css") {
        file_name_final = file_name + ".css";
        file_type_final = "text/css";
    } else if (file_type == "javascript") {
        file_name_final = file_name + ".js";
        file_type_final = "text/javascript";
    } else if (file_type == "xml") {
        file_name_final = file_name + ".xml";
        file_type_final = "text/xml";
    } else if (file_type == "python") {
        file_name_final = file_name + ".py";
        file_type_final = "text/plain";
    } else if (file_type == "java") {
        file_name_final = file_name + ".java";
        file_type_final = "text/plain";
    } else if (file_type == "c") {
        file_name_final = file_name + ".c";
        file_type_final = "text/plain";
    } else if (file_type == "cpp") {
        file_name_final = file_name + ".cpp";
        file_type_final = "text/plain";
    } else if (file_type == "cs") {
        file_name_final = file_name + ".cs";
        file_type_final = "text/plain";
    }
    download(content, file_name_final, file_type_final);
    file_name = temp;
}
