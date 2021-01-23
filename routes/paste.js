module.exports = function pasteHTML() {
    var sHTML = "<span style='width=100px'><img src='/public/images/puppy1.jpg'><\/span>"
    oEditors.getById["contents"].exec("PASTE_HTML", [sHTML]);
}