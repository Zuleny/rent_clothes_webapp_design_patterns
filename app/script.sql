--CREATE ROLE arquitectura_sw WITH  LOGIN  INHERIT REPLICATION CONNECTION LIMIT -1 PASSWORD 'mypass';

--CREATE DATABASE arquitectura_sw with owner=arquitectura_sw encoding='UTF8' tablespace=pg_default CONNECTION LIMIT=-1;

create table Administrador(
	id serial not null primary key,
	nombre varchar(50) not null,
	email varchar(60) not null,
	contrasenia varchar(30) not null,
	telefono varchar(12)
);

create table Articulo(
	codigo serial not null primary key,
	nombre varchar(50) not null,
	descripcion varchar(200),
	precio decimal(12,2) not null
);

create table Cliente(
	ci integer not null primary key,
	nombre varchar(50) not null,
	email varchar(60),
	telefono varchar(12) not null
);

create table Garantia(
	codigo serial not null primary key,
	tipo varchar(20) not null,
	detalle varchar(200) not null
);

create table Local(
	codigo serial not null primary key,
	nombre varchar(50) not null,
	direccion varchar(100) not null,
	telefono varchar(12) not null,
	id_administrador integer not null,
	foreign key(id_administrador) references Administrador(id)
	on update cascade on delete cascade
);

create table NotaAlquiler(
	nro serial not null primary key,
	concepto varchar(200) not null,
	fecha_entrega date not null,
	fecha_devolucion date not null,
	total decimal(12,2) not null,
	estado varchar(1) not null,
	codigo_local integer not null,
	ci_cliente integer not null,
	foreign key(codigo_local) references Local(codigo)
	on update cascade on delete cascade,
	foreign key(ci_cliente) references Cliente(ci)
	on update cascade on delete cascade
);

create table NotaAlquilerGarantia(
	nro_notaalquiler integer not null,
	codigo_garantia integer not null,
	cantidad integer not null,
	detalle_especifico varchar(100),
	foreign key(nro_notaalquiler) references NotaAlquiler(nro)
	on update cascade on delete cascade,
	foreign key(codigo_garantia) references Garantia(codigo)
	on update cascade on delete cascade,
	primary key(nro_notaalquiler, codigo_garantia)
);

create table Inventario(
	codigo_local integer not null,
	codigo_articulo integer not null,
	stock integer not null,
	foreign key(codigo_local) references Local(codigo)
	on update cascade on delete cascade,
	foreign key(codigo_articulo) references Articulo(codigo)
	on update cascade on delete cascade,
	primary key(codigo_local, codigo_articulo)
);
 
create table NotaAlquilerArticulo(
	nro_notaalquiler integer not null,
	codigo_articulo integer not null,
	cantidad integer not null,
	foreign key(nro_notaalquiler) references NotaAlquiler(nro)
	on update cascade on delete cascade,
	foreign key(codigo_articulo) references Articulo(codigo)
	on update cascade on delete cascade,
	primary key(nro_notaalquiler, codigo_articulo)
);
 

create or replace function insert_notaalquiler_articulo()returns trigger as
$BODY$
declare precio decimal(12,2) = (select precio from articulo where codigo = new.codigo_articulo);
begin
	update notaalquiler set total = total+(new.cantidad * precio) where nro = new.nro_notaalquiler;
	return new;
end $BODY$ language plpgsql;

create trigger t_insert_notaalquiler_articulo after insert 
on notaalquilerarticulo
for each row
	execute procedure insert_notaalquiler_articulo();


create or replace function delete_notaalquiler_articulo()returns trigger as
$BODY$
declare precio decimal(12,2) = (select precio from articulo where codigo =old.codigo_articulo);
begin
	update notaalquiler set total = total-(old.cantidad * precio) where nro = old.nro_notaalquiler;
	return old;
end $BODY$ language plpgsql;

create trigger t_delete_notaalquiler_articulo after delete
on notaalquilerarticulo
for each row
	execute procedure delete_notaalquiler_articulo();


insert into Administrador(nombre, email, contrasenia, telefono) values('Zuleny Cruz', 'zuleny.cr@gmail.com', '11235813', '76627871');
insert into Administrador(nombre, email, contrasenia, telefono) values('Pedro Mamani', 'pedro@gmail.com', '11235813', '76627879');
insert into Administrador(nombre, email, contrasenia, telefono) values('Maria Suarez', 'maria@gmail.com', '11235813', '79627871');

insert into Articulo(nombre, descripcion, precio) values('Traje tinkus', 'Traje tinkus varon color verde y naranja', 85);
insert into Articulo(nombre, descripcion, precio) values('Tipoy Niña', 'Tipoy color verde talla s', 50);
insert into Articulo(nombre, descripcion, precio) values('Vestido de Novia', 'Vestido de Novia Color Marfil', 400);

insert into Cliente(ci, nombre, email, telefono) values(9710836, 'Juan Perez', 'juan@gmail.com', '76652398');
insert into Cliente(ci, nombre, email, telefono) values(8724516, 'Rosa Lopez', 'rosa@gmail.com', '68652398');
insert into Cliente(ci, nombre, email, telefono) values(9710830, 'Esteban Colque', 'esteban@gmail.com', '76252398');

insert into Garantia(tipo, detalle) values('JOYERIA', 'Anillo de Oro de 28 kilates');
insert into Garantia(tipo, detalle) values('CELULAR', 'Celular de gama media');
insert into Garantia(tipo, detalle) values('DINERO EN EFECTIVO', 'Billete de 100 Sus');

insert into Local(nombre, direccion, telefono, id_administrador) values('Sucursal Banzer', 'Avenida Banzer y 3er Anillo', '33422987', 1);
insert into Local(nombre, direccion, telefono, id_administrador) values('Sucursal Virgen de Cotoca', 'Avenida Virgen de Cotocar y 4to Anillo', '33472987', 2);
insert into Local(nombre, direccion, telefono, id_administrador) values('Sucursal Santos Dumon', 'Avenida Santos Dumont y 3er Anillo', '33422987', 3);

insert into NotaAlquiler(concepto, fecha_entrega, fecha_devolucion, total, estado, codigo_local, ci_cliente) values('Alquiler de tipoy y vestido de novia', '2021/10/22', '2021/10/26', 350.5, 'P',1, 9710836);
insert into NotaAlquiler(concepto, fecha_entrega, fecha_devolucion, total, estado, codigo_local, ci_cliente) values('Alquiler de traje tobas', '2021/10/22', '2021/10/26', 70.5, 'P',2, 8724516);
insert into NotaAlquiler(concepto, fecha_entrega, fecha_devolucion, total, estado, codigo_local, ci_cliente) values('Alquiler de traje varon', '2021/10/22', '2021/10/26', 500, 'P',3, 9710830);

insert into NotaAlquilerGarantia(nro_notaalquiler, codigo_garantia, cantidad, detalle_especifico) values(1, 1, 1, 'Telefono Sansumg A0 color rojo');
insert into NotaAlquilerGarantia(nro_notaalquiler, codigo_garantia, cantidad, detalle_especifico) values(2, 2, 1, 'Anillo de 28 kilates con diamantina');
insert into NotaAlquilerGarantia(nro_notaalquiler, codigo_garantia, cantidad, detalle_especifico) values(3, 3, 3, '2 Billetes de Bs. 100 y 1 de Bs. 200');

insert into Inventario(codigo_local, codigo_articulo, stock) values(1, 1, 12);
insert into Inventario(codigo_local, codigo_articulo, stock) values(2, 2, 5);
insert into Inventario(codigo_local, codigo_articulo, stock) values(3, 3, 6);

insert into NotaalquilerArticulo(nro_notaalquiler, codigo_articulo, cantidad) values(1, 1, 1);
insert into NotaalquilerArticulo(nro_notaalquiler, codigo_articulo, cantidad) values(2, 2, 1);
insert into NotaalquilerArticulo(nro_notaalquiler, codigo_articulo, cantidad) values(3, 3, 1);