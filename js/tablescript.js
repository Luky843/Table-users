// JavaScript source code
charset = "utf-8";

var listDisplayState = 0;

function displayErrMsg(elm, msg) {
    document.getElementById(elm).innerHTML = msg;
    document.getElementById(elm).style.color = "red";
    document.getElementById(elm).style.display = "block";
}

//Name validator
function isNameValid() {
    if (document.getElementById('Name').value == "") {
        displayErrMsg("er1", "Enter Name!");
        return false;
    } else {
        displayErrMsg("er1", "");
    }
    var name = document.getElementById('Name');
    var filter = /^[a-zA-Z ]{1,25}$/;
    if (!filter.test(name.value)) {
        displayErrMsg("er1", "Incorrect Name!");
        return false;
    } else {
        displayErrMsg("er1", "");
    }
    return true;
}

//Surname validator
function isSurnameValid() {
    if (document.getElementById('Surname').value == "") {
        displayErrMsg("er2", "Enter Surname!");
        return false;
    } else {
        displayErrMsg("er1", "");
    }
    var surname = document.getElementById('Surname');
    var filter = /^[a-zA-Z ]{1,25}$/;
    if (!filter.test(surname.value)) {
        displayErrMsg("er2", "Incorrect Surname!");
        return false;
    } else {
        displayErrMsg("er2", "");
    }
    return true;
}

//DoB validator
function isDobValid() {
    if (document.getElementById('Age').value == "") {
        displayErrMsg("AgeErr", "Enter date!");
        return false;
    } else {
        displayErrMsg("AgeErr", "");
    }
    if (!isInputDateValid(document.getElementById('Age').value)) {
        displayErrMsg("AgeErr", "Incorrect Date!");
        return false;
    } else {
        displayErrMsg("AgeErr", "");
    }
    return true;
}

//Input validator
function isInputValid() {
    isNameValid();
    isSurnameValid();
    isDobValid();
    if (isNameValid() && isSurnameValid() && isDobValid()) {
        return true;
    }
    return false;
}

//Create row in table
function AddRow() {
    document.getElementById("Table").style = "";
    if (!isInputValid()) {
        return;
    }

    var actual_date = new Date();
    var age = document.getElementById('Age').value;
    if (/./.test(age)) {
        age = age.replace(".", "-");
        age = age.replace(".", "-");
    }
    age = age.split("-");
    var day = age[0];
    var month = age[1];
    var year = age[2];
    var new_date = new Date(Number(year), Number(month) - 1, Number(day));
    age = new Date(actual_date - new_date).getFullYear() - 1970;
    /***********************************************************/
    var table = document.getElementById("MyTable");
    var row = table.insertRow(table.rows.length);
    if (document.getElementById('male').checked) { //set class for row
        row.className = "male";
    } else {
        row.className = "female";
    }

    var cell1 = row.insertCell(0);
    cell1.innerHTML = '<b><span class="bigger">' + document.getElementById('Name').value + ' ' + document.getElementById('Surname').value; + '</span></b>';
    var cell2 = row.insertCell(1);
    cell2.innerHTML = age;
    var cell3 = row.insertCell(2);
    cell3.innerHTML = '<i class="fa fa-ban red-500" style="font-size:1.3em; cursor:pointer; padding-left:15px;" onclick="DeleteRow(this)" aria-hidden="true" value="Delete"></i>';
    document.getElementById("form").reset();
}
   
    function isInputDateValid(date) {
        var actual_date = new Date()
        var patern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
        if (!patern.test(date)) {
            return false;
        }
        var day, month, year;
        if (/-/.test(date)) {
            var res = date.split("-");
            day = res[0];
            month = res[1];
            year = res[2];
        } else if (/./.test(date)) {
            var res = date.split(".");
            day = res[0];
            month = res[1];
            year = res[2];
        } else {
            return false;
            var r = date.replace(/\//i, "-");
            var res = r.split("-");
            day = res[0];
            month = res[1];
            year = res[2];
        }
        new_date = new Date(Number(year), Number(month) - 1, Number(day));
        if (new_date >= actual_date) {
            return false;
        }
        return true;
    }

//Delete current row
    function DeleteRow(r) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F44336",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function deleteRow() {
            var i = r.parentNode.parentNode.rowIndex;
            document.getElementById("MyTable").deleteRow(i);
            swal("Deleted!", "Current row has been deleted.", "success");
        });
    }

//Show only male
    function showManList() {
        table = document.getElementById("MyTable")
        //Refresh table
        for (var i = 0; i < table.rows.length; i++) {
            try{
                table.rows[i].style.display = "";
            } catch (err) {
            }
        }

        //Hide female
        for (var i = 0; i < table.rows.length; i++) {
            try {
                var femaleClass = table.rows[i].getAttribute("class");
                if (femaleClass == "female") {
                    table.rows[i].style.display = "none";
                }
            } catch (err) {
            }
        }
        listDisplayState = 2;
        if (document.getElementById("search").value != "") {
            search();
        }
    }

    function showFemaleList() {
        table = document.getElementById("MyTable")
        //Refresh table
        for (var i = 0; i < table.rows.length; i++) {
            try {
                table.rows[i].style.display = "";
            } catch (err) {
            }
        }

        //Hide male
        for (var i = 0; i < table.rows.length; i++) {
            try {
                var maleClass = table.rows[i].getAttribute("class"); 
                if (maleClass == "male") {
                    table.rows[i].style.display = "none";
                }
            } catch (err) {
            }
        }
        listDisplayState = 1;
        if (document.getElementById("search").value != "") {
            search();
        }
    }

    function showAllSex() {
        for (var i = 0; i < table.rows.length; i++) {
            try {
                table.rows[i].style.display = "";
            } catch (err) {
            }
        }
        listDisplayState = 0;
        if (document.getElementById("search").value != "") {
            search();
        }
    }

