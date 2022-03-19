create table Kandidat(
id char(3) primary key,
ime char(20),
prezime char(25)
);
create table Cas(
kod char(10) primary key
);
create table Polaze(
idKandidat char(3),
kod char(10),
primary key(idKandidat,kod),
FOREIGN KEY (idKandidat) REFERENCES Kandidat(id),
foreign key (kod) references Cas(kod)
);

select * from Cas;
select * from kandidat;

Create Database Autoskola;
Use Autoskola;