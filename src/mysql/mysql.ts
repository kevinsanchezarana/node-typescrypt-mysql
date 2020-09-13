import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;

    connection: mysql.Connection;
    conectado: boolean = false;

    constructor () {
        console.log('Clase inicializada');
        this.connection = mysql.createConnection ({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.conectarDB();
        console.log('Conectado a MySQL de forma correcta');
    }

    public static get instance () {
        return this._instance || (this._instance = new this());
    }
    
    private conectarDB () {
        this.connection.connect( (err: mysql.MysqlError) => {
            if ( err ){
                console.log(err.message);
                return;
            }
            this.conectado = true;
        });
    }

    static ejecutarQuery ( query: string, callback: Function ) {
        this.instance.connection.query(query, ( err, results: Object[], fields ) => {
            if ( err ){
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            if ( results.length === 0 ){
                return callback('El registro solicitado no existe');
            }
            callback(null, results);
        });
    }


}