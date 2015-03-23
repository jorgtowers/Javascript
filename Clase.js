/*!
 * ABOUT:		Snippet Javascript implement OOP
 * CREADOR: 		Jorge L. Torres A.
 * NOTA: 		Cambiar el nombre CLASE por el nombre que se le de al objeto en javascript
 * METODO: 		Para implementar un nuevo método tomar como referencia código "CLASE.prototype.NuevoMetodo"
 */
 
(function (namespace) {
    //Constructor    
    function CLASE() {
        this.Constructor();
    }
	//Variables Estaticas
	CLASE.STARTTIME=new Date();
	//Variables Privadas
    var myVariable = CLASE.prototype;
    var _Tracert = false;

	//Metodos
    CLASE.prototype.Constructor = function () {
		this.myVariable = null;				
       if (_Tracert) { console.log("CLASE inicializado correctamente..." + this.Runtime(CLASE.STARTTIME)); }
    
	}
	
	CLASE.prototype.SUB_NAMESPACE = {
		METODO1:function(){
		},		
		SUB_NAMESPACE:{
			METODO1:funtion(){
			},
			METODO2:funtion(){
		}
	}
	
	
	CLASE.prototype.Runtime = function (starTime) {
        return (((new Date() - starTime) / 1000) + " segundos...").toFixed(2);
    };

   CLASE.prototype.NuevoMetodo = function (callback) {
        if (_Tracert) { console.log('metodo: "CLASE.NuevoMetodo()" ha cargado exitosamente'); }
        var STARTTIME = new Date();
        var self = this;

        if (typeof callback === 'function') {
            callback();
        }

        if (_Tracert) { console.log('"CLASE.NuevoMetodo()" realizado en ' + this.Runtime(STARTTIME)); }
    };
    
	//Marcar Método Obsoleto
 	CLASE.prototype.MetodoObsoleto = function () {
        var self = this;
        var e = "[deprecated] MetodoObsoleto está Obsoleto y será removido en futuras versiones. Usar el siguiente método NOMBRE_NUEVO_METODO";
        if (!this.NOMBRE_NUEVO_METODO) { throw (e); }
        (this.MetodoObsoleto = function () {
            console.log(e);
            self.NOMBRE_NUEVO_METODO();
        })();
    }
	
    //Propiedades
	Object.defineProperty(Object.prototype,'Enum', {
		value: function() {
			for(i in arguments) {
				Object.defineProperty(this,arguments[i], {
					value:parseInt(i),
					writable:false,
					enumerable:true,
					configurable:true
				});
			}
			return this;
		},
		writable:false,
		enumerable:false,
		configurable:false
	}); 
	
	Object.defineProperty(CLASE.prototype, "Propiedad", {
        get: function Propiedad() {
            return myVariable;
        },
        set: function Propiedad(value) {
            unidad = myVariable;
        }
    });
    
    namespace.CLASE = CLASE;
} (window.jt=window.jt||{}));

window.onload=function(){
	this.clase=new jt.CLASE();
}
