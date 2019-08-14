let currentUser = null;
let headers = ["name", "group_name", "number_of_followers", "my_follow"];
let usersData = [];

//Prepare configurations due to make post request
function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body usersData type must match "Content-Type" header
    })
        .then(response => response.json()); // parses JSON response into native JavaScript objects
}

//Fired when button clicked, then Post request invoked.
function followBtnClicked (id, el) {
    console.log(id)
    let userObj = usersData.find((o) => o.id == id)
    if (userObj.follow_id) {
        fetch('http://localhost:3000/follows/' + userObj.follow_id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: '5bdcdfa40f0a326f858feae0'})
        })
            .then(res => res.text()) // OR res.json()
            .then(res => {
                console.log(res)
                // el.innerHTML = "Follow"
                getData()

            })
            .catch(error => {
                alert(error);
                console.error(error)
            })
    } else {
        let sendObj = {user_id: localStorage.user_id, follow_id: userObj.id}
        postData('http://localhost:3000/follows', sendObj)
            .then(data => {

                console.log(JSON.stringify(data))
                getData()

            }) // JSON-string from `response.json()` call
            .catch(error => {console.error(error); alert(error)});
    }


    console.log(userObj, el)
};

//Fired when button hovered, in order to change button style.
function followBtnMouseover  (id, el) {
    let userObj = usersData.find((o) => o.id == id)
    if (userObj.follow_id) {
        el.innerHTML = "Unfollow";
        el.style.backgroundColor = "red";
    }
};

//Fired when button leaved, in order to change button style.
function followBtnMouseleave (id, el) {
    let userObj = usersData.find((o) => o.id == id)
    if (userObj.follow_id) {
        el.innerHTML = "Following";
        el.style.backgroundColor = "green"
    } else {
        el.innerHTML = "Follow";
        el.style.backgroundColor = "orange"
    }
};

//Fired on init, and on every change on db.
function getData() {
    userId = localStorage.getItem("user_id")
    let getUsersPerUserUrl = "http://localhost:3000/users/" + userId;
    fetch(getUsersPerUserUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            // usersData = JSON.parse(myJson);
            usersData = myJson;
            console.log(usersData);
            drawTable()
            setUserName();
        });
}

//Draw the table, called from getData
function drawTable() {
    // table headings
    let columnHeadings = headers;

    // Get the count of columns.
    let columnCount = columnHeadings.length;

    // The count of rows.
    let rowCount = usersData.length;

    // Create table.

    let table = document.createElement('table');
    if (document.getElementById("data-list").firstChild) {
        document.getElementById("data-list").removeChild(document.getElementById("data-list").firstChild);
    }
    document.getElementById("data-list").appendChild(table);

    // Add the header row.
    let header = table.createTHead();
    let row = header.insertRow(-1);
    for (let i = 0; i < columnCount; i++) {

        let headerCell = document.createElement('th');

        headerCell.innerText = columnHeadings[i].toUpperCase().replace("_", " ");

        row.appendChild(headerCell);

    }

    // Create table body.

    let tBody = document.createElement('tbody');

    table.appendChild(tBody);

    // Add the usersData rows to the table body.

    for (let i = 0; i < rowCount; i++) { // each row

        row = tBody.insertRow(-1);

        for (let j = 0; j < columnCount; j++) { // each column

            let cell = row.insertCell(-1);

            cell.setAttribute('data-label', columnHeadings[j].toUpperCase());

            let obj = usersData[i];

            if (columnHeadings[j] === "my_follow" && +obj.id !== +localStorage.getItem("user_id")) {
                let button = document.createElement('button');
                button.setAttribute('class', 'etmkug-14 SuUwW');
                button.setAttribute('style', 'margin-left: 10px;');
                button.setAttribute('id', obj.id);
                button.setAttribute('onclick', 'followBtnClicked(id,this)');
                button.setAttribute('onMouseOver', 'followBtnMouseover(id,this)');
                button.setAttribute('onMouseOut', 'followBtnMouseleave(id,this)');
                let span = document.createElement('span');
                span.setAttribute('class', 'etmkug-16 ctwFJG');
                console.log()
                if (obj[columnHeadings[j]]) {
                    button.innerHTML = 'Following';
                    button.style.backgroundColor = "green"
                } else {
                    button.innerHTML = 'Follow';
                    button.style.backgroundColor = "orange"

                }
                button.appendChild(span);
                cell.appendChild(button);
                continue;
            }
            cell.innerText = obj[columnHeadings[j]];

        }

    }
}

//if user id exist at localStorage, assign username.
function setUserName() {
    currentUser = usersData.find((user)=> +user.id === +localStorage.getItem("user_id"));

    document.querySelector("#name").innerHTML = currentUser.name;

}

//Fired for every F5
function init() {
    if (localStorage.getItem("user_id")) {
        document.querySelector("#login").style.display = "none";
        document.querySelector("#main").style.display = "block";
        getData();
    } else {
        document.querySelector("#login").style.display = "block";
        document.querySelector("#main").style.display = "none";
    }

}

init();
