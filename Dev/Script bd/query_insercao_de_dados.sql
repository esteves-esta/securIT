insert into client(name,compname,cnpj,email,phone,pswd) values
('pessoa1','companhia1',38475647389765,'amil1@gmail.com,',988756409,'1234'),
('pessoa2','companhia2',38475647384657,'amil2@gmail.com,',988756408,'1234'),
('pessoa3','companhia3',38475647389766,'amil3@gmail.com,',988756407,'admin'),
('pessoa4','companhia4',38475647389767,'amil4@gmail.com,',988756406,'admin'),
('pessoa5','companhia5',38475647389768,'amil5@gmail.com,',988756405,'1234');

insert into [dbo].[DeviceStatus](description) values
('online'),
('offline');

insert into [dbo].[DeviceType](name) values 
('camera'),
('catraca'),
('internet'),
('alarme');

insert into [dbo].[Server](name,FK_client) values 
('server1',1),
('server2',2),
('server3',3),
('server4',4),
('server5',5);

insert into [dbo].[ServerComponents](name,size,FK_Server) values 
('HD1',100,1),
('HD2',100,2),
('HD3',100,3),
('HD4',100,4),
('HD5',100,5),
('RAM1',100,1),
('RAM2',100,2),
('RAM3',100,3),
('RAM4',100,4),
('RAM5',100,5),
('RAM1',100,1),
('CPU2',100,2),
('CPU3',100,3),
('CPU4',100,4),
('CPU5',100,5);

insert into [dbo].[Device](name,description,model,fk_type,fk_server,fk_status) values
('camera1','desc1','modelo1',1,1,1),
('camera2','desc2','modelo2',1,2,1),
('camera3','desc3','modelo3',1,3,1),
('camera4','desc4','modelo4',1,4,1),
('camera5','desc5','modelo5',1,5,2),
('catraca1','desc1','modelo1',2,1,1),
('catraca2','desc2','modelo2',2,2,1),
('catraca3','desc3','modelo3',2,3,1),
('catraca4','desc4','modelo4',2,4,2),
('catraca5','desc5','modelo5',2,5,1),
('internet1','desc1','modelo1',3,1,1),
('internet2','desc2','modelo2',3,2,2),
('internet3','desc3','modelo3',3,3,1),
('internet4','desc4','modelo4',3,4,1),
('internet5','desc5','modelo5',3,5,1),
('alarme1','desc1','modelo1',4,1,1),
('alarme2','desc2','modelo1',4,2,1),
('alarme3','desc3','modelo1',4,3,1),
('alarme4','desc4','modelo1',4,4,2),
('alarme5','desc5','modelo1',4,5,1);

insert into [dbo].[ServerLog](value,date_time,fk_server,fk_servercomponents) values 
(20,'01/01/2019 00:00:01',1,1),
(30,'01/01/2019 00:00:02',2,2),
(46,'01/01/2019 00:00:03',3,3),
(78,'01/01/2019 00:00:04',4,4),
(65,'01/01/2019 00:00:05',5,5),
(12,'01/01/2019 00:00:06',1,6),
(99,'01/01/2019 00:00:07',2,7),
(36,'01/01/2019 00:00:08',3,8),
(3,'01/01/2019 00:00:09',4,9),
(6,'01/01/2019 00:00:10',5,10),
(100,'01/01/2019 00:00:11',1,11),
(77,'01/01/2019 00:00:12',2,12),
(53,'01/01/2019 00:00:13',3,13),
(62,'01/01/2019 00:00:14',4,14),
(69,'01/01/2019 00:00:15',5,15);