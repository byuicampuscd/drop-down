
/*
 * This creates a dropdown menus within a specified element
 * Parameters:
 * options: the array of items on the list
 * parent: the id of the element to place the dropdown in
 * id: the id to give the dropdown menu
 */
var DropDown = function DD(options, parent, id) {
    this.options = options;
    this.parent = parent;
    this.id = id;
    var section = document.createElement("div");
    var list = document.createElement("ul");
    document.onclick = function (e) {
            section.innerHTML = "";
        }
        // nested to keep scope
    function handle(e) {
        console.log("TRIGGER", e);
        //console.log(options);
        //var list = [];
        list.innerHTML = "";
        section.innerHTML = "";
        var found = false;
        var text = e.target.value.toLowerCase().split(",");
        for (var a in text) {
            list.innerHTML = "";
            found = false;
            for (var i in options) {
                var regex = new RegExp(text[a].trim(), "g");
                //console.log(options[i].match(regex), regex);
                if (options[i].toLowerCase().match(regex) != null) {
                    found = true;
                    var item = document.createElement("li");
                    item.appendChild(document.createTextNode(options[i]));
                    item.onclick = function (ev) {
                            textArea.focus();
                            var next = ev.target.textContent;
                            var fill = "";
                            text[a] = next;
                            for (var b in text) fill += (parseInt(b) < text.length - 1) ? text[b].trim().toLowerCase() + ", " : text[b].trim().toLowerCase();
                            console.log(ev.target.textContent);
                            e.target.value = fill;
                            list.innerHTML = "";
                            section.innerHTML = "";
                        }
                        //if ((text.indexOf(options[i].toLowerCase())) < 0) {
                    list.appendChild(item);
                    // console.log(list);
                    //console.log(text.indexOf(options[i].toLowerCase()), options[i].toLowerCase(), text);
                    //}
                }
                //console.log(options[i]);
            }
        }
        if (!found) {
            var text = document.createTextNode("No items foud!");
            var p = document.createElement("li");
            p.className = "err";
            p.appendChild(text);
            list.appendChild(p);
        }
        //console.log(list);
        section.appendChild(list);
        document.getElementById(parent).appendChild(section);
    }
    var example_text = "";
    var times = 0;
    for (var i in options) {
        if (example_text.indexOf(options[i]) < 0) {
            example_text += options[i] + ", ";
            times++;
        }
        if (times > 2) break;
    }
    example_text += "etc.";
    var textArea = document.createElement("textarea");
    textArea.id = id;
    textArea.onkeyup = handle;
    //    textArea.onchange = handle;
    textArea.placeholder = example_text;
    document.getElementById(parent).appendChild(textArea);
}
