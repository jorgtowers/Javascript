/*
 * ABOUT........: Snippet Javascript implement OOP
 * CREADOR......: Jorge L. Torres A.
 * NOTA.........: Cambiar el nombre App por el nombre que se le de al objeto en javascript
 * ACTUALIZADO..: 28-12-2015 02:17PM
 * CREADO.......: 28-12-2015 02:17PM
 * ACTUALIZACION: Validaciones a todos los campos en un form web
 */
(function(namespace) {
        "use strict";

        var _Window = namespace;
        var _Tracert = false;

        function App() {
            if (_Tracert) { console.log('metodo: "App()" se ha inicializado exitosamente');}
            var self = this;
            _Window.onload = function() {
                self.Constructor();
            };
        }

        App.prototype.Constructor = function() {
            if (_Tracert) { console.log('metodo: "App.Constructor()" ha cargado exitosamente'); }
            var self = this;            

            this.Utils.Validation.Fields();
            this.Utils.Validation.ApplyCssValidation();
            this.Utils.Validation.NotAllowCommandCopy();
            this.Utils.Validation.NotAllowCommandPaste();
            this.Utils.Validation.NotAllowSpecialCharactersToStartAText();

            var btns = document.querySelectorAll("input[type=button]");
            for (var i = 0; i < btns.length; i++) {
                btns[i].onclick = function() {
                    return self.Utils.Validation.Validate();
                };
            }
        };

        App.prototype.Utils = {
            Validation: {
                _Container: null,
                _Fiedls: [],
                ClassCss: {
                    HasClass: function(elemento, App) {
                        if (_Tracert) { console.log('metodo: "App.Utils.Validation.ClassCss.HasClass(elemento, App)" ha cargado exitosamente'); }
                        return new RegExp('(\\s|^)' + App + '(\\s|$)').test(elemento.className);
                    },
                    Add: function(elemento, App) {
                        if (_Tracert) { console.log('metodo: "App.Utils.Validation.ClassCss.Add(elemento, App)" ha cargado exitosamente'); }
                        if (!this.HasClass(elemento, App)) {
                            elemento.className += (elemento.className ? ' ' : '') + App;
                        }
                    },
                    Remove: function(elemento, App) {
                        if (_Tracert) { console.log('metodo: "App.Utils.Validation.ClassCss.Remove(elemento, App)" ha cargado exitosamente'); }
                        if (this.HasClass(elemento, App)) {
                            elemento.className = elemento.className.replace(new RegExp('(\\s|^)' + App + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
                        }
                    },
                    Css: function(className) {
                    	if (_Tracert) { console.log('metodo: "App.Utils.Validation.ClassCss.Css(className)" ha cargado exitosamente'); }
                        var estyles = document.styleSheets[0];
                        if (estyles !== null) {
                            var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
                            if(classes!==null && classes.length>0){
	                            for (var x = 0; x < classes.length; x++) {
	                                if (classes[x].selectorText === className) {
	                                    return classes[x].cssText;
	                                }
	                            }
                        	}
                            return null;
                        } else {
                            return null;
                        }
                    }
                },
                Pattern: [
	                {
	                    "Validation": "0",
	                    "RegEx": "((?:https?\\://|www\\.)(?:[-a-z0-9]+\\.)*[-a-z0-9]+.*)",
	                    "Message": "La direcci&0acute;n url ingresada es inv&aacute;lida, por favor intente nuevamente"
	                }, {
	                    "Validation": "1",
	                    "RegEx": "\\d",
	                    "Message": "S&oacute;lo puede ingresar valores n&uacute;mericos en este campo, por favor intente nuevamente"
	                }, {
	                    "Validation": "2",
	                    "RegEx": "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?",
	                    "Message":"La direcci&0acute;n url ingresada es inv&aacute;lida, por favor intente nuevamente"
	                }, {
	                    "Validation": "3",
	                    "RegEx": "[VEJPG]{1}[0-9][1-9]{1}",
	                    "Message": "El RIF ingresado es inv&aacute;lido, por favor intente nuevamente"
	                }, {
	                    "Validation": "4",
	                    "RegEx": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
	                    "Message": "Direcci&0acute;n de email inv&aacute;lida"
	                },
	                {
	                    "Validation": "5",
	                    "RegEx": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})",
	                    "Message": "La contrase&ntilde;a con cumple con las siguientes condiciones: al menos un (1) n&uacute;mero, una (1) letra min&uacute;scula y una (1) letra May&uacute;sucla, y debe tener al menos seis (6) letras, numeros o underscore"
	                }
	            ],
                ApplyCssValidation: function() {
                    if (_Tracert) { console.log('metodo: "App.Utils.Validation.ApplyCssValidation()" ha cargado exitosamente'); }
                    var styleRequerido = this.ClassCss.Css(".requerido");
                    var head = document.getElementsByTagName("head");
                    var tagHead=null;
                    if (styleRequerido === null) {
                        styleRequerido = document.createElement("style");
                        styleRequerido.innerHTML = ".requerido{ background: rgb(255, 233, 233); border: 1px solid red;}";
                        tagHead = head[0];
                        tagHead.appendChild(styleRequerido);
                    }
                    var styleFeedBackLabel = this.ClassCss.Css(".FeedBackLabel");
                    if (styleFeedBackLabel === null) {
                        styleFeedBackLabel = document.createElement("style");
                        styleFeedBackLabel.innerHTML = ".FeedBackLabel { font-family:calibri,tahoma,segoe; color:green; font-size:1rem; display:block; }";
                        tagHead = head[0];
                        tagHead.appendChild(styleFeedBackLabel);
                    }
                },
                Container: function(idContainer) {
                	if (_Tracert) { console.log('metodo: "App.Utils.Validation.Container(idContainer)" ha cargado exitosamente'); }
                    if (idContainer !== undefined && idContainer !== null && idContainer.length > 0) {
                        this._Container = document.getElementById(idContainer);
                    } else {
                        this._Container = document;
                    }
                    return this._Container;
                },
                Fields: function() {
                	if (_Tracert) { console.log('metodo: "App.Utils.Validation.Fields()" ha cargado exitosamente'); }
                    var content = this._Container;
                    if (content === null){
                        content = this.Container();}
                    var inputs = content.querySelectorAll("input[type=text]");
                    var files = content.querySelectorAll("input[type=file]");
                    var textAreas = content.getElementsByTagName("textarea");
                    var selects = content.getElementsByTagName("select");
                    var objects = [];
                    objects.push.apply(objects, inputs);
                    objects.push.apply(objects, files);
                    objects.push.apply(objects, textAreas);
                    objects.push.apply(objects, selects);
                    for (var i = 0; i < objects.length; i++) {
                        var obj = objects[i];
                        var lblFeedBack = document.createElement("span");
                        lblFeedBack.id = "lblFeedBack_" + obj.id;
                        lblFeedBack.className = "FeedBackLabel";
                        obj.parentNode.insertBefore(lblFeedBack, obj.nextSibling);
                    }
                    this._Fiedls = objects;
                },
                NotAllowCommandCopy: function() {
                	if (_Tracert) { console.log('metodo: "App.Utils.Validation.NotAllowCommandCopy()" ha cargado exitosamente'); }
                    var objs = this._Fiedls;
                    var disableCommandPasteMessage = "&nbsp;No se permiten usar la funci&oacute;n de Pegar (Ctrl+C), valores sobre este campo...";
                    for (var i = 0; i < objs.length; i++) {
                        var obj = objs[i];
                        if (obj.type === 'text' || obj.type === 'textarea') {
                            obj.oncopy = function(e) {
                                e.preventDefault();
                                this.nextElementSibling.style.color = "green";
                                this.nextElementSibling.innerHTML = disableCommandPasteMessage;
                            };
                        }
                    }
                },
                NotAllowCommandPaste: function() {
                	if (_Tracert) { console.log('metodo: "App.Utils.Validation.NotAllowCommandPaste()" ha cargado exitosamente'); }
                    var objs = this._Fiedls;
                    var disableCommandPasteMessage = "&nbsp;No se permiten usar la funci&oacute;n de Pegar (Ctrl+V), valores sobre este campo...";
                    for (var i = 0; i < objs.length; i++) {
                        var obj = objs[i];
                        if (obj.type === 'text' || obj.type === 'textarea') {
                            obj.onpaste = function(e) {
                                e.preventDefault();
                                this.nextElementSibling.style.color = "green";
                                this.nextElementSibling.innerHTML = disableCommandPasteMessage;
                            };
                        }
                    }
                },
                NotAllowSpecialCharactersToStartAText: function() {
                	if (_Tracert) { console.log('metodo: "App.Utils.Validation.NotAllowSpecialCharactersToStartAText()" ha cargado exitosamente'); }
                    var objs = this._Fiedls;
                    var notAllowSpecialCharactersToStartATextMenssage = "&nbsp;No se permiten caracteres especiaes \" .,-@*+/_#$%&()\"'=?!¿¡ \" al inicio de este campo.";
                    for (var i = 0; i < objs.length; i++) {
                        var obj = objs[i];
                        if (obj.type === 'text' || obj.type === 'textarea') {
                            obj.oninput = function() {
                                this.nextElementSibling.style.color = "green";
                                var firstChart = this.value.substring(0, 1);
                                var rEx = new RegExp('[.,-@*+/_#$%&()\"\'=?!¿¡]{1}');
                                if (rEx.test(firstChart)){
                                    if (!firstChart.match(/[0-9]/)) {
                                        this.nextElementSibling.innerHTML = notAllowSpecialCharactersToStartATextMenssage;
                                    } else {
                                        this.nextElementSibling.innerHTML = "";
                                    }
                                } else {
                                    this.nextElementSibling.innerHTML = "";
                                }
                                
                                this.value = this.value.replace(/[^A-Za-z0-9]{0,1}/, '');
                                };
                            }
                        }
                },
                Validate: function() {
                	if (_Tracert) { console.log('metodo: "App.Utils.Validation.Validate()" ha cargado exitosamente'); }
                    /// <summary>Permite validar todos los elemento de tipo TEXT, FILE, TEXTAREA y SELECT</summary>  
                    /// <param name="idContentPlaceHolder" type="string">Id del contenedor de los elementos a evaluar, sino se especifica tomará por defecto el "document"</param>            
                    var objs = this._Fiedls;
                    if(objs.length===0){
                		this.Fields();
                		objs = this._Fiedls;
	                }
	                if( this.ClassCss.Css(".requerido")===null){
	                	this.ApplyCssValidation();
	                }
                    var self=this;
                    var requeridFieldMessage = "&nbsp;Este campo es requerido.";
                    var validados = true;
                    for (var i = 0; i < objs.length; i++) {
                        var obj = objs[i];
                        if (!obj.disabled) {
                            if (obj.getAttribute("optional") === null) {
                                var tieneValorOSeleccionValida = (obj.value.length === 0 || parseInt(obj.value,0) < 0);
                                if (tieneValorOSeleccionValida) {
                                    validados = false;
                                    var title = obj.getAttribute("title");
                                    this.ClassCss.Add(obj, "requerido");
                                    if (title !== null) {
                                        obj.nextElementSibling.innerHTML = title;
                                    } else {
                                        obj.nextElementSibling.innerHTML = requeridFieldMessage;
                                    }
                                    obj.nextElementSibling.style.color = "red";
                                } else {
                                    this.ClassCss.Remove(obj, "requerido");
                                    obj.nextElementSibling.innerHTML = "";
                                }
                            }
                            if (obj.getAttribute("validation") !== null) {                            	
                                obj.onblur = function () {
                                	var ex= self.Pattern[this.getAttribute("validation")];
                                    var exp = new RegExp(ex.RegEx, "ig");
                                    var validado = exp.test(this.value);
                                    if (!validado) {
                                        this.nextElementSibling.innerHTML = ex.Message;
                                        this.nextElementSibling.style.color = "red";
                                        this.value = "";
                                    }
                                };
                            }
                        }
                    }
                    return validados;
                }
            },
	        _:function(){
	            this.Validation.parent = this;
	            delete this._;
	            return this;
	        }
    	}._();

    namespace.App = new App();

})(window || {});
