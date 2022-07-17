const fs = require("fs");
const {dialog} = require("electron");

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
function save(){
    if (window.file == undefined){
        dialog.showSaveDialogSync(file_names => {
            let file_name = file_names[0];
            try{
                let content = window.textarea.value;
                fs.writeFileSync(file_name, content);
            }catch(err){
                dialog.showErrorBox("An error occurred!", err.message);
            }
        });
    }else{
        let file_name = window.file;
            try{
                let content = window.textarea.value;
                fs.writeFileSync(file_name, content);
            }catch(err){
                dialog.showErrorBox("An error occurred!", err.message);
            }
    }
}
function save_as(){
    dialog.showSaveDialogSync(file_names => {
        let file_name = file_names[0];
        try{
            let content = window.textarea.value;
            fs.writeFileSync(file_name, content);
        }catch(err){
            dialog.showErrorBox("An error occurred!", err.message);
        }
    });
}
