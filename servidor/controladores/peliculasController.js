var con = require('../lib/conexionbd.js');

var controlador = {
    listarGeneros: function(req,res){
        var sql = "SELECT * FROM Genero";

        con.query(sql,function(err,resultados,fields){
            if (err){
                console.log("Ocurrio un error en la consulta");
                return res.status(404).send("Ocurrio un error en la consulta")
            }
            var respuesta = {
                generos: resultados
            }
            res.json(respuesta);
        });
    },

    buscarPelicula: function(req,res){

        var pagina = req.query.pagina;
        var genero = req.query.genero;
        var anio = req.query.anio;
        var titulo = req.query.titulo;
        var cantidad = req.query.cantidad;
        var columna_orden = req.query.columna_orden;
        var tipo_orden = req.query.tipo_orden;
        


        var where = "";

        if(titulo){
            where += " WHERE"; 
            where += " titulo  LIKE '%" + titulo + "%'";
        }

        if (genero){
            if (titulo){
                where += " AND";
            }else{
                where += " WHERE"; 
            }
            
            where += " genero_id = " + genero;
        }

        if (anio){
            if (titulo || genero){
                where += " AND";
            }else{
                where += " WHERE"; 
            }
            where += " anio = " + anio;
        }

        var sql = "SELECT * FROM Pelicula " + where + " order by " + columna_orden + " " + tipo_orden + " Limit " + cantidad;
        
        console.log(sql);
        con.query(sql,function(err,resultados,fields){
            if (err){
                console.log("Ocurrio un error en la consulta");
                return res.status(404).send("Ocurrio un error en la consulta")
            }

            if (resultados.length == 0){
                console.log("No hay datos");
                return res.send("No hay datos para mostrar");
            }

            var respuesta = {
                peliculas: resultados,
                total: resultados.length
            }

            res.json(respuesta);
        });





    }
}


module.exports = controlador;