function run_code() {
    var input = document.getElementById("textArea").value;
    var output = document.getElementById("output");
    if (file_type == "html") {
        if (document.getElementById("toggle_checkbox").checked) {
            output.srcdoc = "";
            output_window = window.open("", "Output", "left=500, top=500");
            output_window.document.write(input);
        } else {
            if (!(input == "")) {
                output.srcdoc = input;
            } else {
                alert("Please enter something if you want it to be displayed.");
            }
        }
    } else if (file_type == "python") {
        var python_code = textarea.value;
        output.srcdoc = "Check Console for output. (Press Ctrl+Shift+I or F12)\n Click the settings icon on the top-right and deselect 'Group Similar Messages in Console' option.";
        //try{
        alert("Check Console for output. (Press Ctrl+Shift+I or F12)\n Click the settings icon on the top-right and deselect 'Group Similar Messages in Console' option.");
        console.clear();
        eval(__BRYTHON__.python_to_js(python_code));
        //}catch(err){
        //output.srcdoc += err;
        //}
    } else if (file_type == "plain") {
        alert("Cannot run a plain text file. Select a valid file type (HTML or Python).")
    } else {
        alert("Currently only Python and HTML are supported.")
    }
    //update()
}
window.addEventListener('keydown', function (e) {
    var num_pressed = (event.which >= 48 && event.which <= 57);
    if (event.altKey && event.which == 82) {
        event.preventDefault();
        run_code();
    } else if (event.altKey && event.which == 70) {
        event.preventDefault();
        toggle_topbar();
    } else if (event.altKey && event.which == 84) {
        event.preventDefault();
        if (topbar.style.display == "block") {
            toggle_btmbar();
        }
    } else if (event.altKey && num_pressed == true) {
        event.preventDefault();
        if (document.getElementById("output").style.display != "none" && !(document.getElementById("text_editor_mode").checked)) {
            switch (event.which) {
                case 48:
                    textarea_width(0);
                    break;
                case 49:
                    textarea_width(10);
                    break;
                case 50:
                    textarea_width(20);
                    break;
                case 51:
                    textarea_width(30);
                    break;
                case 52:
                    textarea_width(40);
                    break;
                case 53:
                    textarea_width(50);
                    break;
                case 54:
                    textarea_width(60);
                    break;
                case 55:
                    textarea_width(70);
                    break;
                case 56:
                    textarea_width(80);
                    break;
                case 57:
                    textarea_width(90);
                    break;
            }
        }
    } else if (event.altKey && event.shiftKey && event.which == 83) {
        var settings_tab = document.getElementById("settings_tab");
        var editor = document.getElementById("editor");
        if (settings_tab.style.display == "none") {
            editor.style.display = "none";
            settings_tab.style.display = "block";
        } else if (settings_tab.style.display == "block") {
            settings_tab.style.display = "none";
            editor.style.display = "block";
        }
    }
});
function update() {
    var input = document.getElementById("textArea").value;
    localStorage.setItem("textarea_content", input);
}
setInterval(update, 500);
function on_load() {
    window.textarea = document.getElementById("textArea");
    window.line_numbers = document.getElementById("line_numbers");
    window.file_type = "plain";
    window.file_name = "File";
    window.old_val = "";
    window.reader = new FileReader();
    window.turn_off_line_numbers = false;
    window.word;
    window.content = "";
    window.file = "";

    textarea.addEventListener('keydown', function (e) {
        if (!(turn_off_line_numbers) && old_val != textarea.value) {
            var content = (textarea.value).split("\n");
            var slider = document.getElementById("textarea_width").value;
            line_numbers.innerHTML = "";
            if (event.keyCode == 8) {
                if ((content.lenth != 1) && content.at(-1) == "") {
                    content.pop();
                }
            } else if (event.shiftKey || event.altKey || event.ctrlKey) {
                1 + 1
            } else {
                content.push("\n")
            }
            for (var x = 0; x < content.length; x++) {
                line_numbers.innerHTML += x + 1 + '</br>';
                if (x > 99) {
                    line_numbers.style.width = "3%";
                    textarea.style.width = slider - ((line_numbers.style.width).slice(0, -1)) + "%";
                    document.getElementById("output").style.width = (100 - slider) + "%";
                } else if (x < 99) {
                    line_numbers.style.width = "2%";
                    textarea.style.width = slider - ((line_numbers.style.width).slice(0, -1)) + "%";;
                    document.getElementById("output").style.width = (100 - slider) + "%";
                }
            }
            line_numbers.scrollTop = textarea.scrollTop;
            old_val = textarea.value;
        }
    });
    textarea.addEventListener('input', function (e) {
        if (!(turn_off_line_numbers) && old_val != textarea.value) {
            var content = (textarea.value).split("\n");
            var slider = document.getElementById("textarea_width").value;
            line_numbers.innerHTML = "";
            for (var x = 0; x < content.length; x++) {
                line_numbers.innerHTML += x + 1 + '</br>';
                if (x > 99) {
                    line_numbers.style.width = "3%";
                    textarea.style.width = slider - ((line_numbers.style.width).slice(0, -1)) + "%";
                    document.getElementById("output").style.width = (100 - slider) + "%";
                } else if (x < 99) {
                    line_numbers.style.width = "2%";
                    textarea.style.width = slider - ((line_numbers.style.width).slice(0, -1)) + "%";;
                    document.getElementById("output").style.width = (100 - slider) + "%";
                }
            }
            line_numbers.scrollTop = textarea.scrollTop;
        }
    });
    textarea.onpaste = function () {
        if (!(turn_off_line_numbers)) {
            var text_pasted = String((event.clipboardData || window.clipboardData).getData('text'));
            console.log(text_pasted.length);
            if (text_pasted.length > 10000) {
                alert("The text you have pasted seems large. The webpage may get unresponsive and slow. Go to Settings(Alt+Shift+S) and turn on \"Turn off Line Numbers.\"");
            }
            var content = ((event.clipboardData || window.clipboardData).getData('text')).split("\n");
            line_numbers.innerHTML = "";
            for (var x = 0; x < content.length; x++) {
                line_numbers.innerHTML += x + 1 + '</br>';
                if (x > 99) {
                    line_numbers.style.width = "3%";
                    textarea.style.width = "48.5%";
                    document.getElementById("output").style.width = "48.5%";
                } else if (x < 99) {
                    line_numbers.style.width = "2%";
                    textarea.style.width = "49";
                    document.getElementById("output").style.width = "49%";
                }
            }
            line_numbers.scrollTop = textarea.scrollTop;
        }
    };
    textarea.addEventListener('scroll', scroll_sync_textarea);
    
    document.getElementById('textArea').addEventListener('keydown', function (e) {
        var file_type_for_keydown = document.getElementById("file_type_selector").value;
        if (e.key == 'Tab') {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "  " + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 2;
        }
    });
    window.onbeforeunload = function () {
        return "Do you really want to leave the page? You will lose any unsaved work.";
    };
    var content = "";
    state_checkbox = "off";
    content = document.getElementsByTagName("html")[0].innerHTML;
    content = "<!DOCTYPE html>\n" + "<html>\n" + content + "\n</html>"
    disp = document.getElementById("source_code_disp");
    content = document.getElementsByTagName("html")[0].innerHTML;
    content = "<!DOCTYPE html>\n" + "<html>\n" + content + "\n</html>"
    disp.innerHTML = content;

    document.getElementById("stats").innerHTML = "<span style='font-size:15px'><b>Stats: </b></span>" + "Characters: " + content.length + ", Lines: " + content.split("\n").length;

    var loc_to_icon = ((window.location.href).slice(0, -16)) + "quickpad.png";
    document.getElementById("icon_link").href = loc_to_icon;

    document.getElementById("textArea").spellcheck = false;

    if (localStorage.getItem("textarea_content") == "") {
        document.getElementById("textArea").value = '';
    } else {
        document.getElementById("textArea").value = localStorage.getItem("textarea_content");
    }

    var file_name_selector_val = document.getElementById("file_name_selector").value;
    if (file_name_selector_val != "") {
        file_name = file_name_selector_val;
    }

    line_numbers_on_load();

    document.getElementById("textarea_width").value = 50;

    w3CodeColor();
}
function textarea_width(val) {
    if (val == undefined) {
        var slider = document.getElementById("textarea_width").value;
    } else {
        var slider = val;
    }
    var textarea_width_val = document.getElementById('textarea_width_val');
    textarea_width_val.innerHTML = slider + "%";
    if (slider == 100) {
        if (line_numbers.style.width == "2%") {
            textarea.style.width = "98%";
            textarea.style.display = "block";
            line_numbers.style.display = "block";
            document.getElementById("output").style.display = "none";
        } else if (line_numbers.style.width == "3%") {
            textarea.style.width = "97%";
            textarea.style.display = "block";
            line_numbers.style.display = "block";
            document.getElementById("output").style.display = "none";
        }
    } else if (slider == 0) {
        textarea.style.display = "none";
        line_numbers.style.display = "none";
        document.getElementById("output").style.display = "block";
        document.getElementById("output").style.width = "100%";
    } else {
        textarea.style.display = "block";
        line_numbers.style.display = "block";
        document.getElementById("output").style.display = "block";
        textarea.style.width = slider - ((line_numbers.style.width).slice(0, -1)) + "%";
        document.getElementById("output").style.width = (100 - slider) + "%";
    }
    document.getElementById("textarea_width").value = slider;
}
function toggle_topbar() {
    topbar = document.getElementById("topbar");
    btmbar = document.getElementById("btmbar");
    hide_topbar_button = document.getElementById("hide_topbar_button");
    input = document.getElementById("textArea");
    output = document.getElementById("output");
    if (topbar.style.display == "block") {
        topbar.style.display = "none";
        btmbar.style.display = "none";
        input.style.height = "100vh";
        output.style.height = "100vh";
        line_numbers.style.height = "100vh";
        //alert("The toolbar will now be invisible. Press Alt+F to show it again.");
    } else if (topbar.style.display == "none") {
        topbar.style.display = "block";
        input.style.height = "93vh";
        output.style.height = "93vh";
        line_numbers.style.height = "93vh";
    }
}
function toggle_btmbar() {
    btmbar = document.getElementById("btmbar");
    hide_btmbar_button = document.getElementById("hide_btmbar_button");
    input = document.getElementById("textArea");
    output = document.getElementById("output");
    line_numbers = document.getElementById("line_numbers");
    if (btmbar.style.display == "block") {
        btmbar.style.display = "none";
        input.style.height = "100vh";
        output.style.height = "100vh";
        line_numbers.style.height = "100vh";
        toggle_topbar();
        toggle_topbar();
        //alert("The Snippets Bar will now be invisible. Press Alt+T to show it again.");
    } else if (btmbar.style.display == "none") {
        btmbar.style.display = "block";
        input.style.height = "86vh";
        output.style.height = "86vh";
        line_numbers.style.height = "86vh";
    }
}
function open_settings() {
    document.getElementById("editor").style.display = "none";
    document.getElementById("settings_tab").style.display = "block";
}
function close_settings() {
    document.getElementById("settings_tab").style.display = "none";
    document.getElementById("editor").style.display = "block";
}
function change_editor_bg() {
    var color_val = document.getElementById("editor_bg_color_picker").value;
    textarea.style.backgroundColor = color_val;
}
function change_editor_fg() {
    var color_val = document.getElementById("editor_fg_color_picker").value;
    textarea.style.color = color_val;
}

function custom_theme() {
    var font_color = document.getElementById("custom_theme_font_color").value;
    var elements_to_be_changed = [];
    elements_to_be_changed.push(document.getElementById("new_button"));
    elements_to_be_changed.push(document.getElementById("file_input_label"));
    elements_to_be_changed.push(document.getElementById("download_btn"));
    elements_to_be_changed.push(document.getElementById("run_code_btn"));
    elements_to_be_changed.push(document.getElementById("hide_topbar_button"));
    elements_to_be_changed.push(document.getElementById("open_settings_button"));
    elements_to_be_changed.push(document.getElementById("HTML_Snippet_Button"));
    elements_to_be_changed.push(document.getElementById("JavaScript_Snippet_Button"));
    elements_to_be_changed.push(document.getElementById("hide_btmbar_button"));
    elements_to_be_changed.push(document.getElementById("hide_btmbar_button"));
    elements_to_be_changed.push(document.getElementById("hide_btmbar_button"));
    elements_to_be_changed.push(document.getElementById("file_name_selector"));
    elements_to_be_changed.push(document.getElementById("file_type_selector"));
    elements_to_be_changed.push(document.getElementById("font_size_selector"));
    elements_to_be_changed.push(document.getElementById("font_family_selector"));
    elements_to_be_changed.push(document.getElementById("settings_close_btn"));
    var color = document.getElementById("custom_theme_picker").value;
    var r = parseInt(color.substr(1, 2), 16);
    r = r + 20
    var g = parseInt(color.substr(3, 2), 16);
    g = g + 20
    var b = parseInt(color.substr(5, 2), 16);
    b = b + 20
    var new_color = "rgb(R, G, B)";
    new_color = new_color.replace("R", r);
    new_color = new_color.replace("G", g);
    new_color = new_color.replace("B", b);
    for (var x = 0; x < elements_to_be_changed.length; x++) {
        elements_to_be_changed[x].style.backgroundColor = new_color;
        elements_to_be_changed[x].style.color = font_color;
    }
    elements_to_be_changed_dark = [textarea, line_numbers, document.getElementById("topbar"), document.getElementById("btmbar"), document.getElementById("Snippets_Button")];
    elements_to_be_changed_dark[2].classList.remove("w3-dark-grey");
    //elements_to_be_changed[2].style.borderBottom = "1px solid grey";
    elements_to_be_changed_dark[2].style.borderTop = "1px solid grey";
    elements_to_be_changed_dark[3].style.borderTop = "1px solid grey";
    elements_to_be_changed_dark[3].classList.remove("w3-dark-grey");
    document.getElementById("settings_tab").classList.remove("w3-dark-grey");
    document.getElementsByTagName("body")[0].classList.remove("w3-dark-grey");
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
    document.getElementsByTagName("body")[0].style.color = font_color;
    textarea.style.borderTop = "1px solid grey";
    for (var x = 0; x < elements_to_be_changed_dark.length; x++) {
        elements_to_be_changed_dark[x].style.backgroundColor = color;
        elements_to_be_changed_dark[x].style.color = font_color;
    }
}

function change_theme(theme_name) {
    var elements_to_be_changed = [];
    elements_to_be_changed.push(document.getElementById("new_button"));
    elements_to_be_changed.push(document.getElementById("file_input_label"));
    elements_to_be_changed.push(document.getElementById("download_btn"));
    elements_to_be_changed.push(document.getElementById("run_code_btn"));
    elements_to_be_changed.push(document.getElementById("hide_topbar_button"));
    elements_to_be_changed.push(document.getElementById("open_settings_button"));
    elements_to_be_changed.push(document.getElementById("HTML_Snippet_Button"));
    elements_to_be_changed.push(document.getElementById("JavaScript_Snippet_Button"));
    elements_to_be_changed.push(document.getElementById("Python_Snippet_Button"));
    elements_to_be_changed.push(document.getElementById("hide_btmbar_button"));
    elements_to_be_changed.push(document.getElementById("file_name_selector"));
    elements_to_be_changed.push(document.getElementById("file_type_selector"));
    elements_to_be_changed.push(document.getElementById("font_size_selector"));
    elements_to_be_changed.push(document.getElementById("font_family_selector"));
    elements_to_be_changed.push(document.getElementById("settings_close_btn"));
    if (theme_name == "black") {
        document.getElementById("custom_theme").style.display = "none";
        for (var x = 0; x < elements_to_be_changed.length; x++) {
            console.log(elements_to_be_changed[x]);
            elements_to_be_changed[x].style.backgroundColor = "#101010";
            elements_to_be_changed[x].style.color = "white";
        }
        elements_to_be_changed_dark = [textarea, line_numbers, document.getElementById("topbar"), document.getElementById("btmbar"), document.getElementById("Snippets_Button")];
        elements_to_be_changed_dark[2].classList.remove("w3-dark-grey");
        //elements_to_be_changed[2].style.borderBottom = "1px solid grey";
        elements_to_be_changed_dark[2].style.borderTop = "1px solid grey";
        elements_to_be_changed_dark[3].style.borderTop = "1px solid grey";
        elements_to_be_changed_dark[3].classList.remove("w3-dark-grey");
        document.getElementById("settings_tab").classList.remove("w3-dark-grey");
        document.getElementsByTagName("body")[0].classList.remove("w3-dark-grey");
        document.getElementsByTagName("body")[0].style.backgroundColor = "#000";
        document.getElementsByTagName("body")[0].style.color = "white";
        textarea.style.borderTop = "1px solid grey";
        for (var x = 0; x < elements_to_be_changed_dark.length; x++) {
            elements_to_be_changed_dark[x].style.backgroundColor = "#000";
            elements_to_be_changed_dark[x].style.color = "white";
        }
    }/*else if(theme_name == "white"){
    for (var x = 0; x < elements_to_be_changed.length; x++){
      elements_to_be_changed[x].style.backgroundColor = "rgb(255,255,255)";
      elements_to_be_changed[x].style.color = "black";
    }
    elements_to_be_changed_dark = [document.getElementById("topbar"), document.getElementById("btmbar"), document.getElementById("Snippets_Button")];
    elements_to_be_changed_dark[0].classList.remove("w3-dark-grey");
    //elements_to_be_changed[2].style.borderBottom = "1px solid grey";
    elements_to_be_changed_dark[0].style.borderTop = "1px solid grey";
    elements_to_be_changed_dark[1].style.borderTop = "1px solid grey";
    elements_to_be_changed_dark[1].classList.remove("w3-dark-grey");
    //elements_to_be_changed_dark.push(document.getElementsByTagName("p"))
    document.getElementsByTagName("body")[0].classList.remove("w3-dark-grey");
    document.getElementsByTagName("body")[0].style.backgroundColor = "#eee";
    document.getElementsByTagName("body")[0].style.color = "black !important";
    textarea.classList.remove("w3-dark-grey");
    textarea.style.backgroundColor = "#ddd";
    line_numbers.classList.remove("w3-dark-grey");
    line_numbers.style.backgroundColor = "#ddd";
    document.getElementById("settings_tab").style.backgroundColor = "#eee"
    document.getElementById("settings_tab").style.color = "black !important";
    textarea.style.borderTop = "1px solid grey";
    for (var x = 0; x < elements_to_be_changed_dark.length; x++){
      elements_to_be_changed_dark[x].style.backgroundColor = "#eee";
      elements_to_be_changed_dark[x].style.color = "black !important";
    }
  }*/else if (theme_name == "blue") {
        document.getElementById("custom_theme").style.display = "none";
        for (var x = 0; x < elements_to_be_changed.length; x++) {
            elements_to_be_changed[x].style.backgroundColor = "#000050";
            elements_to_be_changed[x].style.color = "white";
        }
        elements_to_be_changed_dark = [textarea, line_numbers, document.getElementById("topbar"), document.getElementById("btmbar"), document.getElementById("Snippets_Button")];
        elements_to_be_changed_dark[2].classList.remove("w3-dark-grey");
        //elements_to_be_changed[2].style.borderBottom = "1px solid grey";
        elements_to_be_changed_dark[2].style.borderTop = "1px solid #0000ff";
        elements_to_be_changed_dark[3].style.borderTop = "1px solid #0000ff";
        elements_to_be_changed_dark[3].classList.remove("w3-dark-grey");
        document.getElementsByTagName("body")[0].classList.remove("w3-dark-grey");
        document.getElementsByTagName("body")[0].style.backgroundColor = "#000030";
        document.getElementsByTagName("body")[0].style.color = "white";
        document.getElementById("settings_tab").classList.remove("w3-dark-grey");
        textarea.style.borderTop = "1px solid #0000ff";
        for (var x = 0; x < elements_to_be_changed_dark.length; x++) {
            elements_to_be_changed_dark[x].style.backgroundColor = "#000030";
            elements_to_be_changed_dark[x].style.color = "white";
        }
    } else if (theme_name == "grey") {
        document.getElementById("custom_theme").style.display = "none";
        for (var x = 0; x < elements_to_be_changed.length; x++) {
            elements_to_be_changed[x].style.backgroundColor = "#454545";
            elements_to_be_changed[x].style.color = "white";
        }
        elements_to_be_changed_dark = [document.getElementById("topbar"), document.getElementById("btmbar"), document.getElementById("Snippets_Button")];
        elements_to_be_changed_dark[0].classList.remove("w3-dark-grey");
        //elements_to_be_changed[2].style.borderBottom = "1px solid grey";
        elements_to_be_changed_dark[0].style.borderTop = "1px solid grey";
        elements_to_be_changed_dark[1].style.borderTop = "1px solid grey";
        elements_to_be_changed_dark[1].classList.remove("w3-dark-grey");
        document.getElementById("settings_tab").classList.remove("w3-dark-grey");
        document.getElementsByTagName("body")[0].classList.remove("w3-dark-grey");
        document.getElementsByTagName("body")[0].style.backgroundColor = "#454545";
        textarea.classList.remove("w3-dark-grey");
        textarea.style.backgroundColor = "#303030";
        line_numbers.classList.remove("w3-dark-grey");
        line_numbers.style.backgroundColor = "#303030";
        document.getElementsByTagName("body")[0].style.color = "white";
        textarea.style.borderTop = "1px solid grey";
        for (var x = 0; x < elements_to_be_changed_dark.length; x++) {
            elements_to_be_changed_dark[x].style.backgroundColor = "#555555";
            elements_to_be_changed_dark[x].style.color = "white";
        }
    } else if (theme_name == "red") {
        document.getElementById("custom_theme").style.display = "none";
        for (var x = 0; x < elements_to_be_changed.length; x++) {
            elements_to_be_changed[x].style.backgroundColor = "#500000";
            elements_to_be_changed[x].style.color = "white";
        }
        elements_to_be_changed_dark = [textarea, line_numbers, document.getElementById("topbar"), document.getElementById("btmbar"), document.getElementById("Snippets_Button")];
        elements_to_be_changed_dark[2].classList.remove("w3-dark-grey");
        //elements_to_be_changed[2].style.borderBottom = "1px solid grey";
        elements_to_be_changed_dark[2].style.borderTop = "1px solid #ff0000";
        elements_to_be_changed_dark[3].style.borderTop = "1px solid #ff0000";
        elements_to_be_changed_dark[3].classList.remove("w3-dark-grey");
        document.getElementById("settings_tab").classList.remove("w3-dark-grey");
        document.getElementsByTagName("body")[0].classList.remove("w3-dark-grey");
        document.getElementsByTagName("body")[0].style.backgroundColor = "#400000";
        document.getElementsByTagName("body")[0].style.color = "white";
        textarea.style.borderTop = "1px solid #ff0000";
        for (var x = 0; x < elements_to_be_changed_dark.length; x++) {
            elements_to_be_changed_dark[x].style.backgroundColor = "#400000";
            elements_to_be_changed_dark[x].style.color = "white";
        }
    } else if (theme_name == "custom") {
        document.getElementById("custom_theme").style.display = "block";
    }
}
function copy_source_code() {
    navigator.clipboard.writeText(content);
}

window.addEventListener('keydown', function (e) {
    if (event.altKey && !(event.shiftKey) && event.which == 83) {
        event.preventDefault();
        download_file();
    } else if (event.altKey && event.which == 78) {
        event.preventDefault();
        new_file();
    } else if (event.altKey && event.which == 79) {
        event.preventDefault();
        open_file();
    }
});

function line_numbers_on_load() {
    if (!(turn_off_line_numbers)) {
        var content = (textarea.value).split("\n");
        line_numbers.innerHTML = "";
        for (var x = 0; x < content.length; x++) {
            line_numbers.innerHTML += x + 1 + '</br>';
            if (x > 99) {
                line_numbers.style.width = "3%";
                textarea.style.width = "48.5%";
                document.getElementById("output").style.width = "48.5%";
            } else if (x < 99) {
                line_numbers.style.width = "2%";
                textarea.style.width = "49";
                document.getElementById("output").style.width = "49%";
            }
        }
        line_numbers.scrollTop = textarea.scrollTop;
    }
}
function line_numbers_open_file(text) {
    if (!(turn_off_line_numbers)) {
        var content = text.split("\n");
        line_numbers.innerHTML = "";
        for (var x = 0; x < content.length; x++) {
            line_numbers.innerHTML += x + 1 + '</br>';
            if (x > 99) {
                line_numbers.style.width = "3%";
                textarea.style.width = "48.5%";
                document.getElementById("output").style.width = "48.5%";
            } else if (x < 99) {
                line_numbers.style.width = "2%";
                textarea.style.width = "49";
                document.getElementById("output").style.width = "49%";
            }
        }
        line_numbers.scrollTop = textarea.scrollTop;
    }
}
function scroll_sync_textarea() {
    var content = (textarea.value).split("\n");
    line_numbers.scrollTop = textarea.scrollTop;
    if (!(line_numbers.scrollTop == textarea.scrollTop)) {
        line_numbers.scrollTop = textarea.scrollTop;
    }
}
function new_file() {
    textarea.value = "";
    document.getElementById("file_name_selector").value = "";
    file_name = "File";
    line_numbers.innerHTML = "1";
}

function font_size_init() {
    var font_size_select_val = document.getElementById("font_size_selector").value;
    textarea.style.fontSize = font_size_select_val + "px";
    line_numbers.style.fontSize = font_size_select_val + "px";
}
function font_family_init() {
    var font_family_select_val = document.getElementById("font_family_selector").value;
    textarea.style.fontFamily = font_family_select_val;
}
function file_type_init() {
    var file_type_selector_val = document.getElementById("file_type_selector").value;
    file_type = file_type_selector_val;
    if (file_type_selector_val != "plain") {
        textarea.spellcheck = false;
    } else {
        textarea.spellcheck = true;
    }
    if (file_type == "html") {
        document.getElementById('popup_window').style.display = "block";
    } else {
        document.getElementById('popup_window').style.display = "none";
    }
}
setInterval(file_type_init, 10);
function file_name_init() {
    var file_name_selector_val = document.getElementById("file_name_selector").value;
    file_name = file_name_selector_val;
}
