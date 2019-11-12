var db = new PouchDB("mydb");

// for (let obj of data) {
//     const id = String(obj.id);
//     db.get(id).then(function(res) {
//         // doc exists
//         db.put({
//             _id: id,
//             "_rev": res._rev,
//             "first_name": obj.first_name,
//             "last_name": obj.last_name,
//             "email": obj.email,
//             "gender": obj.gender,
//             "ip_address": obj.ip_address
//         }).then(function(res) {
//             console.log("Sucess updating:", res);
//         }).catch(function(err) {
//             console.log("Error updating:", err);
//         })
//     }).catch(function(err) {
//         // doc doesn't exist
//         db.put({
//             _id: id,
//             "first_name": obj.first_name,
//             "last_name": obj.last_name,
//             "email": obj.email,
//             "gender": obj.gender,
//             "ip_address": obj.ip_address
//         }).then(function(res) {
//             console.log("Success:", res);
//         }).catch(function(err) {
//             console.log("Error:", err);
//         })
//     })
// }

// db.createIndex({
//     index: {
//         fields: ["_id", "first_name", "last_name", "email", "gender", "ip_address"],
//         ddoc: "test-index"
//     }
// }).then(function(res) {
//     console.log("Success creating index:", res);
// }).catch(function(err) {
//     console.log("Error creating index:", err);
// })

// setTimeout(() => {
//     db.get("docs").then(function(res) {
//         console.log(res);
//     }).catch(function(err) {
//         console.log(err);
//     });
// }, 1000);

// Inserting poc_data and indexing it

db.bulkDocs(poc_data, function(err, res) {
    if(err) {
        console.log(err);
        return;
    }
    console.log("Successfully inserted poc_data!", res);
})

// db.createIndex({
//     index: {
//         fields: ["title"]
//     }
// }, function(err, res) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("Success creating index:", res);
// })
// db.createIndex({
//     index: {
//         fields: ["author"]
//     }
// }, function(err, res) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("Success creating index:", res);
// })
// db.createIndex({
//     index: {
//         fields: ["title", "author"]
//     }
// }, function(err, res) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("Success creating index:", res);
// })

db.getIndexes(function(err, res) {
    if (err) {
        return console.log(err);
    }
    for (const index of res.indexes) {
        db.deleteIndex(index, function(err, res) {
            if (err) {
                return console.log(err);
            }
            console.log(res);
        })
    }
})

function titleSearch(regex) {
    db.find({
        selector: {
            title: {
                $regex: regex
            }
        }
    }, function(err, res) {
        if(err) {
            console.log(err);
            return;
        }
        console.log(res.docs);
    })
}

function authorSearch(regex) {
    db.find({
        selector: {
            author: {
                $regex: regex
            }
        }
    }, function(err, res) {
        if(err) {
            console.log(err);
            return;
        }
        console.log(res.docs);
    })
}

document.getElementById("titleSearch").addEventListener("click", function(event) {
    const text = document.getElementById("title").value;
    titleSearch(new RegExp(`.*${text}.*`, "gi"));
})

document.getElementById("authorSearch").addEventListener("click", function(event) {
    const text = document.getElementById("author").value;
    authorSearch(new RegExp(`.*${text}.*`, "gi"));
})