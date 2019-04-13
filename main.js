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
            if (isPalindrome(object['word']) === object['expected']) {
                tableColumn.style.backgroundColor = "green";
                tableColumn.style.color = "green";
            } else {
                tableColumn.style.backgroundColor = "red";
                tableColumn.style.color = "red";
            }
        }
        tableColumn.innerText = object["" + key + ""];
        resultRow.appendChild(tableColumn);
    }
    return resultRow;
}

function addTest(formObject, tableBody) {
    var newRow = createRow(formObject, tableBody);
    newRow.scrollIntoView({behavior: "smooth", block: "end"});
    tableBody.appendChild(newRow);
    return tableBody;
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
            var formSubmit = form.getElementsByTagName("button")[0];
            if (form.addEventListener) {

                formSubmit.addEventListener("click", function (ev) {
                    submitForm(ev, form, tableElemBody);
                });

                form.addEventListener("submit", function (ev) {
                    submitForm(ev, form, tableElemBody);
                });

                document.addEventListener("open-interface", function () {
                    showInterface(form);
                });


                document.addEventListener("close-interface", function () {
                    hideInterface(form);
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

function submitForm(ev, form, tableElemBody) {
    if (form && tableElemBody) {
        var formWord = form.getElementsByTagName("input")[0];
        var formExpected = form.getElementsByTagName("select")[0];
        var booleanValue = (formExpected.value === "true");
        var formObject = {
            "word": formWord.value,
            "expected": booleanValue
        };
        if (formObject.word && formExpected.value) {
            addTest(formObject, tableElemBody);
            form.reset();
            hideInterface(form);

            ev.preventDefault();
        } else {
            alert("Please fill all fields");
        }
        return 1;
    } else {
        return 0;
    }
}

function hideInterface(form) {
    var view_size = document.getElementsByTagName('body')[0].offsetWidth;
    if (view_size <= 450) {
        form.parentElement.classList.remove("open");
        form.parentElement.classList.add("hidden");
    }
}

function showInterface(form) {
    var view_size = document.getElementsByTagName('body')[0].offsetWidth;
    if (view_size <= 450) {
        form.parentElement.classList.remove("hidden");
        form.parentElement.classList.remove("mobile-hide");
        form.parentElement.classList.add("open");
    }
}

function openEvent() {
    var event = new Event('open-interface');
    document.dispatchEvent(event);
}

function closeEvent() {
    var event = new Event('close-interface');
    document.dispatchEvent(event);
}