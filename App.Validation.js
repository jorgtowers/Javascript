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
            var btns = document.querySelectorAll("input[type=button]");
            for (var i = 0; i < btns.length; i++) {
                btns[i].onclick = function() {
                    return self.Utils.Validation.Validate();
                };
            }
        };

        App.prototype.Utils = {
            Validation: {
                _Contenedor: null,
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
                            for (var x = 0; x < classes.length; x++) {
                                if (classes[x].selectorText === className) {
                                    return classes[x].cssText;
                                }
                            }
                            return null;
                        } else {
                            return null;
                        }
                    }
                },
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
                        this._Contenedor = document.getElementById(idContainer);
                    } else {
                        this._Contenedor = document;
                    }
                    return this._Contenedor;
                },
                Fields: function() {
                	if (_Tracert) { console.log('metodo: "App.Utils.Validation.Fields()" ha cargado exitosamente'); }
                    var content = this._Contenedor;
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
                                }
                            }
                        }
                    }
                    return validados;
                }
            }
		};

    namespace.App = new App();

})(window || {});
