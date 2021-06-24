function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (
        typeof document.selection != "undefined" &&
        document.selection.type == "Text"
    ) {
        text = document.selection.createRange().text;
    }
    return text;
}

function getSelectionBoundingRect() {
    var sel = window.getSelection(),
        el = null;
    if (sel.rangeCount) {
        var range = sel.getRangeAt(0);
        const clientRect = range.getBoundingClientRect();
        el = clientRect;
    }
    return el;
}

function getIsInDraadPost() {
    var sel = window.getSelection(),
        isInDraadPost = null,
        draadPost = document.querySelector(".draad-post");
    if (sel.rangeCount) {
        var range = sel.getRangeAt(0);
        const selContainer = range.commonAncestorContainer;
        isInDraadPost = draadPost.contains(selContainer) || draadPost == selContainer;

        console.log(selContainer);
    }
    return isInDraadPost;
}

function doSomethingWithSelectedText() {
    console.log('Do Something');
    var selectedText = getSelectedText();
    var container = getSelectionBoundingRect();

    var isInDraadPost = getIsInDraadPost();

    if (selectedText && isInDraadPost) {
        document.querySelector("#citeerDiv").style.display = "block";

        document.querySelector("#citeerDiv").style.left =
            container.x + container.width / 2 + "px";
        document.querySelector("#citeerDiv").style.top =
            container.y + container.height + "px";

        document
            .querySelector("#citeerDiv > .btn")
            .setAttribute("data-selectie", selectedText);
    } else {
        document.querySelector("#citeerDiv").style.display = "none";

        document
            .querySelector("#citeerDiv > .btn")
            .setAttribute("data-selectie", "");
    }
}

document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;