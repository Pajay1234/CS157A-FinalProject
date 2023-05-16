const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
var urlencodedParser = bodyParser.urlencoded( {extended: false} );

app.use(cors({
    origin: true,
    maxAge: 86400
}));

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "yourpassword",
    database: "pharmaflow",
});
con.connect((err) => { if (err) { console.log(err) }  else { console.log("connection to DB made") }});

//test functionality with curl
app.get('/getAllTables', urlencodedParser, (req, res) => {
        con.query(`SHOW TABLES`, (err, result) => {
            if (err) { console.log(err); res.send("error connecting to db"); }
            res.send(result);
        });
});

app.post('/api/getAllPharmacies', urlencodedParser, async (req, res) => {
    let query = `SELECT name
                 FROM pharmacy;`;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        let pharmacyNames = [];
        result.forEach((item) => {
            pharmacyNames.push(item.name);
        });
        res.json(pharmacyNames);
    });
});

app.post('/api/getSelectedPharmacyID', urlencodedParser, async (req, res) => {
    let query = `SELECT pharmacy_id
                 FROM pharmacy
                 WHERE name = '${req.query.name}';`;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        if (result.length > 1) {
            res.json({msg: "query didn't work"});
        }
        else {
            res.json({pharmacyID: result[0]});
        }
    }); 
});

app.post('/api/getSelectedPharmacyDetails', urlencodedParser, async (req, res) => {
    let query = `SELECT *
                 FROM pharmacy
                 WHERE pharmacy_id = '${req.query.id}';`;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        if (result.length > 1) {
            res.json({msg: "query didn't work"});
        }
        else {
            res.json({pharmacy: result[0]});
        }
    }); 
});

app.post('/api/authEmployee', urlencodedParser, async (req, res) => {
    let query = `
    SELECT *
    FROM employee
    WHERE pharmacy_id = '${req.query.pid}' AND employee_id = '${req.query.eid}' AND name = '${req.query.name}';
    `;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        if (result.length < 1) {
            res.json({pass: false});
        }
        else {
            res.json({pass: true});
        }
    }); 
});

app.post('/api/searchCustomer', urlencodedParser, async (req, res) => {

    let input = req.query.input.split(": ");
    var query;
    if (input[0] == "id") {
        query = `
        SELECT customer_id, name, email, phone_number
        FROM customer_prescription_invoice
        WHERE customer_id = '${input[1]}';
        `;
    }
    else if (input[0] == "name") {
        query = `
        SELECT customer_id, name, email, phone_number
        FROM customer_prescription_invoice
        WHERE name = '${input[1]}';
        `;
    }
    else if (input[0] == "email") {
        query = `
        SELECT customer_id, name, email, phone_number
        FROM customer_prescription_invoice
        WHERE customer_email = '${input[1]}';
        `;
    }
    
    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        else {
            let output = result;
            res.json({customers: output});
        }
    }); 

});

app.post('/api/getCustomerPrescriptionInfo', urlencodedParser, async (req, res) => {
    let query = `
    SELECT prescription_id, prescription_name, prescription_quantity, prescription_frequency
    FROM customer_prescription_invoice
    WHERE customer_id = '${req.query.id}';
    `;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        res.send({prescription: result[0]});
    }); 
});

app.post('/api/changeCustomerPrescriptionInfo', urlencodedParser, async (req, res) => {
    let query = `
    UPDATE customer_prescription_invoice
    SET prescription_id = '${req.query.pid}', prescription_name = '${req.query.name}', prescription_quantity = '${req.query.quantity}', prescription_frequency = '${req.query.frequency}'
    WHERE customer_id = '${req.query.cid}';
    `;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        console.log(result);
        res.send(result);
    }); 
});

app.post('/api/addCustomer', urlencodedParser, async (req, res) => {
    let query = `
        INSERT INTO customer_prescription_invoice
        (customer_id,
        name,
        address,
        phone_number,
        email,
        date_of_birth,
        prescription_id,
        prescription_name,
        prescription_quantity,
        prescription_frequency,
        invoice_number,
        order_date,
        total_cost)
        VALUES
        (${6}, '${req.query.name}', '${req.query.address}', '${req.query.phoneNumber}', '${req.query.email}', '${req.query.dob}', ${req.query.pid}, '${req.query.pName}', ${req.query.pQuan}, ${req.query.pFreq}, null, null, 0.0);`;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        console.log(result);
        res.send(result);
    }); 
});

app.post('/api/searchInventory', urlencodedParser, async (req, res) => {
    let query = `
    SELECT product_number, name, price, quantity_in_stock
    FROM product
    WHERE product_number = '${req.query.pNum}';
    `;
    console.log(req.query.pNum);
    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        res.json({products: result});
    }); 
});

app.post('/api/addInvoice', urlencodedParser, async (req, res) => {
    

    let query = `
        INSERT INTO invoice_line_item
        (invoice_number,
        product_number,
        quantity_ordered)
        VALUES
        (6, 1004, 2);
    `;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        else {
            console.log(result);
            res.json({msg: "ok"});
        }
    }); 
});

app.post('/api/addInvoice', urlencodedParser, async (req, res) => {
    

    let query = `

        INSERT INTO invoice_line_item
        (invoice_number,
        product_number,
        quantity_ordered)
        VALUES
        (6, 1004, 2);
    `;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        else {
            console.log(result);
            res.json({msg: "ok"});
        }
    }); 
});

app.post('/api/addSupplier', urlencodedParser, async (req, res) => {
    let query = `
        INSERT INTO supplier
        (
        supplier_id, 
        name,
        address, 
        phone_number,
        email,
        website
        )
        VALUES
        (6, '${req.query.name}', '${req.query.address}', '${req.query.phoneNumber}', '${req.queryemail}', '${req.querywebsite}');
    `;

    await con.query(query, (err, result) => {
        if (err) { console.log(err); res.send("error connecting to db"); } 
        else {
            console.log(result);
            res.json({msg: "ok"});
        }
    }); 
});

//con.end()
app.listen(5000, () => console.log(`Server started on ${port}`));
