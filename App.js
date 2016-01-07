/*
 * ABOUT........: Snippet Javascript implement OOP
 * CREADOR......: Jorge L. Torres A.
 * NOTA.........: Cambiar el nombre App por el nombre que se le de al objeto en javascript
 * METODO.......: Se agrega validarRif
 * ACTUALIZADO..: 21-12-2015 01:46PM
 * CREADO.......: 20-03-2015 11:53PM
 * ACTUALIZACION: Se agrega NameSpace de App.Utils.Time:{}
 *                Se agrega App.Utils.CheckImagen()
 *                PENDIENTE Se agrega validación para los campos RadioButton, requiere linq.js, ya que la validación depende
 *                de LinQ to JS
 *                No se permiten ingreso de caracteres especiales al iniciar un texto
 */

(function (namespace){
 "use strict";
    /*----------------------------
     * Constructor
     *----------------------------*/   
    function App () {       
        var self=this;
        _Window.onload=function(){
            self.Constructor(); 
            _StartTime = App.STARTTIME;
        };
    }
    /*----------------------------
     * Variables Estáticas
     *----------------------------*/   
    App.STARTTIME = new Date();
    //Variables Privadas
    var _Window=namespace;
    var myVariable = App.prototype;
    var _Tracert = true;
    var _Result = null;
    var _StartTime = new Date();

    /*----------------------------
     * Métodos Públicos
     *----------------------------*/   
    App.prototype.Constructor = function () {
        this.myVariable = null;        
        this.Utils.DisplayWhenEditing();
        this.Utils.KeyBoard();
        this.UI.CheckBoxAsToogle();        
        
        if (this.UI.Draggable) {
            document.onmousedown = this.UI.Draggable.Iniciar;
            document.onmouseup = this.UI.Draggable.Detener;
        }
        //Activa el buscador del filterTable.js y sortTable.js
        var filtro = document.getElementById("filtro");
        var tabla = document.getElementById("listado");
        if (filtro != null)
            filtro.onkeyup = function () {
                filterTable(filtro, tabla);
            };
        //Activa el paginador del dataTables.js
        try{
            $('#listado').dataTable({
                "ordering": false,
                "info": false,
                "searching": false,
                "language": {
                    "paginate": {
                        "next": "Siguiente",
                        "previous": "Anterior",
                    },
                    "lengthMenu": 'Mostrar <select class="\ form-control \" style="\ margin-top:0.5em \">' +
                    '<option value="10">10</option>' +
                    '<option value="20">20</option>' +
                    '<option value="30">30</option>' +
                    '<option value="40">40</option>' +
                    '<option value="50">50</option>' +
                    '<option value="-1">Todos</option>' +
                    '</select> Registros',
                }
            });
        }catch(ex){
            console.log("no esta creado el objeto JQuery");
        }
            
        if (_Tracert) { console.log("App inicializado correctamente..." + this.Runtime(App.STARTTIME)); }
        
    };
    
    App.prototype.Utils = {
        ValidarRif:function (sRif) {
            var bResultado = false;
            var iFactor = 0;
            sRif = sRif.split('-').join('');
            if (sRif.length < 10)
                sRif = LPad(sRif.toString().toUpperCase().substr(0, 1) + sRif.toString().substr(1, sRif.length - 1), 9, '0');

            var sPrimerCaracter = sRif.toString().substr(0, 1).toUpperCase();
            switch (sPrimerCaracter) {
                case "V": iFactor = 1; break;
                case "E": iFactor = 2; break;
                case "J": iFactor = 3; break;
                case "P": iFactor = 4; break;
                case "G": iFactor = 5; break;
            }

            if (iFactor > 0) {
                var suma = (sRif.toString().substr(8, 1) * 2)
                                 + (sRif.toString().substr(7, 1) * 3)
                                 + (sRif.toString().substr(6, 1) * 4)
                                 + (sRif.toString().substr(5, 1) * 5)
                                 + (sRif.toString().substr(4, 1) * 6)
                                 + (sRif.toString().substr(3, 1) * 7)
                                 + (sRif.toString().substr(2, 1) * 2)
                                 + (sRif.toString().substr(1, 1) * 3)
                                 + (iFactor * 4);
                var dividendo = suma / 11;
                var DividendoEntero = parseInt(dividendo, 0);
                var resto = 11 - (suma - DividendoEntero * 11);
                if (resto >= 10 || resto < 1)
                    resto = 0;
                if (sRif.toString().substr(9, 1) == resto.toString()) {
                    bResultado = true;
                }
            }
            if (!bResultado) {
                alert("RIF Incorrecto!!!");
            }else {
                alert("RIF Correcto!!!");
                            }
            return bResultado;
        },
        CheckImages: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.CheckImages()" ha cargado exitosamente'); }
            var imgsFallidas = document.querySelectorAll("img");
            if (imgsFallidas !== null) {
                for (i = 0; i < imgsFallidas.length; i++) {
                    if (imgsFallidas[i].src.match(/http:\/\/imgs.notitarde.com/g)) {
                        imgsFallidas[i].onerror = function (evt) { this.src = '/imagenes/IMAGE_ERROR-NO_PHOTO.gif'; };
                    }
                }
                for (i = 0; i < imgsFallidas.length; i++) {
                    if (imgsFallidas[i].src.match(/http:\/\/imgs.notitarde.com/g)) {
                        imgsFallidas[i].src = imgsFallidas[i].src;
                    }
                }
            }
        },
        Callback: function (url, parametros, callback) {
            if (_Tracert) { console.log('metodo: "App.UI.CallBack(url, parametros, callback)" ha cargado exitosamente'); }
            if (url != null) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        var type = request.getResponseHeader();
                        switch( type ) {
                        case "text/xml" :
                            data = request.responseXML;
                        case "application/json" :
                            data = JSON.parse(request.responseText);
                        default :
                            data = request.responseText;
                        }
                        if (data != null) {
                            _Result = data;
                        }
                        else {
                            _Result = null;
                        }
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                };
                request.open('GET', url + (parametros != null ? "?" + parametros : ""), true);
                request.send();
            } else {
                _Result = null;
            }
        },
        IsNumeric: function (a) { if (!isNaN(a)) { return true } else { return false } },
        NoEnter: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.NoEnter()" ha cargado exitosamente'); }
            return !(window.event && window.event.keyCode === 13);
        },
        ValidarCampos: function (idContentPlaceHolder, applyClass) {
            if (_Tracert) { console.log('metodo: "App.Utils.ValidarCampos(idContentPlaceHolder, applyClass)" ha cargado exitosamente'); }
            /// <summary>Permite validar todos los elemento de tipo TEXT, FILE, TEXTAREA y SELECT</summary>  
            /// <param name="idContentPlaceHolder" type="string">Id del contenedor de los elementos a evaluar, sino se especifica tomará por defecto el "document"</param>            
            var validados = true;
            var contenedor;
            if (idContentPlaceHolder !== null && idContentPlaceHolder.length > 0) {
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
                if (!obj.disabled) {
                    if (obj.getAttribute("optional") === null) {//Si tiene atributo opcional no validará
                        if (obj.value.length === 0) {
                            validados = false;
                            if (applyClass) {
                                this.ClassCss.Add(obj, "requerido");                                
                            } else {
                                if (obj.getAttribute("title") !== null) {
                                    vacios.push(obj.getAttribute("title").toUpperCase());
                                } else {
                                    vacios.push("ID: " + obj.id.toUpperCase());
                                }
                            }

                        } else if (parseInt(obj.value) < 0) // Valida si es TEXTO que no este vacio y si es numero que sea mayor a 0
                        {
                            if (applyClass) {
                                this.ClassCss.Add(obj, "requerido");
                                validados = false;
                            }
                            if (obj.getAttribute("title") !== null) {
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
                    document.app.UI.Notificacion.Mensaje({ "Mensaje": vacios.toString().replace(/,/g, '\r') });
                    //alert("ATENCIÓN: Hay un(os) campo(s) vacio(s):\r\r" + vacios.toString().replace(/,/g, '\r') + "\r\rPor favor ingrese la información y vuelva a intentarlo.");
                }
                if (_Tracert) { console.log("App.Utils.ValidarCampos(): Elementos vacios " + vacios.toString()); }
                /* Chequea si tiene un contendor como un DIV*/
                for (i = 0; i < objects.length; i++) {
                    obj = objects[i];
                    if (!obj.disabled) {
                        if (obj.getAttribute("optional") === null) { //Si tiene atributo opcional no validará
                            if (obj.value.length === 0)
                                //if (isNaN(obj.value) ? obj.value.length == 0 : parseInt(obj.value) < 0) // Valida si es TEXTO que no este vacio y si es numero que sea mayor a 0
                            {
                                var objContent = obj.parentElement;
                                if (objContent !== null) {
                                    if (objContent.style.display === 'none') {
                                        objContent.style.display = 'block';
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
            return validados;
        },
        Validaciones: {
            Patron: [
                {
                    "Validation": "0",
                    "RegEx": "((?:https?\\://|www\\.)(?:[-a-z0-9]+\\.)*[-a-z0-9]+.*)",
                    "Message": "La dirección url ingresada es inválida, por favor intente nuevamente"
                }, {
                    "Validation": "1",
                    "RegEx": "[0-9]",
                    "Message": "Sólo puede ingresar valores númericos en este campo, por favor intente nuevamente"
                }, {
                    "Validation": "2",
                    "RegEx": "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?",
                    "Message":"La dirección url ingresada es inválida, por favor intente nuevamente"
                }, {
                    "Validation": "3",
                    "RegEx": "[VEJPG]{1}[0-9][1-9]{1}",
                    "Message": "El RIF ingresado es inválido, por favor intente nuevamente"
                }, {
                    "Validation": "4",
                    "RegEx": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
                    "Message": "Dirección de email inválida"
                },
                {
                    "Validation": "5",
                    "RegEx": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})",
                    "Message": "La contraseña con cumple con las siguientes condiciones: al menos un (1) número, una (1) letra minúscula y una (1) letra Mayúsucla, y debe tener al menos seis (6) letras, numeros o underscore"
                }
            ],
            Validar: function (idContentPlaceHolder) {
                var self = this.parent;
                var e = "[deprecated] App.Utils.Validaciones(idContentPlaceHolder) está Obsoleto, por favor usar App.Utils.Validation.Validate(). Este metodo será removido en futuras versiones.";                
                if (!self.Validation.Validate) { throw (e); }
                (this.Validar = function (idContentPlaceHolder) {
                    console.log(e);
                    self.Validation.Container(idContentPlaceHolder);
                    self.Validation.Validate();
                })();
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
                if (_Tracert) { console.log('metodo: "App.Utils.ClassCss.HasClass(elemento, App)" ha cargado exitosamente'); }
                return new RegExp('(\\s|^)' + App + '(\\s|$)').test(elemento.className);
            },
            Add: function (elemento, App) {
                if (_Tracert) { console.log('metodo: "App.Utils.ClassCss.Add(elemento, App)" ha cargado exitosamente'); }
                if (!this.HasClass(elemento, App)) { elemento.className += (elemento.className ? ' ' : '') + App; }
            },
            Remove: function (elemento, App) {
                if (_Tracert) { console.log('metodo: "App.Utils.ClassCss.Remove(elemento, App)" ha cargado exitosamente'); }
                if (this.HasClass(elemento, App)) {
                    elemento.className = elemento.className.replace(new RegExp('(\\s|^)' + App + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
                }
            }
        },
        Toogle: function (elemento) {
            if (_Tracert) { console.log('metodo: "App.Utils.Toogle(elemento)" ha cargado exitosamente'); }
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
        GetFecha: function (elemento,sinHora) {
            if (_Tracert) { console.log('metodo: "App.Utils.GetFecha(elemento)" ha cargado exitosamente'); }
            var obj = document.getElementById(elemento);
            if (obj !== null) {
                var date = new Date();
                var str = this.LPad(date.getDate(), 2) + "-" + this.LPad((date.getMonth() + 1), 2) + "-" + date.getFullYear() + (sinHora == undefined ? " " + this.LPad(date.getHours(), 2) + ":" + this.LPad(date.getMinutes(), 2) + ":" + this.LPad(date.getSeconds(), 2) : "");
                obj.value = str;
            }
        },
        LPad: function (value, padding) {
            if (_Tracert) { console.log('metodo: "App.Utils.LPad(value, padding)" ha cargado exitosamente'); }
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
        },
        VersionIE: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.VersionIE()" ha cargado exitosamente'); }
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 0) : false;
        },
        QueryString: function (name) {
            if (_Tracert) { console.log('metodo: "App.Utils.QueryString(name)" ha cargado exitosamente'); }
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.search);
            if (results === null) {
                return "";
            } else {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        },
        CheckConnection: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.CheckConnection()" ha cargado exitosamente'); }
            /// <summary>Valida que la conexi�n de internet este activa.</summary>
            if (navigator.onLine !== undefined) {
                if (navigator.onLine) {
                    return true;
                } else {
                    return false;
                }
            } else {
                var xhr = new XMLHttpRequest();
                var file = "http://" + window.location.host + "/";
                var r = Math.round(Math.random() * 10000);
                xhr.open('HEAD', file + "?CheckConnection=" + r, false);
                try {
                    xhr.send();
                    if (xhr.status >= 200 && xhr.status < 304) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
            }
        },
        TimeAgo: function (date) {
            var self = this;
            var e = "[deprecated] App.TimeAgo(elemento) está Obsoleto, por favor usar App.Utils.Time.Ago(elemento). Este metodo será removido en futuras versiones.";
            if (!this.Time) { throw (e); }
            (this.TimeAgo = function () {
                console.log(e);
                self.Time.Ago(date);
            })();
        },
        Time: {
            Ago: function (date) {
                if (_Tracert) { console.log('metodo: "App.Utils.Time.Ago(date)" ha cargado exitosamente'); }
                var seconds = Math.floor((new Date() - date) / 1000);
                var interval = Math.floor(seconds / 31536000);
                if (interval > 1) {
                    return interval + " years";
                }
                interval = Math.floor(seconds / 2592000);
                if (interval > 1) {
                    return interval + " months";
                }
                interval = Math.floor(seconds / 86400);
                if (interval > 1) {
                    return interval + " days";
                }
                interval = Math.floor(seconds / 3600);
                if (interval > 1) {
                    return interval + " hours";
                }
                interval = Math.floor(seconds / 60);
                if (interval > 1) {
                    return interval + " minutes";
                }
                return Math.floor(seconds) + " seconds";
            },
            JulianDate: function (date) {
                if (_Tracert) { console.log('metodo: "App.Utils.Time.Julian(date)" ha cargado exitosamente'); }
                var myDate = date
                var jul = null;                                
                if (myDate === null) {
                    alert("La fecha es incorrecta. Por favor utilice el calendario desplegable para ingresar la fecha a convertir.");
                    return
                }
                var myYear = myDate.getFullYear();
                var myDay = myDate.getDate();
                var myMonth = myDate.getMonth() ;
                var date1 = new Date(myYear,myMonth,myDay);
                var date2 = new Date(myYear, 0, 1);
                var days = this.DiffBetweenDays(date1, date2);
                jul = (myYear - 1900) * 1000 + days + 1;                
                return jul;                
            },
            JulianDateTime: function (datetime) {
                var era="CE";
                var y = datetime.getFullYear();
                var m = datetime.getMonth()+1;
                var d = datetime.getDate();
                var h = datetime.getHours();
                var mn = datetime.getMinutes();
                var s = datetime.getSeconds();
                var jy, ja, jm;         //scratch
                if (y == 0) {
                    alert("There is no year 0 in the Julian system!");
                    return "invalid";
                }
                if (y == 1582 && m == 10 && d > 4 && d < 15) {
                    alert("The dates 5 through 14 October, 1582, do not exist in the Gregorian system!");
                    return "invalid";
                }

                //  if( y < 0 )  ++y;
                if (era == "BCE") y = -y + 1;
                if (m > 2) {
                    jy = y;
                    jm = m + 1;
                } else {
                    jy = y - 1;
                    jm = m + 13;
                }

                var intgr = Math.floor(Math.floor(365.25 * jy) + Math.floor(30.6001 * jm) + d + 1720995);

                //check for switch to Gregorian calendar
                var gregcal = 15 + 31 * (10 + 12 * 1582);
                if (d + 31 * (m + 12 * y) >= gregcal) {
                    ja = Math.floor(0.01 * jy);
                    intgr += 2 - ja + Math.floor(0.25 * ja);
                }

                //correct for half-day offset
                var dayfrac = h / 24.0 - 0.5;
                if (dayfrac < 0.0) {
                    dayfrac += 1.0;
                    --intgr;
                }

                //now set the fraction of a day
                var frac = dayfrac + (mn + s / 60.0) / 60.0 / 24.0;

                //round to nearest second
                var jd0 = (intgr + frac) * 100000;
                var jd = Math.floor(jd0);
                if (jd0 - jd > 0.5)++jd;
                return jd / 100000;
            },
            GregorianDate: function (JDN) {
                if (_Tracert) { console.log('metodo: "App.Utils.Time.DiffBetweenDays(desde,hasta)" ha cargado exitosamente'); }
                var myJul = JDN.toString();
                var out = null;
                var yearSubStr;
                var daySubStr;
                if (myJul.length == 5) {
                    yearSubStr = myJul.substr(0, 2);
                    daySubStr = myJul.substr(2, 3)
                } else {
                    yearSubStr = myJul.substr(0, 3);
                    daySubStr = myJul.substr(3, 3)
                }
                if (yearSubStr.substr(0, 1) == "0") {
                    alert("Ingreso una fecha incorrecta");
                    return
                }
                var year = 1900 + parseInt(yearSubStr);
                if (daySubStr.substr(0, 1) == "0") {
                    if (daySubStr.substr(0, 2) == "00")
                        daySubStr = parseInt(daySubStr.substr(2, 1));
                    else
                        daySubStr = parseInt(daySubStr.substr(1, 2))
                } else {
                    daySubStr = parseInt(daySubStr.substr(0, 3))
                }
                var days = daySubStr;
                var grego = new Date(year, 0, 1);
                if (myJul.length > 6 || !this.isValidDate(grego) || myJul.length < 5) {
                    alert("Ingreso una fecha incorrecta");
                    return
                }
                grego.setDate(grego.getDate() + days - 1);
                var myYear = grego.getFullYear();
                var myDay = grego.getDate();
                var myMonth = grego.getMonth() + 1;
                if (myYear !== year) {
                    alert("Ingreso una fecha incorrecta");
                    return
                }
                if (myYear < 1971 || myYear > 2100) {
                    alert("El Rango de fechas soportado es entre 1971 y 2100");
                    return
                }
                var options = { year: "numeric", month: "2-digit", day: "2-digit" };
                var fecha = grego.toLocaleTimeString("es-ve", options);
                return fecha.substring(0, fecha.indexOf(" "));
            },
            GregorianDateTime:function(JDN){
                var jd=JDN.toString();
                    var j1, j2, j3, j4, j5;         //scratch
                    //
                    // get the date from the Julian day number
                    //
                    var intgr   = Math.floor(jd);
                    var frac    = jd - intgr;
                    var gregjd  = 2299161;
                    if( intgr >= gregjd ) {             //Gregorian calendar correction
                        var tmp = Math.floor( ( (intgr - 1867216) - 0.25 ) / 36524.25 );
                        j1 = intgr + 1 + tmp - Math.floor(0.25*tmp);
                    } else
                        j1 = intgr;

                    //correction for half day offset
                    var dayfrac = frac + 0.5;
                    if( dayfrac >= 1.0 ) {
                        dayfrac -= 1.0;
                        ++j1;
                    }

                    j2 = j1 + 1524;
                    j3 = Math.floor( 6680.0 + ( (j2 - 2439870) - 122.1 )/365.25 );
                    j4 = Math.floor(j3*365.25);
                    j5 = Math.floor( (j2 - j4)/30.6001 );

                    var d = Math.floor(j2 - j4 - Math.floor(j5*30.6001));
                    var m = Math.floor(j5 - 1);
                    if( m > 12 ) m -= 12;
                    var y = Math.floor(j3 - 4715);
                    if( m > 2 )   --y;
                    if( y <= 0 )  --y;

                    //
                    // get time of day from day fraction
                    //
                    var hr  = Math.floor(dayfrac * 24.0);
                    var mn  = Math.floor((dayfrac*24.0 - hr)*60.0);
                    f  = ((dayfrac*24.0 - hr)*60.0 - mn)*60.0;
                    var sc  = Math.floor(f);
                    f -= sc;
                    if( f > 0.5 ) ++sc;

                    //if( y < 0 ) {
                    //    y = -y;
                    //    form.era[1].checked = true;
                    //} else
                //    form.era[0].checked = true;
                    var grego = new Date(y, m-1, d, hr, mn, sc);
                    var options = { year: "numeric", month: "2-digit", day: "2-digit", hour:"2-digit",minute:"2-digit",second:"2-digit" };
                    return grego.toLocaleTimeString("es-ve", options);
                
            },
            DiffBetweenDays: function (desde, hasta) {
                if (_Tracert) { console.log('metodo: "App.Utils.Time.DiffBetweenDays(desde,hasta)" ha cargado exitosamente'); }
                var ONE_DAY = 1000 * 60 * 60 * 24;
                var date1_ms = desde.getTime();
                var date2_ms = hasta.getTime();
                var difference_ms = Math.abs(date1_ms - date2_ms);
                return Math.round(difference_ms / ONE_DAY);
            },            
            isValidDate: function (d) {
                if (_Tracert) { console.log('metodo: "App.Utils.Time.isValidDate(d)" ha cargado exitosamente'); }
                if (Object.prototype.toString.call(d) !== "[object Date]")
                    return false;
                return !isNaN(d.getTime())
            }
        },
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
                        //Radios se validan aparte por se diferente la lógica de validación
                        var radios = content.querySelectorAll("input[type=radio]");
                        var radiosUniques=radios.FirstAtEachNameRadioButton();
                        for (var i = 0; i < radiosUniques.length; i++) {
                            var obj = radiosUniques[i];
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
    App.prototype.UI = {
        CheckBoxAsToogle: function() {
            var chks = document.querySelectorAll("[type=checkbox]");
            for (var i = 0; i < chks.length; i++) {
                var newLabel=document.createElement("Label");
                newLabel.setAttribute("for", chks[i].id);
                chks[i].setAttribute("class", chks[i].getAttribute("class") + " cmn-toggle cmn-toggle-round");
                chks[i].parentNode.insertBefore(newLabel,chks[i].nextSibling);
            }            
        },
        ConfirmDeleteAction: function () {
            var btn = document.forms[0].CPH_BODY_btnEliminar;
            if (btn != undefined)
                btn.onclick = function () {
                    return confirm("Seguro que desea eliminar el registro?");
                };
        },
        NotAllowSpecialCharactersToStartAText: function () {
            var txts = document.querySelectorAll("[id*=txt]");
            for (var i = 0; i < txts.length; i++) {
                var txt = txts[i];
                var lblFeedBack = document.createElement("span");
                lblFeedBack.id = "lblFeedBack_" + txt.id;
                lblFeedBack.style.color = "green";
                lblFeedBack.style.fontSize = ".85em";
                txt.parentNode.insertBefore(lblFeedBack, txt.nextSibling);
                
                txt.onpaste = function (e) {
                    e.preventDefault();
                    this.nextElementSibling.innerHTML = "No se permiten usar la función de Pegar (Ctrl+V), valores sobre este campo...";
                }

                txt.oninput = function () {
                    var firstChart = this.value.substring(0, 1);
                    var rEx = new RegExp('[.,-@*+/_#$%&()\"\'=?!¿¡]{1}');
                    if (rEx.test(firstChart))
                        if(!firstChart.match(/[0-9]/))
                            this.nextElementSibling.innerHTML = "No se permiten caracteres especiaes \" .,-@*+/_#$%&()\"'=?!¿¡ \" al inicio de este campo..";
                        else
                            this.nextElementSibling.innerHTML = "";
                    else
                        this.nextElementSibling.innerHTML = "";
                    this.value = this.value.replace(/[^A-Za-z0-9]{0,1}/, '');
                }
            }
        },
        Paginador: {
            Contenedor: "",
            ItemsPorPagina: 0,
            MaximoPaginas: 0,
            EtiquetaACrear:"",
            AgregarClaseCss: "",
            Mostrar: function () {
                if (_Tracert) { console.log('metodo: "App.UI.Paginador.Mostrar()" ha cargado exitosamente'); }
                nombreContenedor = this.Contenedor;
                itemsPorPagina = this.ItemsPorPagina;
                maximoPaginasAMostrar = this.MaximoPaginas;
                addClassPagina = this.AgregarClaseCss;
                /// <summary>P�ginador din�mico creado v�a JavaScript.</summary>
                /// <param name="nombreContenedor" type="String">Nombre del contenedor para buscar el elemento por el metodo document.getElementById, donde se alojar�n las nuevas p�ginas generadas por el p�ginador.</param>
                /// <param name="itemsPorPagina" type="Number">Indica la cantidad de elementos por p�gina, por defecto se establece 5.</param>
                /// <param name="maximoPaginasAMostrar" type="Number">Indica la cantidad de p�ginas activas mostradas por el p�ginador, por defecto se establece 10.</param>
                /// <param name="addClassPagina" type="String">Agrega una subclase a cada p�gina generada.</param>
                /// <seealso cref="paginador">M�todo requerido por NT.Paginador</seealso>
                /// <returns type="Void">Construye p�ginas usando Divs y asinandole el Id='pagina+iteradorPaginas'.</returns>
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
                                var div = document.createElement(this.EtiquetaACrear);
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
                                elemento.href = "javascript:app.UI.Paginador.Mover('link" + c + "','pagina" + c + "')";
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

                    console.log('error en Metodo: "paginadorMostrar(nombreContenedor,  itemsPorPagina, maximoPaginasAMostrar)", ' + err.message);

                }
            },
            Mover: function (nombrelink, nombrePagina) {
                if (_Tracert) { console.log('metodo: "App.UI.Paginador.Mover(nombrelink, nombrePagina)" ha cargado exitosamente'); }
                /// <summary>Muestra una p�gina requerida por el p�ginador.</summary>
                /// <param name="nombrelink" type="String">Nombre del Link para buscar el elemento por el metodo document.getElementById y asignarle la clase "numeroPagina activa".</param>
                /// <param name="nombrePagina" type="String">Obtiene la colecci�n de p�ginas para mostrar la que se este pidiendo mostrar, y se activa pagina[i]style.display='block'.</param>
                /// <seealso cref="paginador">M�todo requerido por NT.Paginador</seealso>
                /// <returns type="Void">No retorna valor.</returns>
                var paginas = document.querySelectorAll(this.EtiquetaACrear + ".pagina");
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
            }
        },
        Draggable: {
            Iniciar: function (e) {
                if (_Tracert) { console.log('metodo: "App.UI.Draggable.Iniciar(e)" ha cargado exitosamente'); }
                if (!e) {
                    var e = window.event;
                }                
                targ = e.target ? e.target : e.srcElement;
                if (targ.className != 'dragme') { return; }
                    if (e.preventDefault) e.preventDefault();
                    offsetX = e.clientX;
                    offsetY = e.clientY;
                    if (!targ.style.left) { targ.style.left = '0px' };
                    if (!targ.style.top) { targ.style.top = '0px' };
                    coordX = parseInt(targ.style.left);
                    coordY = parseInt(targ.style.top);
                    drag = true;                
                    document.onmousemove = this.app.UI.Draggable.Elemento;
                    return false;                
            },
            Elemento: function (e) {
                if (_Tracert) { console.log('metodo: "App.UI.Draggable.Elemento(e)" ha cargado exitosamente'); }
                if (!drag) { return };
                if (!e) { var e = window.event };
                targ.style.left = coordX + e.clientX - offsetX + 'px';
                targ.style.top = coordY + e.clientY - offsetY + 'px';
                return false;
            },
            Detener: function () {                
                if (_Tracert) { console.log('metodo: "App.UI.Draggable.Detener()" ha cargado exitosamente'); }
                drag = false;
            }
        },
        Notificacion:{
            Init:function(){
                this.Overlight=document.getElementById("overlight");
                if(this.Overlight==null){
                    var body=document.getElementsByTagName("body");
                    this.Overlight=document.createElement("div");
                    this.Overlight.id="overlight";
                    this.Overlight.style.display="none";
                    var tagBody=body[0];
                    tagBody.parentNode.insertBefore(this.Overlight,tagBody);            
                }
                var styleOverlight=this.Css("#overlight");
                if(styleOverlight==null){
                    var head=document.getElementsByTagName("head");
                    styleOverlight=document.createElement("style");
                    styleOverlight.innerHTML="#overlight{background-color:rgba(0,0,0,.7);position: fixed;width: 100%;height: 100%;left: 0;top:0;z-index:9999}#boxNotificacion {position: relative;width: 50%;margin: 0 auto;top: 40%;background-color: rgb(250, 250, 250);z-index: 1;padding: 1em;font-family: Tahoma;font-size: 1.2em;border-radius: .5em;}";
                    var tagHead=head[0];
                    tagHead.appendChild(styleOverlight);
                }
                this.Box=document.getElementById("boxNotificacion");        
                if(this.Box==null){
                    this.Box = document.createElement("div");
                    this.Box.id="boxNotificacion";
                    
                    this.Overlight.appendChild(this.Box)                        
                }
            },
            Overlight:null,
            Box:null,
            Duracion:5,
            Mensaje: function (mensaje,callback) {
                var self = this;
                this.Init();
                this.Overlight.style.display = "block";
                this.Box.innerHTML =  mensaje.Mensaje;
                var segundos = this.Duracion - 1;
                var tituloPage = document.title;
                var falta = function () {
                    setTimeout(function () {
                        segundos = segundos - 1;
                        document.title = " Cerrando en " + segundos
                        if (segundos > 0)
                            falta();
                    }, 1000);
                };
                falta();
                setTimeout(function () {
                    self.Overlight.style.display = "none";
                    self.Box.innerHTML = "";
                    document.title = tituloPage;
                    if (callback !== undefined && typeof (callback) === "function") 
                        callback();
                }, this.Duracion * 1000);
            },
            Css:function(className) {
                var estyles=document.styleSheets[0];
                if(estyles!=null){
                    var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules
                    for(var x=0;x<classes.length;x++) {
                        if(classes[x].selectorText==className) {
                            return classes[x].cssText;
                        }
                    }
                } else {
                    return null;
                }
            }
        }
    };
    App.prototype.Runtime = function (starTime) {
        if (_Tracert) { console.log('metodo: "App.Runtime(starTime)" ha cargado exitosamente'); }
        return (((new Date() - starTime) / 1000).toFixed(2) + " segundos...");
    };

    /*----------------------------
     * Métodos por Deprecar
     *----------------------------*/   
    App.prototype.Toogle = function (elemento) {
        var self = this;
        var e = "[deprecated] App.Toogle(elemento) está Obsoleto, por favor usar App.Utils.Toogle(elemento). Este metodo será removido en futuras versiones.";
        if (!this.Utils.Toogle) { throw (e); }
        (this.Toogle = function () {
            console.log(e);
            self.Utils.Toogle(elemento);
        })();
    }
    App.prototype.Obtener = function (url, parametros, callback) {
        var self = this;
        var e = "[deprecated] App.Obtener(url, parametros, callback) está Obsoleto, por favor usar App.Utils.Callback(url, parametros, callback). Este metodo será removido en futuras versiones.";
        if (!this.Utils.Callback) { throw (e); }
        (this.Obtener = function () {
            console.log(e);
            self.Utils.Callback(url, parametros, callback);
        })();
    }

    /*----------------------------
     * Propiedades Públicas
     *----------------------------*/   
     try {
        Object.defineProperty(Object.prototype, 'Enum', {
            value: function () {
                for (i in arguments) {
                    Object.defineProperty(this, arguments[i], {
                        value: parseInt(i, 2),
                        writable: false,
                        enumerable: true,
                        configurable: true
                    });
                }
                return this;
            },
            writable: false,
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(App.prototype, "Resultado", {
            get: function Resultado() {
                return _Result;
            }
        });
        Object.defineProperty(App.prototype, "StartTime", {
            get: function Resultado() {
                return _StartTime;
            }
        });
        Object.defineProperty(App.prototype, "Tracert", {
            get: function Tracert() {
                return _Tracert;
            },
            set: function Tracert(value) {
                _Tracert = value;
            }
        });
     } catch(err) {
        console.log("this explorer no support definition the properties") ;
     }
    /*----------------------------
     * Para Usar como plantilla para nuevos metodos, metodos obsoletos y/o propiedades 
     *----------------------------*/   
    /* 
        App.prototype.SUB_NAMESPACE = {
            METODO1: function () {
            },
            SUBCLASE: {
                METODO1: function () { },
                METODO2: function () { }
            }
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
        Object.defineProperty(App.prototype, "Propiedad", {
            get: function Propiedad() {
                return myVariable;
            },
            set: function Propiedad(value) {
                unidad = myVariable;
            }
        });
    */
    namespace.App=new App();
    //return namespace.App;
})(window || {});

/*document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        this.app = new jt.App();
    }
    if (document.readyState == "complete") {
        if (this.app.Tracert) { console.log("App finalmente correctamente..." + this.app.Runtime(this.app.StartTime)); }
        //TO DO...
    }
}*/
