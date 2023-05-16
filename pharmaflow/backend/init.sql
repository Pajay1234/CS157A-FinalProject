CREATE TABLE `customer_prescription_invoice` (
  `customer_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `prescription_id` int DEFAULT NULL,
  `prescription_name` varchar(255) DEFAULT NULL,
  `prescription_quantity` int DEFAULT NULL,
  `prescription_frequency` int DEFAULT NULL,
  `invoice_number` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total_cost` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `employee` (
  `employee_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `pharmacy_id` int DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `salary` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `invoice_line_item` (
  `invoice_number` int NOT NULL,
  `product_number` int NOT NULL,
  `quantity_ordered` int DEFAULT NULL,
  PRIMARY KEY (`invoice_number`,`product_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order_line_item` (
  `order_id` int NOT NULL,
  `product_number` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`order_id`,`product_number`),
  KEY `order_line_item_ibfk_2` (`product_number`),
  CONSTRAINT `order_line_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `pharmacy_order` (`order_id`),
  CONSTRAINT `order_line_item_ibfk_2` FOREIGN KEY (`product_number`) REFERENCES `product` (`product_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pharmacy` (
  `pharmacy_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  `opening_hours` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`pharmacy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pharmacy_order` (
  `order_id` int NOT NULL,
  `order_date` date DEFAULT NULL,
  `supplier_id` int DEFAULT NULL,
  `total_cost` decimal(8,2) DEFAULT NULL,
  `pharmacy_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_supplier` (`supplier_id`),
  KEY `pharmacy_id` (`pharmacy_id`),
  CONSTRAINT `fk_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`),
  CONSTRAINT `pharmacy_order_ibfk_1` FOREIGN KEY (`pharmacy_id`) REFERENCES `pharmacy` (`pharmacy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `supplier` (
  `supplier_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product` (
  `product_number` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `quantity_in_stock` int NOT NULL,
  `supplier_id` int DEFAULT NULL,
  FOREIGN KEY (`supplier_id`) REFERENCES supplier(`supplier_id`),
  PRIMARY KEY (`product_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `pharmaflow`.`customer_prescription_invoice`
(`customer_id`,
`name`,
`address`,
`phone_number`,
`email`,
`date_of_birth`,
`prescription_id`,
`prescription_name`,
`prescription_quantity`,
`prescription_frequency`,
`invoice_number`,
`order_date`,
`total_cost`)
VALUES
(1, 'John Doe', '123 Main St', '555-1234', 'john.doe@example.com', '1990-01-01', 1001, 'Lipitor', 30, 1, 10001, '2023-05-15', 120.50),
(2, 'Jane Smith', '456 Maple Ave', '555-5678', 'jane.smith@example.com', '1985-07-04', 1002, 'Synthroid', 90, 3, 10002, '2023-05-16', 80.25),
(3, 'Bob Johnson', '789 Oak St', '555-9012', 'bob.johnson@example.com', '1972-12-25', 1003, 'Metformin', 60, 2, 10003, '2023-05-17', 45.75),
(4, 'Alice Lee', '321 Elm St', '555-3456', 'alice.lee@example.com', '1998-06-30', 1004, 'Advair', 14, 1, 10004, '2023-05-18', 225.00),
(5, 'Tom Brown', '654 Pine St', '555-7890', 'tom.brown@example.com', '1955-03-15', 1005, 'Zoloft', 30, 1, 10005, '2023-05-19', 75.90);


INSERT INTO `pharmaflow`.`employee`
(`employee_id`,
`name`,
`address`,
`phone_number`,
`email`,
`hire_date`,
`pharmacy_id`,
`position`,
`salary`)
VALUES
(1, 'Jane Doe', '123 Main St', '555-1234', 'janedoe@email.com', '2020-01-01', 1, 'Pharmacist', 75000.00),
(2, 'John Smith', '456 Elm St', '555-5678', 'johnsmith@email.com', '2020-02-15', 1, 'Pharmacy Technician', 35000.00),
(3, 'Sara Johnson', '789 Oak St', '555-9012', 'sjohnson@email.com', '2020-03-30', 2, 'Pharmacist', 80000.00),
(4, 'Bob Lee', '246 Baker St', '555-3456', 'boblee@email.com', '2020-04-15', 2, 'Pharmacy Technician', 40000.00),
(5, 'Mike Smith', '369 Maple St', '555-7890', 'mikesmith@email.com', '2020-05-01', 3, 'Pharmacist', 90000.00);


INSERT INTO `pharmaflow`.`invoice_line_item`
(`invoice_number`,
`product_number`,
`quantity_ordered`)
VALUES
(1, 1001, 2),
(2, 1003, 1),
(3, 1005, 3),
(4, 1004, 2),
(5, 1002, 1);

INSERT INTO `pharmaflow`.`order_line_item`
(`order_id`,
`product_number`,
`quantity`)
VALUES
(1, 1001, 10),
(2, 1003, 5),
(3, 1002, 3),
(4, 1004, 7),
(5, 1005, 2);

INSERT INTO `pharmaflow`.`pharmacy`
(`pharmacy_id`,
`name`,
`address`,
`phone_number`,
`email`,
`website`,
`opening_hours`)
VALUES
(101, 'ABC Pharmacy', '123 Main St', '555-1234', 'abcpharmacy@example.com', 'www.abcpharmacy.com', 'Mon-Fri: 9am-5pm'),
(102, 'XYZ Pharmacy', '456 Oak Ave', '555-5678', 'xyzpharmacy@example.com', 'www.xyzpharmacy.com', 'Mon-Sat: 8am-8pm'),
(103, '123 Pharmacy', '789 Maple Blvd', '555-9012', '123pharmacy@example.com', 'www.123pharmacy.com', 'Mon-Fri: 10am-6pm'),
(104, 'MediMart', '321 Elm St', '555-3456', 'medimart@example.com', 'www.medimart.com', 'Mon-Sun: 24 hours'),
(105, 'Pharmco', '678 Cherry Ln', '555-7890', 'pharmco@example.com', 'www.pharmco.com', 'Mon-Sat: 9am-9pm');


INSERT INTO `pharmaflow`.`pharmacy_order`
(`order_id`,
`order_date`,
`supplier_id`,
`total_cost`,
`pharmacy_id`)
VALUES
(1, '2023-05-15', 1, 250.50, 101),
(2, '2023-05-14', 2, 500.75, 102),
(3, '2023-05-13', 3, 750.25, 101),
(4, '2023-05-12', 4, 1000.00, 103),
(5, '2023-05-11', 5, 1250.50, 104);


INSERT INTO `pharmaflow`.`product`
(`product_number`,
`name`,
`brand`,
`description`,
`category`,
`price`,
`quantity_in_stock`,
`supplier_id`)
VALUES
(1001, 'Lipitor', 'Pfizer', 'Cholesterol-lowering medication', 'Prescription', 25.99, 50, 1),
(1002, 'Metformin', 'Novartis', 'Oral diabetes medication', 'Prescription', 12.49, 100, 2),
(1003, 'Albuterol', 'GlaxoSmithKline', 'Bronchodilator for asthma and COPD', 'Prescription', 35.99, 25, 3),
(1004, 'Omeprazole', 'AstraZeneca', 'Proton pump inhibitor for acid reflux', 'Prescription', 15.99, 75, 4),
(1005, 'Fluticasone', 'Merck', 'Nasal spray for allergies and asthma', 'Prescription', 20.49, 30, 5);


INSERT INTO `pharmaflow`.`supplier`
(`supplier_id`,
`name`,
`address`,
`phone_number`,
`email`,
`website`)
VALUES
(1, 'ABC Pharmaceuticals', '123 Main St, Anytown, USA', '(555) 123-4567', 'info@abcpharm.com', 'www.abcpharm.com'),
(2, 'XYZ Suppliers', '456 Oak Ave, Somewhere, USA', '(555) 987-6543', 'sales@xyzsuppliers.com', 'www.xyzsuppliers.com'),
(3, 'Acme Pharma', '789 Elm St, Anytown, USA', '(555) 555-1212', 'info@acmepharma.com', 'www.acmepharma.com'),
(4, 'Medco Suppliers', '321 Maple Ave, Somewhere, USA', '(555) 555-1212', 'sales@medcosuppliers.com', 'www.medcosuppliers.com'),
(5, 'MegaPharm', '555 Oak St, Anytown, USA', '(555) 555-1212', 'info@megapharm.com', 'www.megapharm.com');

-- Trigger to check prescription quantity against product stock.
DELIMITER //
CREATE TRIGGER check_prescription_quantity
BEFORE INSERT ON customer_prescription_invoice
FOR EACH ROW
BEGIN
    DECLARE product_stock INT;
    SELECT quantity_in_stock INTO product_stock FROM product WHERE product_number = NEW.prescription_id;
    IF NEW.prescription_quantity > product_stock THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Prescription quantity exceeds product stock.';
    END IF;
END //
DELIMITER ;

-- Trigger to check order frequency.
DELIMITER //
DROP TRIGGER IF EXISTS check_order_frequency //
CREATE TRIGGER check_order_frequency
BEFORE INSERT ON pharmacy_order
FOR EACH ROW
BEGIN
    DECLARE max_order_date DATE;
    DECLARE frequency INT;
    SELECT MAX(order_date) INTO max_order_date FROM pharmacy_order WHERE order_id = NEW.order_id;
    SELECT prescription_frequency INTO frequency FROM customer_prescription_invoice WHERE customer_id = (SELECT customer_id FROM customer_prescription_invoice LIMIT 1);
    IF NEW.order_date < DATE_ADD(max_order_date, INTERVAL frequency DAY) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Order frequency not met.';
    END IF;
END //
DELIMITER ;


-- Trigger to check ordered quantity against product stock.
DELIMITER //
CREATE TRIGGER check_order_quantity
BEFORE INSERT ON order_line_item
FOR EACH ROW
BEGIN
    DECLARE product_stock INT;
    SELECT quantity_in_stock INTO product_stock FROM product WHERE product_number = NEW.product_number;
    IF NEW.quantity > product_stock THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ordered quantity exceeds product stock.';
    END IF;
END //
DELIMITER ;

-- Trigger to check invoice quantity against prescription quantity.
DELIMITER //
CREATE TRIGGER check_invoice_quantity
BEFORE INSERT ON invoice_line_item
FOR EACH ROW
BEGIN
    DECLARE prescription_quantity INT;
    SELECT prescription_quantity INTO prescription_quantity FROM customer_prescription_invoice WHERE invoice_number = NEW.invoice_number;
    IF NEW.quantity_ordered <> prescription_quantity THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invoice quantity does not match prescription quantity.';
    END IF;
END //
DELIMITER ;





