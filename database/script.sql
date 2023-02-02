create database dna;
use dna;
create table dnaRegistry(
	dna varchar(500) not null primary key,
    hasMutation boolean not null
);