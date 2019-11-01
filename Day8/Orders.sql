CREATE TABLE Orders(
   ID INT NOT NULL AUTO_INCREMENT,
   Ordernumber VARCHAR (50) NOT NULL,
   CreatedDate Datetime,
   ModifiedDate Datetime,
   PRIMARY KEY (ID),
   Customer_ID INT NOT NULL,
   FOREIGN KEY(Customer_ID)
   REFERENCES Customers(ID)
   );