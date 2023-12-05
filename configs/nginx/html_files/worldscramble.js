function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function makeid(element, endtext, count, endcount) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0 123456789";
    // count = 20;
    while((count*18)<(endcount*20)) {
        var text = "";
        for (var i = 0; i < count; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            document.getElementById(element).innerHTML=text;
        }
        count++;
        await sleep(60);
    }
    document.getElementById(element).innerHTML=endtext;
}
function start() {
    makeid("header", "Raspberry Pi", 4, 10);
    //makeid("since", "Since november 6 2018", 7, 21);
}