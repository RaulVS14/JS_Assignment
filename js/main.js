// data for tests
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

/**
 * isPalindrome(): Function that checks if word is palindrome, uses word as a parameter
 * @param {string} word - The word that is being checked
 * @returns {boolean} palindromeCheck
 */
function isPalindrome(word) {
    // Cleaning and format to lower case
    var checkedWord = word.toLowerCase().replace(/^\s+|\s+$/gm, '');
    var palindromeCheck = true;

    // Loop through the characters and check if they are same backwards
    for (var i = 0, n = checkedWord.length - 1; i <= n; i++) {
        if (checkedWord.charAt(i) !== checkedWord.charAt(n - i)) {
            palindromeCheck = false;
            break;
        }
    }
    return palindromeCheck;
}

/**
 * createRow(): Function that creates rows for the table based on test data object
 * @param {object} formObject - form data object
 * @param {HTMLTableElement} tableBody - table object
 * @returns {HTMLTableRowElement} resultRow
 */
function createRow(formObject, tableBody) {

    // Create elements for the row element
    var resultRow = document.createElement("tr");
    var tableRowsCount = tableBody.getElementsByTagName('tr').length;
    var sequence = document.createElement('td');

    // Create sequence number column for the row
    sequence.innerText = (tableRowsCount + 1).toString() + ".";
    resultRow.appendChild(sequence);

    // Loop through the object and create column elements for the row
    for (var key in formObject) {
        var tableColumn = document.createElement('td');

        // If object key is 'expected' add background-color based on comparison
        if (key === 'expected') {

            // Create text-based element for printing
            var createBooleanText = document.createElement('span');

            // Compare if isPalindrome() function result matches expected result
            if (isPalindrome(formObject['word']) === formObject['expected']) {
                tableColumn.style.backgroundColor = "green";
            } else {
                tableColumn.style.backgroundColor = "red";
            }

            // Add class and the content to print element
            createBooleanText.className += "print-only";
            createBooleanText.innerText = formObject["" + key + ""];
            tableColumn.appendChild(createBooleanText);
        } else {
            tableColumn.innerText = formObject["" + key + ""];
        }

        // Append created column to the row element
        resultRow.appendChild(tableColumn);
    }
    return resultRow;
}

/**
 * addTest(): function for adding tests to the table
 * @param {object} formObject - form data object that contains test data
 * @param {HTMLTableElement} tableBody - table object
 * @returns {HTMLTableElement} tableBody
 */
function addTest(formObject, tableBody) {

    // Create row using createRow() function
    var newRow = createRow(formObject, tableBody);
    tableBody.appendChild(newRow);
    return tableBody;
}

/**
 * init(): function for initializing the table with test data and bind eventListeners
 * @param {string} tableElemId - ID of table that will be used for finding the table element
 * @param {string} formId - ID of form that will be used for finding the form element
 */
function init(tableElemId, formId) {

    // Message variable for errors that will be displayed in the console
    var msg;

    // Get table element
    var tableElem = document.getElementById(tableElemId);
    if (!tableElem) {

        // Message to display if didn't find the table element
        msg = "Please specify correct id for the table"
    } else {
        // Get table body
        var tableElemBody = tableElem.getElementsByTagName('tbody')[0];

        // If it wasn't coded into table element create it
        if (!tableElemBody) {
            var newTableBody = document.createElement('tbody');
            tableElemBody = newTableBody;
            tableElem.appendChild(newTableBody);
        }

        // Create table based on test_data
        for (var i = 0, n = test_data.length - 1; i <= n; i++) {
            var row = createRow(test_data[i], tableElemBody);
            tableElemBody.appendChild(row);
        }

        // Get the form element
        var form = document.getElementById(formId);

        if (!form) {

            // Message to display if didn't find the form element
            msg = "Please specify correct id for the interface"

        } else {
            // Check if addEventListener is accessible
            if (form.addEventListener) {
                // Add necessary eventListeners
                form.addEventListener("submit", function (ev) {
                    var result = submitForm(ev, form, tableElemBody);
                    if (!result){
                        msg = "Failed to add result";
                    }
                    ev.preventDefault();
                });

                document.addEventListener("open-interface", function () {
                    showInterface(form);
                });

                document.addEventListener("close-interface", function () {
                    hideInterface(form);
                });

            } else if (form.attachEvent) {

                // If addEventListener wasn't found use attachEvent that was used by older browsers.
                // Hide interactive elements to display only test_data table. Meant for IE6 based view
                document.getElementById("test-interface-title").style.display = "none";
                document.getElementById("test-form").style.display = "none";
                document.getElementById("open-interface").style.display = "none";
                document.getElementById("close-interface").style.display = "none";
            }
        }
    }

    // Check if message and console are accessible: if they are, display message
    if (window.console && msg) {
        console.log(msg);
    }
}

// Check if the browser is older IE
var isIE = /*@cc_on!@*/!!document.documentMode;

// Check how to call the init() based on the browser
if (!isIE) {
    document.addEventListener("DOMContentLoaded", function () {
        init("test-table", "test-form");
    });
} else {
    window.onload = function (ev) {
        init("test-table", "test-form");
    }
}

/**
 * submitForm(): function for initializing the table with test data and bind eventListeners
 * @param {object} ev - event object
 * @param {HTMLFormElement} form - form element that was submitted the request
 * @param {HTMLTableElement} tableElemBody - target table body that will be used to display the submitted test
 */
function submitForm(ev, form, tableElemBody) {
    if (form && tableElemBody) {
        var formWord = form.getElementsByTagName("input")[0];
        var formExpected = form.getElementsByTagName("select")[0];
        var booleanValue = (formExpected.value === "true");

        // Create formObject for storing formData
        var formObject = {
            "word": formWord.value,
            "expected": booleanValue
        };

        if (formObject.word && formExpected.value) {
            addTest(formObject, tableElemBody);
            form.reset();
            hideInterface(form);
        } else {
            alert("Please fill all fields");
        }

        return true;
    } else {
        return false;
    }
}

/**
 * hideInterface(): function for hiding form interface
 * @param {HTMLElement} form - form element that is targeted
 */
function hideInterface(form) {
    var view_size = document.getElementsByTagName('body')[0].offsetWidth;
    if (view_size <= 450) {
        form.parentElement.classList.remove("open");
        form.parentElement.classList.add("hidden");
    }
}

/**
 * showInterface(): function for displaying form interface
 * @param {HTMLElement} form - form element that is targeted
 */
function showInterface(form) {
    var view_size = document.getElementsByTagName('body')[0].offsetWidth;
    if (view_size <= 450) {
        form.parentElement.classList.remove("hidden");
        form.parentElement.classList.remove("mobile-hide");
        form.parentElement.classList.add("open");
    }
}

/**
 * openEvent(): function for dispatching open-interface event
 */
function openEvent() {
    var event = new Event('open-interface');
    document.dispatchEvent(event);
}

/**
 * openEvent(): function for dispatching close-interface event
 */
function closeEvent() {
    var event = new Event('close-interface');
    document.dispatchEvent(event);
}