/*!
 * ABOUT:		Snippet Javascript implement OOP
 * CREADOR: 		Jorge L. Torres A.
 * NOTA: 		Cambiar el nombre App por el nombre que se le de al objeto en javascript
 * METODO: 		Para implementar un nuevo método tomar como referencia código "App.prototype.NuevoMetodo"
 */
 
(function (namespace) {
    //Constructor    
    function App() {
        this.Constructor();
    }
	//Variables Estaticas
	App.STARTTIME=new Date();
	//Variables Privadas
    var myVariable = App.prototype;
    var _Tracert = false;

	//Metodos
    App.prototype.Constructor = function () {
		this.myVariable = null;				
       if (_Tracert) { console.log("App inicializado correctamente..." + this.Runtime(App.STARTTIME)); }    
	};
	
	App.prototype.SUB_NAMESPACE = {
		METODO1:function(){
		},		
		SUBCLASE:{
			METODO1:function(){},
			METODO2:function(){}
		}
	};
	
	
	App.prototype.Utils = {
        NoEnter: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.NoEnter()" ha cargado exitosamente'); }
            return !(window.event && window.event.keyCode === 13);
        },
        ValidarCampos: function (idContentPlaceHolder, applyClass) {
            if (_Tracert) { console.log('metodo: "App.Utils.ValidarCampos()" ha cargado exitosamente'); }
            /// <summary>Permite validar todos los elemento de tipo TEXT, FILE, TEXTAREA y SELECT</summary>  
            /// <param name="idContentPlaceHolder" type="string">Id del contenedor de los elementos a evaluar, sino se especifica tomará por defecto el "document"</param>            
            var contenedor;
            if (idContentPlaceHolder !== null && idContentPlaceHolder.length > 0){
                contenedor = document.getElementById(idContentPlaceHolder);
			} else {
                contenedor = document;
			}
            var vacios = [];
            var obj = null;
            var inputs = contenedor.querySelectorAll("input[type=text]");
            var files = contenedor.querySelectorAll("input[type=file]");
            var textAreas = contenedor.getElementsByTagName("textarea");
            var selects = contenedor.getElementsByTagName("select");
            var objects = [];
            objects.push.apply(objects, inputs);
            objects.push.apply(objects, files);
            objects.push.apply(objects, textAreas);
            objects.push.apply(objects, selects);
            for (i = 0; i < objects.length; i++) {
                obj = objects[i];
                if (!obj.disabled){
                    if (obj.getAttribute("optional") === null) {//Si tiene atributo opcional no validará
                        if (obj.value.length === 0) // Valida si es TEXTO que no este vacio y si es numero que sea mayor a 0
                        {
                            if (applyClass) {
                                this.ClassCss.Add(obj, "requerido");
                            }
                            if (obj.getAttribute("title") !== null){
                                vacios.push(obj.getAttribute("title").toUpperCase());
							} else {                                
								vacios.push("ID: " + obj.id.toUpperCase()); 
							}
                        } else {
                            this.ClassCss.Remove(obj, "requerido");
						}
					}
				}

            }
            if (vacios.length > 0) {
                if (!applyClass) {
					alert("ATENCIÓN: Hay un(os) campo(s) vacio(s):\r\r" + vacios.toString().replace(/,/g, '\r') + "\r\rPor favor ingrese la información y vuelva a intentarlo.");
				}
                if (_Tracert) { console.log("App.Utils.ValidarCampos(): Elementos vacios " + vacios.toString());}
                /* Chequea si tiene un contendor como un DIV*/
                for (i = 0; i < objects.length; i++) {
                    obj = objects[i];
                    if (!obj.disabled){
                        if (obj.getAttribute("optional") === null){ //Si tiene atributo opcional no validará
                            if (obj.value.length === 0)
                                //if (isNaN(obj.value) ? obj.value.length == 0 : parseInt(obj.value) < 0) // Valida si es TEXTO que no este vacio y si es numero que sea mayor a 0
                            {
                                var objContent = obj.parentElement;
                                if (objContent !== null){
                                    if (objContent.style.display === 'none') {
                                        objContent.style.display = 'block';
									}
								}
                                break;
                            }
						}
					}
                }
                return false;
            }
        },
        NoRefresh: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.NoRefresh()" ha cargado exitosamente'); }
            document.onkeydown = function (e) {
                var key;
                if (window.event) {
                    key = event.keyCode;
                } else {
                    var unicode = e.keyCode ? e.keyCode : e.charCode;
                    key = unicode;
                }
                switch (key) {
                    case 116:
                        event.returnValue = false;
                        key = 0;
                        return false;
                    case 82:
                        if (event.ctrlKey) {
                            event.returnValue = false;
                            key = 0;
                            return false;
                        }
                        return false;
                    default:
                        return true;
                }
            };
        },
        ClassCss: {
            HasClass: function (elemento, App) {
                if (_Tracert) { console.log('metodo: "App.Utils.ClassCss.HasClass()" ha cargado exitosamente'); }
                return new RegExp('(\\s|^)' + App + '(\\s|$)').test(elemento.className);
            },
            Add: function (elemento, App) {
                if (_Tracert) { console.log('metodo: "App.Utils.ClassCss.Add()" ha cargado exitosamente'); }
                if (!this.HasClass(elemento, App)) { elemento.className += (elemento.className ? ' ' : '') + App; }
            },
            Remove: function (elemento, App) {
                if (_Tracert) { console.log('metodo: "App.Utils.ClassCss.Remove()" ha cargado exitosamente'); }
                if (this.HasClass(elemento, App)) {
                    elemento.className = elemento.className.replace(new RegExp('(\\s|^)' + App + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
                }
            }
        },
        Toogle: function (elemento) {
            if (_Tracert) { console.log('metodo: "App.Utils.Toogle()" ha cargado exitosamente'); }
            var el = document.getElementById(elemento);
            if (el.style.display == "block") {
                el.style.display = "none";
            } else {
                el.style.display = "block";
            }
        },
        DisplayWhenEditing: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.DisplayWhenEditing()" ha cargado exitosamente'); }
            var id = document.getElementById("MainContent_txtId");
            if (id !== null && id.value > 0) {
                this.Toogle('editPanel');
            }
        },
        GetFecha: function (elemento) {
            var obj = document.getElementById(elemento);
            if (obj !== null) {
                var date = new Date();
                var str = this.LPad(date.getDate(), 2) + "-" + this.LPad((date.getMonth() + 1), 2) + "-" + date.getFullYear() + " " + this.LPad(date.getHours(), 2) + ":" + this.LPad(date.getMinutes(), 2) + ":" + this.LPad(date.getSeconds(), 2);
                obj.value = str;
            }
        },
        LPad: function (value, padding) {
            var zeroes = "0";
            for (var i = 0; i < padding; i++) { zeroes += "0"; }
            return (zeroes + value).slice(padding * -1);
        },
        KeyBoard: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.KeyBoard()" ha cargado exitosamente'); }
            var self = this;
            document.onkeydown = function (e) {
                var key;
                if (window.event) {
                    key = event.keyCode
                }
                else {
                    var unicode = e.keyCode ? e.keyCode : e.charCode
                    key = unicode
                }
                switch (key.toString()) {
                    case "116": //F5
                        event.returnValue = false;
                        key = 0;
                        return false;
                    case "82": //R button
                        if (event.ctrlKey) {
                            event.returnValue = false;
                            key = 0;
                            return false;
                        }
                        break;
                    case "120": //F9
                        event.returnValue = false;
                        key = 0;
                        self.Toogle('editPanel');
                        var txts = document.getElementsByClassName("form-control");
                        txts[1].focus();
                        return false;
                }
            };
        }       
    };
	
	App.prototype.UI={
	 Paginador: {        
            Mover: function (nombrelink, nombrePagina) {
                if (_Tracert) { console.log('metodo: "App.Paginador.Mover(nombrelink, nombrePagina)" ha cargado exitosamente'); }
                /// <summary>Muestra una página requerida por el páginador.</summary>
                /// <param name="nombrelink" type="String">Nombre del Link para buscar el elemento por el metodo document.getElementById y asignarle la App "numeroPagina activa".</param>
                /// <param name="nombrePagina" type="String">Obtiene la colección de páginas para mostrar la que se este pidiendo mostrar, y se activa pagina[i]style.display='block'.</param>
                /// <seealso cref="paginador">Método requerido por NT.Paginador</seealso>
                /// <returns type="Void">No retorna valor.</returns>

                var paginas = document.querySelectorAll("div.pagina");
                var pagina = document.getElementById(nombrePagina);
                var link = document.getElementById(nombrelink);
                var links = document.querySelectorAll("a.numeroPagina");
                if (links !== null) {
                    for (i = 0; i < links.length; i++) {
                        links[i].className = 'numeroPagina';
                    }
                }
                if (paginas !== null) {
                    for (i = 0; i < paginas.length; i++) {
                        paginas[i].style.display = 'none';
                    }
                }
                if (pagina !== null) {
                    pagina.style.display = 'block';
                }
                if (link !== null) {
                    link.className = "numeroPagina activa";
                }
            },
            Mostrar: function (nombreContenedor, itemsPorPagina, maximoPaginasAMostrar, addClassPagina) {
                /// <summary>Páginador dinámico creado vía JavaScript.</summary>
                /// <param name="nombreContenedor" type="String">Nombre del contenedor para buscar el elemento por el metodo document.getElementById, donde se alojarán las nuevas páginas generadas por el páginador.</param>
                /// <param name="itemsPorPagina" type="Number">Indica la cantidad de elementos por página, por defecto se establece 5.</param>
                /// <param name="maximoPaginasAMostrar" type="Number">Indica la cantidad de páginas activas mostradas por el páginador, por defecto se establece 10.</param>
                /// <param name="addClassPagina" type="String">Agrega una subApp a cada página generada.</param>
                /// <seealso cref="paginador">Método requerido por NT.Paginador</seealso>
                /// <returns type="Void">Construye páginas usando Divs y asinandole el Id='pagina+iteradorPaginas'.</returns>
                if (_Tracert) { console.log('metodo: "App.Paginador.Mostrar(nombreContenedor, itemsPorPagina, maximoPaginasAMostrar, addClassPagina)" ha cargado exitosamente'); }
                try {
                    if (nombreContenedor.length > 0) {
                        var contenedor = document.getElementById(nombreContenedor);
                        contenedor.insertAdjacentHTML('afterEnd', ' <div id="paginador"></div> ');
                        if (contenedor.parentNode.className === "ajax_waiting") { contenedor.parentNode.className = ""; }
                        var notas = contenedor.childNodes;
                        var paginador = document.getElementById("paginador");
                        if (notas !== null) {
                            var inicioPagina = 0;
                            var finPagina = itemsPorPagina;
                            var totalItems = notas.length;
                            var paginas = Math.ceil(totalItems / itemsPorPagina);
                            var oldDivs = [];
                            oldDivs.push.apply(oldDivs, notas);
                            for (a = 0; a < paginas; a++) {
                                var div = document.createElement("div");
                                div.id = "pagina" + a;
                                div.className = "pagina " + (addClassPagina !== undefined ? addClassPagina : '');
                                if (a === 0) {
                                    div.style.display = 'block';
                                }
                                else {
                                    div.style.display = 'none';
                                }
                                contenedor.appendChild(div);
                            }
                            for (b = 0; b < paginas; b++) {
                                var pagina = null;
                                var temp = new Array();
                                pagina = document.getElementById("pagina" + b);
                                temp = oldDivs.slice(inicioPagina, finPagina);
                                for (i = 0; i < temp.length; i++) {
                                    pagina.appendChild(temp[i]);
                                }
                                finPagina = itemsPorPagina * (b + 2);
                                inicioPagina = finPagina - itemsPorPagina;
                            }
                            for (c = 0; c < (paginas > maximoPaginasAMostrar ? maximoPaginasAMostrar : paginas) - 1; c++) {
                                var elemento = document.createElement("a");
                                elemento.id = "link" + c;
                                elemento.href = "javascript:NT.Paginador.Mover('link" + c + "','pagina" + c + "')";
                                elemento.innerHTML = c + 1;
                                if (c === 0) {
                                    elemento.className = "numeroPagina activa";
                                }
                                else {
                                    elemento.className = "numeroPagina";
                                }
                                paginador.appendChild(elemento);
                            }
                            contenedor.style.display = 'block';
                        }
                    }
                }
                catch (err) {
                    if (_Tracert) {
                        console.log('error en Metodo: "paginadorMostrar(nombreContenedor,  itemsPorPagina, maximoPaginasAMostrar)", ' + err.message);
                    }
                }
            }
        }
	};
	
	
	App.prototype.Runtime = function (starTime) {
        return (((new Date() - starTime) / 1000) + " segundos...").toFixed(2);
    };

   App.prototype.NuevoMetodo = function (callback) {
        if (_Tracert) { console.log('metodo: "App.NuevoMetodo()" ha cargado exitosamente'); }
        var STARTTIME = new Date();
        var self = this;

        if (typeof callback === 'function') {
            callback();
        }

        if (_Tracert) { console.log('"App.NuevoMetodo()" realizado en ' + this.Runtime(STARTTIME)); }
    };
    
	//Marcar Método Obsoleto
 	App.prototype.MetodoObsoleto = function () {
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
					value:parseInt(i,2),
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
	
	Object.defineProperty(App.prototype, "Propiedad", {
        get: function Propiedad() {
            return myVariable;
        },
        set: function Propiedad(value) {
            unidad = myVariable;
        }
    });
    
    namespace.App = App;
} (window.jt=window.jt||{}));

window.onload=function(){
	this.App=new jt.App();
}
