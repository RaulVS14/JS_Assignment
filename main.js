function isPalindrome(word) {
    var checkedWord = word.toLowerCase()
    var palindromeCheck = true;
    for (let i = 0, n = checkedWord.length - 1; i <= n; i++) {
        if (checkedWord[i] !== checkedWord[n - i]) {
            palindromeCheck = false;
            break;
        }
    }
    return palindromeCheck;
}

function elementLogger(element) {
    console.log(element);
}


function addTest() {
    var form = document.forms["testForm"];
    console.log(form["word"].value, form["expected"].value);
    var parentTable = document.getElementById("test-table");
    var resultRow = document.createElement("tr");

    var sequence = document.createElement('td');
    console.log(parentTable.lastChild.firstChild);
    form.reset();
}

console.log (isPalindrome("anna") === true);
console.log (isPalindrome("Anna") === true);
console.log (isPalindrome("anna ") === true);
console.log (isPalindrome("YellowSubmarine") === false);
console.log (isPalindrome("Kuulilennuteetunneliluuk") === true);