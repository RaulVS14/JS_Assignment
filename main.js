var test_data = [
    {
        'word': "anna",
        'expected': true
    },

    {
        'word': "Anna",
        'expected': true
    },

    {
        'word': "anna ",
        'expected': true
    },

    {
        'word': "YellowSubmarine",
        'expected': false
    }
];

function isPalindrome(word) {
    var checkedWord = word.toLowerCase().replace(/^\s+|\s+$/gm, '');
    var palindromeCheck = true;
    for (var i = 0, n = checkedWord.length - 1; i <= n; i++) {
        console.log(checkedWord.charAt(i), checkedWord.charAt(n-i));
        if (checkedWord.charAt(i) !== checkedWord.charAt(n - i)) {
            palindromeCheck = false;
            break;
        }
    }
    return palindromeCheck;
}

function createRow(object, tableBody) {
    var resultRow = document.createElement("tr");
    var tableRowsCount = tableBody.getElementsByTagName('tr').length;
    var sequence = document.createElement('td');
    sequence.innerText = (tableRowsCount + 1).toString() + ".";
    resultRow.appendChild(sequence);
    for (var key in object) {

        var tableColumn = document.createElement('td');
        if (key === 'expected') {
            console.log(isPalindrome(object['word']), object['expected']);
            if (isPalindrome(object['word']) === object['expected']) {
                tableColumn.style.backgroundColor = "green";
            } else {
                tableColumn.style.backgroundColor = "red";
            }
        } else {
            tableColumn.innerText = object["" + key + ""];
        }
        resultRow.appendChild(tableColumn);
    }
    return resultRow;
}

function addTest(formObject, tableBody) {
    var newRow = createRow(formObject, tableBody);
    tableBody.appendChild(newRow);
}

function init(tableElemId, formId) {
    var msg;
    var tableElem = document.getElementById(tableElemId);
    if (!tableElem) {
        msg = "Please specify correct id for the table"
    } else {
        var tableElemBody = tableElem.getElementsByTagName('tbody')[0];
        if (!tableElemBody) {
            var newTableBody = document.createElement('tbody');
            tableElemBody = newTableBody;
            tableElem.appendChild(newTableBody);
        }
        for (var i = 0, n = test_data.length - 1; i <= n; i++) {
            var row = createRow(test_data[i], tableElemBody);
            tableElemBody.appendChild(row);
        }

        var form = document.getElementById(formId);

        if (!form) {
            msg = "Please specify correct id for the interface"
        } else {
            var formWord = form.getElementsByTagName("input")[0];
            var formExpected = form.getElementsByTagName("select")[0];
            var formSubmit = form.getElementsByTagName("button")[0];
            if(form.addEventListener){
                formSubmit.addEventListener("click", function (ev) {
                    var booleanValue = (formExpected.value === "true");
                    var formObject = {
                        "word": formWord.value,
                        "expected": booleanValue
                    };
                    addTest(formObject, tableElemBody);
                    form.reset();
                });
                form.addEventListener("submit", function (ev) {
                    console.log(formExpected.value);
                    var formObject = {
                        "word": formWord.value,
                        "expected": formExpected.value
                    };
                    addTest(formObject, tableElemBody);
                    form.reset();
                    ev.preventDefault();
                });

            } else if (form.attachEvent) {
                document.getElementsByTagName("form")[0].style.display = "none";
            }
        }
    }
    if (window.console && msg) {
        console.log(msg);
    }
}

function ieTest() {
    var text = "<pre>console.log(" + (isPalindrome("anna") === true) + "):<br>" +
        "console.log(" + (isPalindrome("Anna") === true) + "):<br>" +
        "console.log(" + (isPalindrome("anna ") === true) + "):<br>" +
        "console.log(" + (isPalindrome("YellowSubmarine") === false) + "):<br></pre>";
    document.write(text);
}

function testIsPalindrome(fn) {
    console.log(fn("anna") === true);
    console.log(fn("Anna") === true);
    console.log(fn("anna ") === true);
    console.log(fn("YellowSubmarine") === false);
}
if (window.console) {
    testIsPalindrome(isPalindrome);
} else {
    ieTest()
}

var isIE = /*@cc_on!@*/!!document.documentMode;

if (isIE) {
    document.getElementsByTagName("header")[0].style.display = "none";
    document.getElementsByTagName("main")[0].style.display = "none";
}
if (!isIE) {
    document.addEventListener("DOMContentLoaded", function () {
        init("test-table", "test-form");
    });
} else {
    window.onload = function (ev) {
        init("test-table", "test-form");
    }
}
