create table Client (
idClient int primary key identity(1,1),
name varchar(100),
compName varchar(100),
cnpj varchar(20),
email varchar(50),
phone varchar(50),
pswd varchar(256)
);

create table DeviceType (
idType int primary key identity(1,1),
name varchar(30)
);

create table DeviceStatus (
idStatus int primary key identity(1,1),
description varchar(20),
);

create table Server (
idServer int primary key identity(1,1),
name varchar(30),
FK_client int foreign key references Client(idClient)
);

create table Device (
idDevice int primary key identity(1,1),
name varchar(30),
description varchar(40),
model varchar(30),
fk_type int foreign key references DeviceType(idType),
fk_server int foreign key references Server(idServer),
fk_status int foreign key references DeviceStatus(idStatus)
);

create table ServerComponents (
idServerComponents int primary key identity(1,1),
name varchar(30),
size int,
FK_Server int foreign key references Server(idServer)
);

create table ServerLog (
idServerLog int primary key identity(1,1),
value int,
date_time datetime,
FK_Server int foreign key references Server(idServer),
FK_ServerComponents int foreign key references ServerComponents(idServerComponents)
);