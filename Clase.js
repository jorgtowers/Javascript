(function (namespace) {
    //Constructor    
    function CLASE() {
        this.Constructor();
    }
    // Variables
    var myVariable = CLASE.prototype;

    // Métodos
    CLASE.prototype.Constructor = function () {
		this.myVariable = null;				
    }
	CLASE.prototype.Metodo = function (callback) {			
		if(typeof callback === 'function') {
			callback();
		}
    }
    
	//Método Obsoleto
	CLASE.prototype.MetodoObsoleto = function () {
		var self = this;		
	    var e="MetodoObsoleto esta Obsoleto, por favor usar Metodo. Este metodo será removido en futuras versiones.";
		if (!this.Metodo) { throw(e); }
		(this.MetodoObsoleto = function() {
		  console.log(e);
		  self.Metodo();
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
} (window));

window.onload=function(){
	this.clase=new CLASE();
}
