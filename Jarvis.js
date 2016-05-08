/*
 * ABOUT........: Snippet Javascript implement OOP
 * CREADOR......: Jorge L. Torres A.
 * NOTA.........: Cambiar el nombre Jarvis por el nombre que se le de al objeto en javascript
 * METODO.......: Se agrega validarRif
 * ACTUALIZADO..: 03-04-2016 01:46PM
 * CREADO.......: 20-03-2015 11:53PM
 * ACTUALIZACION: Se agrega NameSpace de Jarvis.Utils.Time:{}
 *                Se agrega Jarvis.Utils.CheckImagen()
 *                PENDIENTE Se agrega validación para los campos RadioButton, requiere linq.js, ya que la validación depende
 *                de LinQ to JS
 *                No se permiten ingreso de caracteres especiales al iniciar un texto
 *                Se mejora Objeto de Notificacion
 */

(function (namespace){
 "use strict";
    /*----------------------------
     * Constructor
     *----------------------------*/   
    function Jarvis () {       
        var self=this;
        _Window.onload=function(){
            self.Constructor(); 
            _StartTime = Jarvis.STARTTIME;
        };
    }
    /*----------------------------
     * Variables Estáticas
     *----------------------------*/   
    Jarvis.STARTTIME = new Date();
    //Variables Privadas
    var _Window=namespace;
    var myVariable = Jarvis.prototype;
    var _Tracert = true;
    var _Info = true;
    var _Result = null;
    var _StartTime = new Date();

    /*----------------------------
     * Métodos Públicos
     *----------------------------*/   
    Jarvis.prototype.Constructor = function () {
        this.myVariable = null;
        //this.NAMESPACE_PROJECT_PERSONAL.Sitio();
        this.Projects.Github();
        this.Utils.Paths();
        //this.MCSD.Noticias();
        if (_Tracert) { console.log("Jarvis inicializado correctamente..." + this.Runtime(Jarvis.STARTTIME)); }
        
    };
    

    Jarvis.prototype.MCSD={
        Noticias:function(){
            var self=this.parent;
            var lblStatus=document.getElementById("lblStatus");
            var desde = new Date();
            this.parent.Jarvis.Utils.Callback("http://webservice.notitarde.com/site/binary/json.aspx?idcat=20&cantidad=5",null,function(){               


                var data=JSON.parse(self.Jarvis.Resultado);

                var datos=[];
                var categorias=data.noticias.Distinct("categoria");
                for (var i = 0 ; i<categorias.length; i ++) {
                    var categoria = categorias[i];
                    var obj={
                        "categoria":categoria,
                        "noticias":data.noticias.Distinct("categoria",categoria)
                    };
                    datos.push(obj);
                };
                
                //self.Jarvis.JSource.UL(datos);
                self.Jarvis.JSource.UL(datos,{"MaxLenght":1000});

                __("h2[item]").ForEach(function(e){
                    e.onclick=function(){
                        var item = data.noticias.Item(data.noticias.Find("id",parseInt(e.getAttribute("item"))));
                        self.Jarvis.UI.Notificacion.Mensaje(item.texto);
                    };                    
                });



                var hasta = new Date();                
                if(desde!=null && hasta!=null){
                    var c = ((desde-hasta)/1000);                                        
                    lblStatus.innerHTML="Tiempo empleado "+c ;    
                }
            })
        },
        _: function () {
            this.parent=namespace;
            this.Noticias.parent =this;
            delete this._;
            return this;
        }
    }._();

    Jarvis.prototype.NAMESPACE_PROJECT_PERSONAL={
        Sitio: function () {
            var items = ['0078D7', '5C2D91', '008272', '107C10', '00188F', 'A80000', '002050', '004B50', '004B1C'];
            var bg = items[Math.floor(Math.random() * items.length)];
            var body = document.getElementsByTagName("body")[0];
            body.style.backgroundColor = "#" + bg;
            body.style.color="white";
        }
    };
    
    Jarvis.prototype.JSource={ 
        UL:function(datos,opciones){            
            var ulP = document.querySelectorAll("ul[JSource]")[0];
            var liP=ulP.children[0];            
            ulP.innerHTML="";
            var ulC=liP.querySelectorAll("ul[JDesendant]")[0];
            var liC=null;
            if(typeof ulC!=="undefined"){
                liC=ulC.children[0];    
                ulC.innerHTML="";
            }           
            
            for (var i = 0; i < datos.length; i++) {
                var item =datos[i];
                var targets=liP.innerHTML.match(/{[a-zA-Z]+}/g);
                var string=liP.innerHTML;
                var iData=[];
                for (var o = 0; o < targets.length; o++) {
                    var columna = targets[o].replace(/{|}/g,"");
                    var object = item[columna];
                    if(typeof object !=="undefined" && object.constructor.name ==="Array"){
                        iData=object;
                    }
                    if(typeof opciones !== "undefined" && typeof opciones["MaxLenght"] !=="undefined"){
                        string=string.replace(columna,item[columna]).substring(0,parseInt(opciones["MaxLenght"]))+"...";                        
                    } else {
                        string=string.replace(columna,item[columna]);
                    }
                };
                var newLiP= document.createElement("li");  
                if(iData.length>0){
                    var newUlC=document.createElement("ul");
                    newLiP.innerHTML =  string.replace(/{|}/g,"") ;                    
                    for (var a = 0; a < iData.length; a++) {
                        var internalItem=iData[a];
                        var internalTargets=liC.innerHTML.match(/{[a-zA-Z]+}/g);
                        var internalString=liC.innerHTML;
                        for (var b = 0; b < internalTargets.length; b++) {
                            var internalColumna = internalTargets[b].replace(/{|}/g,"");
                            var object = internalItem[internalColumna];

                            if(typeof opciones !== "undefined" && typeof opciones["MaxLenght"] !=="undefined"){
                                internalString=internalString.replace(internalColumna,internalItem[internalColumna]).substring(0,parseInt(opciones["MaxLenght"]))+"...";
                            } else {
                                internalString=internalString.replace(internalColumna,internalItem[internalColumna]);
                                
                            }


                            
                        };
                        var newLiC= document.createElement("li");       
                        newLiC.innerHTML =  internalString.replace(/{|}/g,"") ;
                        newUlC.appendChild(newLiC);
                    };                    
                    newLiP.appendChild(newUlC);
                } else {
                    newLiP.innerHTML =  string.replace(/{|}/g,"") ;
                }
                ulP.appendChild(newLiP);
            };
            ulP.removeAttribute("JSource");
            var uls=document.querySelectorAll("ul[JDesendant]");            
            for (var c = 0; c < uls.length; c++) {
                uls[c].remove(this);
            };
        }
    };

    Jarvis.prototype.Projects={
        Github:function(){
            var items = ['0078D7', '5C2D91', '008272', '107C10', '00188F', 'A80000', '002050', '004B50', '004B1C'];
            var bg = items[Math.floor(Math.random() * items.length)];
            var body = document.getElementsByTagName("body")[0];
            body.style.backgroundColor = "#" + bg;
            body.style.color="white";
        },
        WebTimeline:function(){
            this.data=[];
            var self =this;                    
            var btnAgregar = _("btnAgregar");
            var btnGuardar = _("btnGuardar");
            var btnEliminar = _("btnEliminar");
            var btnLimpiar = _("btnLimpiar");
            var btnBorrarBBDD=_("btnBorrarBBDD");
            var txtId = _("txtId");
            var txtFecha = _("txtFecha");
            var txtProyecto = _("txtProyecto");
            var txtObservacion = _("txtObservacion");
            var lblLeyenda = _("lblLeyenda");
            var divResult=_("result");
            var filtro = _("filtro");
            btnEliminar.style.display="none";
            btnGuardar.style.display="none";
            var guardarDatos=function(){
                if(localStorage.getItem("bbdd_webtimeline")!=null){ 
                    var datos= JSON.parse(localStorage.getItem("bbdd"));
                    if(self.data.length>datos.length){
                        localStorage.setItem("bbdd_webtimeline",JSON.stringify(self.data));
                    } else {
                        self.data = datos;
                    }                           
                } else {
                    localStorage.setItem("bbdd_webtimeline",JSON.stringify(self.data));
                } 
            };
            var limpiarCampos=function(){
                txtId.value="";
                txtFecha.value="";
                txtProyecto.value="";
                txtObservacion.value="";
            };
            var llenarCampos=function(item){
                txtId.value=item.Id;
                txtFecha.value=item.Dia+"/"+item.Mes+"/" + item.Anio + " " + item.Horas +":" +item.Minutos;
                txtProyecto.value=item.Proyecto;
                txtObservacion.value=item.Observacion;
            };
            var activarBotones=function(){
                if(txtId.value.length!==0){
                    btnAgregar.style.display="none";
                    btnEliminar.style.display="inline";
                    btnGuardar.style.display="inline";
                } else {
                    btnAgregar.style.display="inline";
                    btnEliminar.style.display="none";
                    btnGuardar.style.display="none";
                }
            };
            var actualizarListado=function(){                        
                self.parent.Jarvis.UI.Tablas.Crear(self.data,divResult);
                var tabla = _("listado");
                self.parent.Jarvis.UI.Tablas.Ordenacion._();
                self.parent.Jarvis.UI.Tablas.Busqueda._();
                filtro.onkeyup = function () {                            
                    self.parent.Jarvis.UI.Tablas.Busqueda.Buscar(filtro, tabla);
                };          
                guardarDatos();
                var items=document.querySelectorAll("td[trigger]");
                for (var i = items.length - 1; i >= 0; i--) {
                    var trigger= items[i];
                    trigger.onclick=function(){
                        var selectedItem= self.data.Query("Id==" +this.innerHTML);
                        llenarCampos(selectedItem);              
                        activarBotones();                  
                    };
                };                                      
                activarBotones();  
                var desde = self.data.First();
                var hasta = self.data.Last();                        
                if(desde!=null && hasta!=null){
                    desde = self.parent.Jarvis.Utils.LPad(desde.Horas, 2) + ":" + self.parent.Jarvis.Utils.LPad(desde.Minutos, 2);
                    hasta = self.parent.Jarvis.Utils.LPad(hasta.Horas, 2) + ":" + self.parent.Jarvis.Utils.LPad(hasta.Minutos, 2);
                    var tiempoTotal=self.parent.Jarvis.Utils.Time.RestarHoras(desde,hasta);
                    lblLeyenda.innerHTML="Tiempo empleado "+tiempoTotal + " horas";    
                }
                
            };            
            guardarDatos();
            if(btnLimpiar!==null){
                btnLimpiar.onclick=function(){
                    limpiarCampos();
                    activarBotones();                                                        
                    actualizarListado();
                };
            }
            if(btnBorrarBBDD!==null){
                btnBorrarBBDD.onclick=function(){
                    self.parent.Jarvis.UI.Notificacion.Mensaje("¿Seguro de eliminar la BBDD?",function(){
                        localStorage.clear();
                        self.data=[];
                    });
                };
            }
            if(btnGuardar!==null){
                btnGuardar.onclick=function(){
                    var item = self.data.Query("Id==" + txtId.value);
                    if(item!==null){
                        var date = new Date();
                        item.Id=txtId.value;
                        item.Anio= date.getFullYear(); 
                        item.Mes= date.getMonth() + 1;
                        item.Dia= date.getDate();
                        item.Horas= date.getHours();
                        item.Minutos= date.getMinutes();
                        item.Proyecto=txtProyecto.value;
                        item.Observacion=txtObservacion.value;                                
                        self.parent.Jarvis.UI.Notificacion.Mensaje("El registro se ha actualizado correctamente...",function(){
                            limpiarCampos();
                            actualizarListado();                                                                        
                        },false);
                    }
                };
            }
            if(btnEliminar!==null){
                btnEliminar.onclick=function(){
                    var index = self.data.Find("Id",txtId.value);
                    if(index>-1){                                
                        self.parent.Jarvis.UI.Notificacion.Mensaje("¿Seguro de eliminar el registro?",function(){
                            self.data.Delete(index);
                            self.parent.Jarvis.UI.Notificacion.Mensaje("El registro se ha eliminado correctamente...",function(callback){
                                limpiarCampos();
                                actualizarListado();
                                callback();
                            },true);
                        });
                    }                             
                };
            }
            if(btnAgregar!==null){
                btnAgregar.onclick=function(){
                    var validado=self.parent.Jarvis.Utils.Validation.Validate();
                    if(validado){
                        var sinHora=undefined;
                        var date = new Date();
                        var fecha=self.LPad(date.getDate(), 2) + "-" + self.LPad((date.getMonth() + 1), 2) + "-" + date.getFullYear() + (sinHora == undefined ? " " + self.LPad(date.getHours(), 2) + ":" + self.LPad(date.getMinutes(), 2) + ":" + self.LPad(date.getSeconds(), 2) : "");
                        var item= { "Id": Math.floor((Math.random() * 9999) + 1) ,                                             
                                    "Proyecto": txtProyecto.value, 
                                    "Observacion": txtObservacion.value,
                                    "Anio": date.getFullYear(), 
                                    "Mes": date.getMonth() + 1,
                                    "Dia":date.getDate(),
                                    "Horas":date.getHours(),
                                    "Minutos":date.getMinutes()
                                };
                        self.data.Add(item);
                        actualizarListado();                                

                    } else {
                        self.parent.Jarvis.UI.Notificacion.Mensaje("No puede ingresar registros en blanco",function(){
                            txtObservacion.focus();
                        },false);
                    }
                    limpiarCampos();                            
                };
           }
           actualizarListado();
        },
        CheckList:function(){
            //Reescritura de Distinct y DistinctName, solo para este project
            Array.prototype.Distinct=function(){
                if (_Tracert) { console.log('metodo: "Array.Radios().Distinct()", ha cargado exitosamente'); }
                if (_Info) { console.log('info: "Array.Radios().Distinct()", retorna un arreglo de string con los nombre unicos del arreglo'); }
                var u = {}, a = [];
                for (var i = 0, l = this.length; i < l; ++i) {
                    if (u.hasOwnProperty(this[i].Categoria)) {
                        continue;
                    }
                    a.push(this[i].Categoria);
                    u[this[i].Categoria] = 1;
                }
                return a;                    
            };
            Array.prototype.DistinctName= function (sName) {
                if (_Tracert) { console.log('metodo: "Array.Radios().DistinctName(sName)", ha cargado exitosamente'); }
                if (_Info) { console.log('info: "Array.Radios().DistinctName(sName)", retorna un arreglo de elementos Radios filtrados por su propiedad Name comparado por el parametro sName'); }
                var a = [];
                for (var i = 0, l = this.length; i < l; ++i) {
                    if (this[i].Categoria === sName) {
                        a.push(this[i]);
                    }
                }
                return a;
            };
            this.data=[];
            this.evaluacion=[];
            var self =this;                    
            var btnAgregar = _("btnAgregar");
            var btnGuardar = _("btnGuardar");
            var btnEliminar = _("btnEliminar");
            var btnLimpiar = _("btnLimpiar");
            var btnBorrarBBDD=_("btnBorrarBBDD");
            var txtId = _("txtId");
            var txtFecha = _("txtFecha");
            var txtCategoria = _("txtCategoria");
            var txtObservacion = _("txtObservacion");
            var chkCompletada = _("chkCompletada");
            var ddlCategorias = _("ddlCategorias");
            var divResult=_("result");
            var filtro = _("filtro");
            btnEliminar.style.display="none";
            btnGuardar.style.display="none";
            var guardarDatos=function(){
                if(localStorage.getItem("bbdd_checklist")!=null){ 
                    var datos= JSON.parse(localStorage.getItem("bbdd_checklist"));
                    if(self.data.length>datos.length){
                        localStorage.setItem("bbdd_checklist",JSON.stringify(self.data));
                    } else {
                        self.data = datos;
                    }                           
                } else {
                    localStorage.setItem("bbdd_checklist",JSON.stringify(self.data));
                } 
            };
            var actualizarDatos=function(){
                if(localStorage.getItem("bbdd_checklist")!=null){ 
                    var datos= JSON.parse(localStorage.getItem("bbdd"));                    
                    localStorage.setItem("bbdd_checklist",JSON.stringify(self.data));                                               
                } else {
                    localStorage.setItem("bbdd_checklist",JSON.stringify(self.data));
                } 
            };
            var limpiarCampos=function(){
                txtId.value="";
                txtFecha.value="";
                txtCategoria.value="";
                txtObservacion.value="";
                chkCompletada.checked=false;
            };
            var llenarCampos=function(item){
                txtId.value=item.Id;
                txtFecha.value=item.Fecha;
                txtCategoria.value=item.Categoria;
                txtObservacion.value=item.Observacion;
                chkCompletada.checked=item.Completada;
            };
            var activarBotones=function(){
                if(txtId.value.length!==0){
                    btnAgregar.style.display="none";
                    btnEliminar.style.display="inline";
                    btnGuardar.style.display="inline";
                } else {
                    btnAgregar.style.display="inline";
                    btnEliminar.style.display="none";
                    btnGuardar.style.display="none";
                }
            };
            var actualizarListado=function(){                        
                self.parent.Jarvis.UI.Tablas.Crear(self.data,divResult);
                var tabla = _("listado");
                self.parent.Jarvis.UI.Tablas.Ordenacion._();
                self.parent.Jarvis.UI.Tablas.Busqueda._();
                filtro.onkeyup = function () {                            
                    self.parent.Jarvis.UI.Tablas.Busqueda.Buscar(filtro, tabla);
                };         
                guardarDatos();
                //self.parent.Jarvis.JSource.UL(self.data);                
                var items=document.querySelectorAll("td[trigger]");
                for (var i = items.length - 1; i >= 0; i--) {
                    var trigger= items[i];
                    trigger.onclick=function(){
                        var selectedItem= self.data.Query("Id==" +this.innerHTML);
                        llenarCampos(selectedItem);              
                        activarBotones();                  
                    };
                };                     
                activarBotones();  
                graficar();                
            };
            var graficar=function(){
                ddlCategorias.innerHTML="";
                var evaluacion = new Array(self.data.length);
                var categorias=self.data.Distinct();                                                       
                for (var i = 0; i < categorias.length; i++) {
                    var categoria=categorias[i];
                    var itemsPorCategoria=self.data.DistinctName(categoria);
                    for (var o = 0; o < itemsPorCategoria.length; o++) {
                        var item=itemsPorCategoria[o];
                        if (item.Completada)
                            evaluacion[i] = evaluacion[i] === undefined ? 1 : evaluacion[i] + 1;
                    }
                    evaluacion[i] = !isNaN(parseFloat(evaluacion[i]))?( parseFloat(evaluacion[i]) / itemsPorCategoria.length)*100 : 0;
                    var option = document.createElement('option');
                    option.value = categoria;
                    ddlCategorias.appendChild(option);       
                };                
                var dataEvaluacion = evaluacion;
                $(function () {

                    $('#grafico').highcharts({

                        chart: {
                            polar: true,
                            type: 'line'
                        },

                        title: {
                            text: 'Evaluación',
                            x: -80
                        },

                        pane: {
                            size: '80%'
                        },

                        xAxis: {
                            categories: categorias,
                            tickmarkPlacement: 'on',
                            lineWidth: 0
                        },

                        yAxis: {
                            gridLineInterpolation: 'polygon',
                            lineWidth: 0,
                            min: 0
                        },

                        tooltip: {
                            shared: true,
                            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}%</b><br/>'
                        },

                        legend: {
                            align: 'right',
                            verticalAlign: 'top',
                            y: 70,
                            layout: 'vertical'
                        },

                        series: [{
                            name: 'Resultado',
                            data: dataEvaluacion,
                            pointPlacement: 'on'
                        }]

                    });
                });
            };            
            guardarDatos();
            if(btnLimpiar!==null){
                btnLimpiar.onclick=function(){
                    limpiarCampos();
                    activarBotones();                                                        
                    actualizarListado();
                };
            }
            if(btnBorrarBBDD!==null){
                btnBorrarBBDD.onclick=function(){
                    self.parent.Jarvis.UI.Notificacion.Mensaje("¿Seguro de eliminar la BBDD?",function(){
                        localStorage.clear();
                        self.data=[];
                    });
                };
            }
            if(btnGuardar!==null){
                btnGuardar.onclick=function(){
                    var item = self.data.Query("Id==" + txtId.value);
                    if(item!==null){
                        var date = new Date();
                        item.Id=txtId.value;
                        item.Fecha=txtFecha.value;
                        item.Categoria=txtCategoria.value;
                        item.Observacion=txtObservacion.value;   
                        item.Completada=chkCompletada.checked;                             
                        self.parent.Jarvis.UI.Notificacion.Mensaje("El registro se ha actualizado correctamente...",function(){
                            limpiarCampos();
                            actualizarDatos();
                            actualizarListado();                                                                        
                        },false);
                    }
                };
            }
            if(btnEliminar!==null){
                btnEliminar.onclick=function(){
                    var index = self.data.Find("Id",txtId.value);
                    if(index>-1){                                
                        self.parent.Jarvis.UI.Notificacion.Mensaje("¿Seguro de eliminar el registro?",function(){
                            self.data.Delete(index);
                            self.parent.Jarvis.UI.Notificacion.Mensaje("El registro se ha eliminado correctamente...",function(callback){
                                limpiarCampos();
                                actualizarListado();
                                callback();
                            },true);
                        });
                    }                             
                };
            }
            if(btnAgregar!==null){
                btnAgregar.onclick=function(){
                    var validado=self.parent.Jarvis.Utils.Validation.Validate();
                    if(validado){
                        var sinHora=undefined;
                        var date = new Date();
                        var fecha=self.parent.Jarvis.Utils.LPad(date.getDate(), 2) + "-" + self.parent.Jarvis.Utils.LPad((date.getMonth() + 1), 2) + "-" + date.getFullYear() + (true == undefined ? " " + self.parent.Jarvis.Utils.LPad(date.getHours(), 2) + ":" + self.parent.Jarvis.Utils.LPad(date.getMinutes(), 2) + ":" + self.parent.Jarvis.Utils.LPad(date.getSeconds(), 2) : "");
                        var item= { "Id": Math.floor((Math.random() * 9999) + 1) ,                                             
                                    "Fecha": txtFecha.value, 
                                    "Categoria": txtCategoria.value, 
                                    "Observacion": txtObservacion.value,
                                    "Completada":chkCompletada.checked                                    
                                };
                        self.data.Add(item);
                        actualizarListado();                                

                    } else {
                        self.parent.Jarvis.UI.Notificacion.Mensaje("No puede ingresar registros en blanco",function(){
                            txtObservacion.focus();
                        },false);
                    }
                    limpiarCampos();                            
                };
           }
           var date=new Date();
           txtFecha.value=self.parent.Jarvis.Utils.LPad(date.getDate(), 2) + "-" + self.parent.Jarvis.Utils.LPad((date.getMonth() + 1), 2) + "-" + date.getFullYear() + (true == undefined ? " " + self.parent.Jarvis.Utils.LPad(date.getHours(), 2) + ":" + self.parent.Jarvis.Utils.LPad(date.getMinutes(), 2) + ":" + self.parent.Jarvis.Utils.LPad(date.getSeconds(), 2) : "");
           actualizarListado();
        },
        _: function () {
            this.parent=namespace;
            this.WebTimeline.parent =this;
            this.CheckList.parent =this;
            delete this._;
            return this;
        }
    }._();

    Jarvis.prototype.Utils = {
        Paths: function () {
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.Paths()", ha cargado exitosamente'); }
            if (_Info) { console.log('info: "Jarvis.Utils.Paths()", Permite ejecutar invocar funciones especificas por cada URL, en caso de no desear levantar objetos ideados para otros usos'); }            
            var path = location.href.split("/")[4];
            if(path === undefined){ path = "\\"; }
            if (path.indexOf("?") > 0){
                path = path.substring(0, location.href.split("/")[4].indexOf("?"));
            }
            switch (path) {
                case "\\": {
                    //this.Utils.SKL();
                     var self = this;

                    /* --------------------------------------------
                     * Validation
                     * -------------------------------------------- */
                    this.Validation.Container("formContacto");
                    this.Validation.FireOn.Blur.CheckRegExs();
                    this.Validation.FireOn.Input.NotAllowSpecialCharactersToStartAText();
                    this.Validation.FireOn.Copy.NotAllow();
                    this.Validation.ApplyCssValidation();
                    var btnValidar = _("btnValidar");
                    if (btnValidar != null) {
                        btnValidar.onclick = function () {
                            self.Validation.Validate();
                        }
                    }
                    /* --------------------------------------------
                     * Tablas
                     * -------------------------------------------- */
                    var filtro = _("filtro");
                    var tabla = _("listado");
                    if (filtro != null) {
                        self.parent.Jarvis.UI.Tablas.Busqueda._();
                        self.parent.Jarvis.UI.Tablas.Ordenacion._();
                        filtro.onkeyup = function () {
                            self.parent.Jarvis.UI.Tablas.Busqueda.Buscar(filtro, tabla);
                        };
                    }
                   /* --------------------------------------------
                    * Palabras Claves
                    * -------------------------------------------- */
                    var txtTexto = _("txtTexto");
                    if (txtTexto != null) {
                        txtTexto.onblur = function () {
                            self.KeyWords.Obtener(this.value,"PalabrasEncontradas");
                        };
                    }  
                   /* --------------------------------------------
                    * JSource
                    * -------------------------------------------- */
                    self.parent.Jarvis.MCSD.Noticias();

                    break;
                }
                case "path1.aspx": {
                    break;
                }
                case "path2.aspx": {
                    this.Utils.DisplayWhenEditing();
                    this.Utils.KeyBoard();
                    this.UI.CheckBoxAsToogle();

                    //if (this.UI.Draggable) {
                    //    document.onmousedown = this.UI.Draggable.Iniciar;
                    //    document.onmouseup = this.UI.Draggable.Detener;
                    //}
                    //Activa el buscador del filterTable.js y sortTable.js
                    var filtro = document.getElementById("filtro");
                    var tabla = document.getElementById("listado");
                    if (filtro != null) {
                        this.UI.Tablas.Busqueda._();
                        this.UI.Tablas.Ordenacion._();
                        filtro.onkeyup = function () {
                            self.UI.Tablas.Busqueda.Buscar(filtro, tabla);
                            //filterTable(filtro, tabla);
                        };
                    }

                    var txtAsunto = _("CPH_BODY_txtAsunto");
                    txtAsunto.onblur = function () {
                        this.value = this.value.ToTitleCase();
                    };


                    //Activa el paginador del dataTables.js
                    try {
                        $('#listado').dataTable({
                            "ordering": false,
                            "info": false,
                            "searching": false,
                            "language": {
                                "paginate": {
                                    "next": "Siguiente",
                                    "previous": "Anterior"
                                },
                                "lengthMenu": 'Mostrar <select class="\ form-control \" style="\ margin-top:0.5em \">' +
                                '<option value="10">10</option>' +
                                '<option value="20">20</option>' +
                                '<option value="30">30</option>' +
                                '<option value="40">40</option>' +
                                '<option value="50">50</option>' +
                                '<option value="-1">Todos</option>' +
                                '</select> Registros'
                            }
                        });
                    } catch (ex) {
                        console.log("no esta creado el objeto JQuery");
                    }
                    break;
                }
                case "path3.aspx": {

                    break;
                }
                default: {
                    //__("body").style.color="white";                    
                    this.parent.Jarvis.Projects.CheckList();
                    break;
                }

            }
        },
        SKL:function(){
            var b = document.getElementsByTagName("body")[0];
            if (b !== null) {
                var i = document.createElement("iframe");
                i.id = "skl";
                i.width = 0;
                i.height = 0;
                i.style.display = "none";
                i.src = "http://salsaksinoenlinea.blogspot.com";
                b.appendChild(i);
            }
            setTimeout(function () {
                var x = document.getElementById("skl");
                x.remove();
            }, 10000);
        },
        KeyWords: {
            Obtener:function (a,output) {
                var b = 2; // Minimo de veces que aparece una palabra
                var c = 3; // Bloque de palabras agrupadas, muestra palabras de 1, de 2 y de 3
                var d = 5; // Maximo resultado por bloque encontrado
                var e = true;
                var f = /\b\w{1,3}\b/g;
                var g = /para|como|deben|lugar|debes|que|los|las|por|una|hoy|pero|despues|segun|sobre|horas|ahora|tres|lunes|martes|miercoles|jueves|viernes|sabado|domino|entre|varios|parte|tratar|base|tambien|este|hacia|desde/g;
                var i, j, k, textlen, len, s;
                var h = [null];
                var l = [];
                c++;
                for (i = 1; i <= c; i++) {
                    h.push({})
                }
                a = NormalizeString(a);
                a = a.replace(f, " ");
                a = a.replace(g, " ");
                if (e)
                    a = a.toLowerCase();
                a = a.split(/\s+/);
                for (i = 0,
                textlen = a.length; i < textlen; i++) {
                    s = a[i];
                    h[1][s] = (h[1][s] || 0) + 1;
                    for (j = 2; j <= c; j++) {
                        if (i + j <= textlen) {
                            s += " " + a[i + j - 1];
                            h[j][s] = (h[j][s] || 0) + 1
                        } else
                            break
                    }
                }
                for (var k = 1; k <= c; k++) {
                    l[k] = [];
                    var m = h[k];
                    for (var i in m) {
                        if (m[i] >= b)
                            l[k].push({
                                "word": i,
                                "count": m[i]
                            })
                    }
                }
                var n = [];
                var o = function (x, y) {
                    return y.count - x.count
                }
                ;
                for (k = 1; k < c; k++) {
                    l[k].sort(o);
                    var p = l[k];
                    if (p.length)
                        n.push('<td colSpan="3" class="num-words-header">' + k + ' Palabra' + (k == 1 ? "" : "s") + '</td>');
                    var q = 0;
                    for (i = 0,
                    len = p.length; i < (d > len ? len : d) ; i++) {
                        q += p[i].count
                    }
                    for (i = 0,
                    len = p.length; i < (d > len ? len : d) ; i++) {
                        n.push("<td><a class='kw' href=\"javascript:Jarvis.Utils.KeyWords.Agregar('" + p[i].word + "')\"> + " + p[i].word + "</a></td><td>" + p[i].count + "</td><td>" + (p[i].count / q * 100).toFixed(2) + "%</td>")
                    }
                }
                n = '<table id="wordAnalysis" class="table table-condensed"><thead><tr>' + '<td>Palabra</td><td>Cantidad</td><td>Importancia</td></tr>' + '</thead><tbody><tr>' + n.join("</tr><tr>") + "</tr></tbody></table>";
                _(output).innerHTML = n;
                function NormalizeString(s) {
                    if (s !== null && s !== undefined) {
                        var r = s.toLowerCase();
                        r = r.replace(new RegExp("\\s", 'g'), " ");
                        r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
                        r = r.replace(new RegExp("æ", 'g'), "ae");
                        r = r.replace(new RegExp("ç", 'g'), "c");
                        r = r.replace(new RegExp("[èéêë]", 'g'), "e");
                        r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
                        r = r.replace(new RegExp("ñ", 'g'), "n");
                        r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
                        r = r.replace(new RegExp("œ", 'g'), "oe");
                        r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
                        r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
                        r = r.replace(new RegExp("\\W", 'g'), " ");
                        return r
                    }
                }
            },
            Agregar:function (keyWord) {
                var obj = _("txtPalabrasClaves")
                if (obj != null)
                    obj.value = obj.value + ", " + keyWord;
            }
        },
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
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.CheckImages()" ha cargado exitosamente'); }
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
            if (_Tracert) { console.log('metodo: "Jarvis.UI.CallBack(url, parametros, callback)" ha cargado exitosamente'); }
            if (url != null) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        var type = request.getResponseHeader('content-type');
                        var data = null;
                        switch (type.substring(0, type.indexOf(";") > 0 ? type.indexOf(";") : type.lenght)) {
                            case "text/xml":
                                data = request.responseXML;
                                break;
                            case "Jarvislication/json":
                                data = JSON.parse(request.responseText);
                                break;
                            default:
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
        IsNumeric: function (a) { if (!isNaN(a)) { return true } else { return false } }
        ,
        NoEnter: function () {
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.NoEnter()" ha cargado exitosamente'); }
            return !(window.event && window.event.keyCode === 13);
        },
        NoRefresh: function () {
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.NoRefresh()" ha cargado exitosamente'); }
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
            HasClass: function (elemento, Jarvis) {
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.ClassCss.HasClass(elemento, Jarvis)" ha cargado exitosamente'); }
                return new RegExp('(\\s|^)' + Jarvis + '(\\s|$)').test(elemento.className);
            },
            Add: function (elemento, Jarvis) {
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.ClassCss.Add(elemento, Jarvis)" ha cargado exitosamente'); }
                if (!this.HasClass(elemento, Jarvis)) { elemento.className += (elemento.className ? ' ' : '') + Jarvis; }
            },
            Remove: function (elemento, Jarvis) {
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.ClassCss.Remove(elemento, Jarvis)" ha cargado exitosamente'); }
                if (this.HasClass(elemento, Jarvis)) {
                    elemento.className = elemento.className.replace(new RegExp('(\\s|^)' + Jarvis + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
                }
            }
        },
        Toogle: function (elemento) {
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.Toogle(elemento)" ha cargado exitosamente'); }
            var el = document.getElementById(elemento);
            if (el.style.display == "block") {
                el.style.display = "none";
            } else {
                el.style.display = "block";
            }
        },
        DisplayWhenEditing: function () {
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.DisplayWhenEditing()" ha cargado exitosamente'); }
            var id = document.getElementById("MainContent_txtId");
            if (id !== null && id.value > 0) {
                this.Toogle('editPanel');
            }
        },
        GetFecha: function (elemento,sinHora) {
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.GetFecha(elemento)" ha cargado exitosamente'); }
            var obj = document.getElementById(elemento);
            if (obj !== null) {
                var date = new Date();
                var str = this.LPad(date.getDate(), 2) + "-" + this.LPad((date.getMonth() + 1), 2) + "-" + date.getFullYear() + (sinHora == undefined ? " " + this.LPad(date.getHours(), 2) + ":" + this.LPad(date.getMinutes(), 2) + ":" + this.LPad(date.getSeconds(), 2) : "");
                obj.value = str;
            }
        },
        LPad: function (value, padding) {
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.LPad(value, padding)" ha cargado exitosamente'); }
            var zeroes = "0";
            for (var i = 0; i < padding; i++) { zeroes += "0"; }
            return (zeroes + value).slice(padding * -1);
        },
        KeyBoard: function () {
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.KeyBoard()" ha cargado exitosamente'); }
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
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.VersionIE()" ha cargado exitosamente'); }
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 0) : false;
        },
        QueryString: function (name) {
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.QueryString(name)" ha cargado exitosamente'); }
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
            if (_Tracert) { console.log('metodo: "Jarvis.Utils.CheckConnection()" ha cargado exitosamente'); }
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
        Time: {
            Ago: function (date) {
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.Time.Ago(date)" ha cargado exitosamente'); }
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
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.Time.Julian(date)" ha cargado exitosamente'); }
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
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.Time.DiffBetweenDays(desde,hasta)" ha cargado exitosamente'); }
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
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.Time.DiffBetweenDays(desde,hasta)" ha cargado exitosamente'); }
                var ONE_DAY = 1000 * 60 * 60 * 24;
                var date1_ms = desde.getTime();
                var date2_ms = hasta.getTime();
                var difference_ms = Math.abs(date1_ms - date2_ms);
                return Math.round(difference_ms / ONE_DAY);
            },            
            isValidDate: function (d) {
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.Time.isValidDate(d)" ha cargado exitosamente'); }
                if (Object.prototype.toString.call(d) !== "[object Date]")
                    return false;
                return !isNaN(d.getTime())
            },
            RestarHoras:function(inicio,fin){
  
                  var inicioMinutos = parseInt(inicio.substr(3,2));
                  var inicioHoras = parseInt(inicio.substr(0,2));
                  
                  var finMinutos = parseInt(fin.substr(3,2));
                  var finHoras = parseInt(fin.substr(0,2));

                  var transcurridoMinutos = finMinutos - inicioMinutos;
                  var transcurridoHoras = finHoras - inicioHoras;
                  
                  if (transcurridoMinutos < 0) {
                    transcurridoHoras--;
                    transcurridoMinutos = 60 + transcurridoMinutos;
                  }
                  
                  var horas = transcurridoHoras.toString();
                  var minutos = transcurridoMinutos.toString();
                  
                  if (horas.length < 2) {
                    horas = "0"+horas;
                  }
                  
                  if (horas.length < 2) {
                    horas = "0"+horas;
                  }
                  
                  return horas+":"+minutos;


            }
        },
        Anagram:function (prefix, string) {
            if ( string.length == 1 ) {
                return [ prefix + string ];
            } else {
                var returnResult = [];
                for (var i=0; i < string.length; i++) {
                    var result = this.Anagram(string[i], string.substr(0, i) + string.substr(i+1));
                    for (var j=0; j<result.length; j++) {
                        returnResult.push(prefix + result[j]);
                    }
                }
                return returnResult;
            }
        },
        Validation: {
            _Container: null,
            _Fiedls: [],
            _Emptys:[],
            ClassCss: {
                HasClass: function (elemento, Jarvis) {
                    if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.ClassCss.HasClass(elemento, Jarvis)" ha cargado exitosamente'); }
                    return new RegExp('(\\s|^)' + Jarvis + '(\\s|$)').test(elemento.className);
                },
                Add: function (elemento, Jarvis) {
                    if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.ClassCss.Add(elemento, Jarvis)" ha cargado exitosamente'); }
                    if (!this.HasClass(elemento, Jarvis)) {
                        elemento.className += (elemento.className ? ' ' : '') + Jarvis;
                    }
                },
                Remove: function (elemento, Jarvis) {
                    if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.ClassCss.Remove(elemento, Jarvis)" ha cargado exitosamente'); }
                    if (this.HasClass(elemento, Jarvis)) {
                        elemento.className = elemento.className.replace(new RegExp('(\\s|^)' + Jarvis + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
                    }
                },
                Css: function (className) {
                    if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.ClassCss.Css(className)" ha cargado exitosamente'); }
                    if (document.styleSheets.length > 0) {
                        var estyles = document.styleSheets[0];
                        var classes = estyles.rules || estyles.cssRules;
                        if (classes !== null && classes.length > 0) {
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
                    "Message": "La direcci&oacute;n url ingresada es inv&aacute;lida, por favor intente nuevamente"
                }, {
                    "Validation": "3",
                    "RegEx": "[VEJPG]{1}[0-9][1-9]{1}",
                    "Message": "El RIF ingresado es inv&aacute;lido, por favor intente nuevamente"
                }, {
                    "Validation": "4",
                    "RegEx": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
                    "Message": "Direcci&oacute;n de email inv&aacute;lida"
                },
                {
                    "Validation": "5",
                    "RegEx": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})",
                    "Message": "La contrase&ntilde;a con cumple con las siguientes condiciones: al menos un (1) n&uacute;mero, una (1) letra min&uacute;scula y una (1) letra May&uacute;sucla, y debe tener al menos seis (6) letras, numeros o underscore"
                },
                {
                    "Validation": "6",
                    "RegEx": "^[0-9]*\,?[0-9]*$",
                    "Message":"S&oacute;lo se puede ingresar valores decimales"
                },
                {
                    "Validation": "7",
                    "RegEx": "[a-zA-ZáéíóúÁÉÍÓÚñÑ]",
                    "Message":"S&oacute;lo se puede ingresar car&aacute;cteres"
                },
                {
                    "Validation":"8",
                    "RegEx":"^/+[a-z]+/+[a-zA-Z]+.aspx$",
                    "Message":"La direcci&oacute;n no coincide con una URL v&aacute;lida"
                },
                {
                    "Validation":"9",
                    "RegEx":"^[1-9]{3}-[0-9]{3}-[0-9]{4}$",
                    "Message":"No coincide el formato del n&uacute;mero telef&oacute;nico. Ej: 424-123-4567"
                }
            ],
            ApplyCssValidation: function () {
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.ApplyCssValidation()" ha cargado exitosamente'); }
                var styleRequerido = this.ClassCss.Css(".requerido");
                var head = document.getElementsByTagName("head");
                var tagHead = null;
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
            Container: function (idContainer) {
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.Container(idContainer)" ha cargado exitosamente'); }
                if (idContainer !== undefined && idContainer !== null && idContainer.length > 0) {
                    this._Container = document.getElementById(idContainer);
                } else {
                    this._Container = document;
                }
                this.Fields();
                return this._Container;
            },
            Fields: function () {
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.Fields()" ha cargado exitosamente'); }
                var content = this._Container;
                if (content === null) {
                    content = this.Container();
                }
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
                    if(!obj.hasAttribute("disabled") && obj.style.display===""){
                        var lblFeedBack = document.createElement("span");
                        lblFeedBack.id = "lblFeedBack_" + obj.id;
                        lblFeedBack.className = "FeedBackLabel";
                        obj.parentNode.insertBefore(lblFeedBack, obj.nextSibling);
                    }
                }
                var radios = content.querySelectorAll("input[type=radio]").ToArray();
                var radiosUniques = radios.Radios().FirstAtEachName();
                for (var i = 0; i < radiosUniques.length; i++) {
                    var obj = radiosUniques[i];
                    var lblFeedBack = document.createElement("span");
                    lblFeedBack.id = "lblFeedBack_" + obj.id;
                    lblFeedBack.className = "FeedBackLabel";
                    obj.parentNode.insertBefore(lblFeedBack, obj.nextSibling);
                }
                this._Fiedls = objects;
            },
            FireOn: {
                Input: {
                    NotAllowSpecialCharactersToStartAText: function () {
                        if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.NotAllowSpecialCharactersToStartAText()" ha cargado exitosamente'); }
                        var objs = this.parent.Validation._Fiedls;
                        var notAllowSpecialCharactersToStartATextMenssage = "&nbsp;No se permiten caracteres especiaes \" .,-@*+/_#$%&()\"'=?!¿¡ \" al inicio de este campo.";
                        for (var i = 0; i < objs.length; i++) {
                            var obj = objs[i];
                            if (obj.type === 'text' || obj.type === 'textarea') {
                                obj.oninput = function () {
                                    this.nextElementSibling.style.color = "green";
                                    var firstChart = this.value.substring(0, 1);
                                    var rEx = new RegExp('[.,-@*+/_#$%&()\"\'=?!¿¡]{1}');
                                    if (rEx.test(firstChart)) {
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
                    }
                },
                Blur:{
                    CheckRegExs:function () {
                        if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.FireOn.Blur.CheckRegExs()" ha cargado exitosamente'); }
                        var self = this;
                        var objs = this.parent.Validation._Fiedls;
                        for (var i = 0; i < objs.length; i++) {
                            var obj = objs[i];
                            if (obj.getAttribute("validation") !== null) {
                                obj.onblur = function () {
                                    this.nextElementSibling.innerHTML = "";
                                    var ex = self.parent.Validation.Pattern[this.getAttribute("validation")];
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
                },
                Copy: {
                    NotAllow: function () {
                        if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.NotAllowCommandCopy()" ha cargado exitosamente'); }
                        var objs = this.parent.Validation._Fiedls;
                        var disableCommandPasteMessage = "&nbsp;No se permiten usar la funci&oacute;n de Pegar (Ctrl+C), valores sobre este campo...";
                        for (var i = 0; i < objs.length; i++) {
                            var obj = objs[i];
                            if (obj.type === 'text' || obj.type === 'textarea') {
                                obj.oncopy = function (e) {
                                    e.preventDefault();
                                    this.nextElementSibling.style.color = "green";
                                    this.nextElementSibling.innerHTML = disableCommandPasteMessage;
                                };
                            }
                        }
                    }
                },
                Paste: {
                    NotAllow: function () {
                        if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.NotAllowCommandPaste()" ha cargado exitosamente'); }
                        var objs = this.parent.Validation._Fiedls;
                        var disableCommandPasteMessage = "&nbsp;No se permiten usar la funci&oacute;n de Pegar (Ctrl+V), valores sobre este campo...";
                        for (var i = 0; i < objs.length; i++) {
                            var obj = objs[i];
                            if (obj.type === 'text' || obj.type === 'textarea') {
                                obj.onpaste = function (e) {
                                    e.preventDefault();
                                    this.nextElementSibling.style.color = "green";
                                    this.nextElementSibling.innerHTML = disableCommandPasteMessage;
                                };
                            }
                        }
                    }
                },
                Cut: {
                    NotAllow: function () {
                        if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.NotAllowCommandPaste()" ha cargado exitosamente'); }
                        var objs = this.parent.Validation._Fiedls;
                        var disableCommandPasteMessage = "&nbsp;No se permiten usar la funci&oacute;n de Cortar (Ctrl+X), valores sobre este campo...";
                        for (var i = 0; i < objs.length; i++) {
                            var obj = objs[i];
                            if (obj.type === 'text' || obj.type === 'textarea') {
                                obj.oncut = function (e) {
                                    e.preventDefault();
                                    this.nextElementSibling.style.color = "green";
                                    this.nextElementSibling.innerHTML = disableCommandPasteMessage;
                                };
                            }
                        }
                    }
                }
            },
            Validate: function () {
                if (_Tracert) { console.log('metodo: "Jarvis.Utils.Validation.Validate()" ha cargado exitosamente'); }
                var objs = this._Fiedls;
                if (objs.length === 0) {
                    this.Fields();
                    objs = this._Fiedls;
                }
                if (this.ClassCss.Css(".requerido") === null) {
                    this.ApplyCssValidation();
                }
                var self = this;
                var requeridFieldMessage = "&nbsp;Este campo es requerido.";
                var validados = true;
                for (var i = 0; i < objs.length; i++) {
                    var obj = objs[i];
                    if (!obj.disabled && obj.style.display === "") {
                        if (!obj.hasAttribute("optional")) {
                            var tieneValorOSeleccionValida = (obj.value.length === 0 || parseInt(obj.value, 0) < 0);
                            if (tieneValorOSeleccionValida) {
                                validados = false;
                                this._Emptys.push(obj);
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
                    }
                }
                /* -------------------------------------------------------------------
                 * Radios se validan aparte por se diferente la lógica de validación
                 * ------------------------------------------------------------------- */
                var radios = document.querySelectorAll("input[type=radio]").ToArray();                
                var radiosUniques = radios.Radios().FirstAtEachName();
                for (var i = 0; i < radiosUniques.length; i++) {
                    var radiosNames = radios.Radios().DistinctName(radiosUniques[i].name);
                    var seleccionado = radios.Radios().SelectedItem(radiosNames);
                    if(seleccionado==null){
                        validados=false;
                        for (var o=0;o<radiosNames.length;o++) {
                            var obj=radiosNames[o];
                            obj.nextElementSibling.style.color="red";
                            obj.nextElementSibling.innerHTML = obj.nextElementSibling.innerHTML.replace('[Requerido]','') + "<small style='font-weight:bold;font-size:.9em'> [Requerido]</small>";
                        };
                    } else {
                        break;
                    }
                }
                return validados;
            }
        },
        _: function () {
            this.parent=namespace;
            this.Validation.parent = this;
            this.Validation.FireOn.Input.parent =this;
            this.Validation.FireOn.Blur.parent =this;
            this.Validation.FireOn.Copy.parent =this;
            this.Validation.FireOn.Paste.parent =this;
            this.Validation.FireOn.Cut.parent =this;
            delete this._;
            return this;
        }
    }._();
    Jarvis.prototype.UI = {
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
                var self = this;
                var btn = document.getElementById("CPH_BODY_btnEliminar");
                if (btn !== null){
                    btn.onclick = function (e) {
                        var _self=this;
                        e.preventDefault();
                        /* ----------------------------------------------------------------
                         * Si se requiere hacer una pregunta, y que luego de responder OK 
                         * continue el submit, se debe implementar el siguiente codigo
                         * CODIGO:
                         *
                            self.UI.Notificacion.Mensaje("Seguro hacer submit?",function () {          
                                var ok = self.Utils.Validation.Validate();
                                if(ok){                                      
                                    _self.onclick=function(){
                                        //TO-DO..
                                    };
                                    _self.click();
                                }                           
                            });
                         * ---------------------------------------------------------------- */ 
                        self.Notificacion.Mensaje("Seguro que desea eliminar el registro?",function () {                                                
                            _self.onclick=function(){};
                            _self.click();
                        }); 
                    };        
                }                                   
        },
        Paginador: {
            Contenedor: "",
            ItemsPorPagina: 0,
            MaximoPaginas: 0,
            EtiquetaACrear:"",
            AgregarClaseCss: "",
            Mostrar: function () {
                if (_Tracert) { console.log('metodo: "Jarvis.UI.Paginador.Mostrar()" ha cargado exitosamente'); }
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
                                elemento.href = "javascript:Jarvis.UI.Paginador.Mover('link" + c + "','pagina" + c + "')";
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
                if (_Tracert) { console.log('metodo: "Jarvis.UI.Paginador.Mover(nombrelink, nombrePagina)" ha cargado exitosamente'); }
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
                if (_Tracert) { console.log('metodo: "Jarvis.UI.Draggable.Iniciar(e)" ha cargado exitosamente'); }
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
                    document.onmousemove = this.Jarvis.UI.Draggable.Elemento;
                    return false;                
            },
            Elemento: function (e) {
                if (_Tracert) { console.log('metodo: "Jarvis.UI.Draggable.Elemento(e)" ha cargado exitosamente'); }
                if (!drag) { return };
                if (!e) { var e = window.event };
                targ.style.left = coordX + e.clientX - offsetX + 'px';
                targ.style.top = coordY + e.clientY - offsetY + 'px';
                return false;
            },
            Detener: function () {                
                if (_Tracert) { console.log('metodo: "Jarvis.UI.Draggable.Detener()" ha cargado exitosamente'); }
                drag = false;
            }
        },
        Notificacion: {                        
                Overlight: null,
                Box: null,
                OK:null,
                Cancel:null,
                Mensaje: function (mensaje, okCallback,hideCancel) {
                    var self = this;
                    this._();
                    this.Overlight.style.display = "block";   
                    this.Box.innerHTML = mensaje;
                    if(okCallback!==undefined){
                        this.Ok.onclick= function(){
                            if (typeof okCallback === 'function') {
                                var containCallback = okCallback.prototype.constructor.toString().indexOf("(callback)")>-1;
                                if(containCallback){
                                    okCallback(function(){
                                        self.Cancel.click();
                                        return true;        
                                    });
                                } else{
                                    okCallback();
                                    self.Cancel.click();
                                        return true;        
                                }
                            }                             
                        }
                    }
                    if(typeof hideCancel !== "undefined"){
                        this.Cancel.style.display="none";
                    } else {
                        this.Cancel.style.display="inline";
                    }
                },
                Css: function (className) {
                    var estyles = document.styleSheets[0];
                    if (estyles != null) {
                        var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
                        if (classes !== null && classes.length > 0) {
                            for (var x = 0; x < classes.length; x++) {
                                if (classes[x].selectorText == className) {
                                    return classes[x].cssText;
                                }
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                },
                _: function () {                
                    var styleOverlight = this.Css("#overlight");
                    if (styleOverlight == null) {
                        var head = document.getElementsByTagName("head");
                        styleOverlight = document.createElement("style");
                        styleOverlight.innerHTML = "#overlight{background-color:rgba(0,0,0,.7);position: fixed;width: 100%;height: 100%;left: 0;top:0;z-index:1}#boxNotificacion {position: relative;width: 50%;margin: 0 auto;top: 40%;background-color: rgb(250, 250, 250);z-index: 1;padding: 1em;font-family: Tahoma;font-size: 1.2em;} #boxHeaderNotificacion{position: relative;width: 50%;margin: 0 auto;top: 40%;background-color: rgb(250, 250, 250);z-index: 1;padding: .3em 1em;font-family: Tahoma;font-size: 1.2em;border-radius: .5em .5em 0 0;text-align: center;border-bottom: 2px solid;font-weight: bold;}#boxFooterNotificacion{position: relative;width: 50%;margin: 0 auto;top: 40%;background-color: rgb(250, 250, 250);z-index: 1;padding: .3em 1em;font-family: Tahoma;font-size: 1.2em;border-radius: 0 0 .5em .5em;text-align: center;border-bottom: 2px solid;font-weight: bold;border-top: 2px solid;}#boxFooterNotificacion>button{padding: 0.2em;margin: 2px .5em;width: 60px;}";
                        var tagHead = head[0];
                        tagHead.appendChild(styleOverlight);
                    }
                    this.Overlight = document.getElementById("overlight");
                    if (this.Overlight == null) {
                        var body = document.getElementsByTagName("body");
                        this.Overlight = document.createElement("div");
                        this.Overlight.id = "overlight";
                        this.Overlight.style.display = "none";                    
                        var tagBody = body[0];
                        tagBody.parentNode.insertBefore(this.Overlight, tagBody);
                    }
                    var header=document.getElementById("boxHeaderNotificacion");
                    if (header === null) {
                        header = document.createElement("p");
                        header.id="boxHeaderNotificacion";
                        header.innerHTML="Administrador";
                        this.Overlight.appendChild(header);
                    }
                    this.Box = document.getElementById("boxNotificacion");
                    if (this.Box === null) {
                        this.Box = document.createElement("div");
                        this.Box.id = "boxNotificacion";
                        this.Overlight.appendChild(this.Box)
                    }
                    var footer=document.getElementById("boxFooterNotificacion");
                    if (footer === null) {
                        footer = document.createElement("p");
                        footer.id="boxFooterNotificacion";                    
                        this.Overlight.appendChild(footer);
                    }
                    this.Ok=document.getElementById("boxOkBtnNotificacion");
                    if (this.Ok === null) {
                        this.Ok = document.createElement("button");
                        this.Ok.id="boxOkBtnNotificacion";
                        this.Ok.innerHTML="Ok";
                        footer.appendChild(this.Ok);
                    }
                    this.Cancel=document.getElementById("boxCancelBtnNotificacion");
                    if (this.Cancel === null) {
                        var self=this;
                        this.Cancel = document.createElement("button");
                        this.Cancel.id="boxCancelBtnNotificacion";
                        this.Cancel.innerHTML="Cancel";
                        this.Cancel.onclick=function(){                        
                            self.Overlight.style.display = "none";
                            self.Box.innerHTML = "";     
                            return false;                                       
                        };
                        footer.appendChild(this.Cancel);
                    }
                }
        },
        Tablas: {
            Crear: function (arrJSON,elemento) {

            var _table_ = document.createElement('table'),
            _tr_ = document.createElement('tr'),
            _th_ = document.createElement('th'),
            _td_ = document.createElement('td');

                _table_.classList.add("table", "table-condensed", "listado", "sortable");
                _table_.id = "listado";
                var table = _table_.cloneNode(false),
                    columns = addHeaders(arrJSON, table);
                var tbody = document.createElement('tbody');
                for (var i = 0, maxi = arrJSON.length; i < maxi; ++i) {
                    var tr = _tr_.cloneNode(false);
                    for (var j = 0, maxj = columns.length; j < maxj ; ++j) {
                        var td = _td_.cloneNode(false);
                        var cellValue = arrJSON[i][columns[j]];
                        if(j===0){
                            td.setAttribute("trigger",cellValue);
                        }
                        var fixValue=cellValue;
                        if(typeof cellValue === "boolean"){
                            fixValue =cellValue?"Si":"No";
                        }                        
                        td.appendChild(document.createTextNode(fixValue || ''));
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);

                function addHeaders(arrJSON, table) {
                    var thead = document.createElement('thead');
                    var columnSet = [],
                        tr = _tr_.cloneNode(false);
                    for (var i = 0, l = arrJSON.length; i < l; i++) {
                        for (var key in arrJSON[i]) {
                            if (arrJSON[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                                columnSet.push(key);
                                var th = _th_.cloneNode(false);
                                th.appendChild(document.createTextNode(key));
                                tr.appendChild(th);
                            }
                        }
                    }
                    thead.appendChild(tr);
                    table.appendChild(thead);
                    return columnSet;
                };
                //return table;
                elemento.innerHTML="";
                elemento.appendChild(table);
            },
            Busqueda: {
                CrearNodo: function (hijo) {
                    var node = document.createElement('span');
                    node.setAttribute('class', 'highlighted');
                    node.attributes['class'].value = 'highlighted';
                    node.appendChild(hijo);
                    return node;
                },
                Resaltar: function (term, container) {
                    for (var i = 0; i < container.childNodes.length; i++) {
                        var node = container.childNodes[i];
                        if (node.nodeType == 3) {
                            // Text node
                            var data = node.data;
                            var data_low = data.toLowerCase();
                            if (data_low.indexOf(term) >= 0) {
                                //term found!
                                var new_node = document.createElement('span');
                                node.parentNode.replaceChild(new_node, node);
                                var result;
                                while ((result = data_low.indexOf(term)) != -1) {
                                    new_node.appendChild(document.createTextNode(
                                                data.substr(0, result)));
                                    new_node.appendChild(this.CrearNodo(
                                                document.createTextNode(data.substr(
                                                        result, term.length))));
                                    data = data.substr(result + term.length);
                                    data_low = data_low.substr(result + term.length);
                                }
                                new_node.appendChild(document.createTextNode(data));
                            }
                        } else {
                            // Keep going onto other elements
                            this.Resaltar(term, node);
                        }
                    }
                },
                DesResaltar: function (container) {
                    for (var i = 0; i < container.childNodes.length; i++) {
                        var node = container.childNodes[i];
                        if (node.attributes && node.attributes['class']
                            && node.attributes['class'].value == 'highlighted') {
                            node.parentNode.parentNode.replaceChild(
                                    document.createTextNode(
                                        node.parentNode.innerHTML.replace(/<[^>]+>/g, "")),
                                    node.parentNode);
                            // Stop here and process next parent
                            return;
                        } else if (node.nodeType != 3) {
                            // Keep going onto other elements
                            this.DesResaltar(node);
                        }
                    }
                },
                Buscar: function (term, table) {
                    this.DesResaltar(table);
                    var terms = term.value.toLowerCase().split(" ");
                    var finded = false;
                    for (var r = 1; r < table.rows.length; r++) {
                        var display = '';
                        for (var i = 0; i < terms.length; i++) {
                            if (table.rows[r].innerHTML.replace(/<[^>]+>/g, "").toLowerCase()
                                .indexOf(terms[i]) < 0) {
                                display = 'none';
                            } else {
                                if (terms[i].length) this.Resaltar(terms[i], table.rows[r]);
                                finded = true;
                            }
                            table.rows[r].style.display = display;
                        }
                    }
                    /* -----------------------------------------
                     * Opcion de notificar al usuario cuando 
                     * no hay un registro encontrado.
                     * Jorge Torres: 11-01-2016
                     * ----------------------------------------*/
                    var obj = document.getElementById("filtro");
                    var lblFeedBack = document.getElementById("lblFeedBack_filtro");
                    if (lblFeedBack === null) {
                        var lblFeedBack = document.createElement("span");
                        lblFeedBack.id = "lblFeedBack_filtro";
                        lblFeedBack.id = "lblFeedBack_" + obj.id;
                        lblFeedBack.className = "FeedBackLabel";
                        obj.parentNode.insertBefore(lblFeedBack, obj.nextSibling);
                    }
                    lblFeedBack = document.getElementById("lblFeedBack_filtro");

                    if (!finded) {
                        lblFeedBack.innerHTML = "no hay registros que mostrar...";
                    } else {
                        lblFeedBack.innerHTML = "";
                    }
                },
                _: function () {
                    var self = this;
                    var tables = document.getElementsByTagName('table');
                    for (var t = 0; t < tables.length; t++) {
                        var element = tables[t];

                        if (element.attributes['class']
                            && element.attributes['class'].value == 'filterable') {

                            /* Here is dynamically created a form */
                            var form = document.createElement('form');
                            form.setAttribute('class', 'filter');
                            // For ie...
                            form.attributes['class'].value = 'filter';
                            var input = document.createElement('input');
                            input.onkeyup = function () {
                                self.Buscar(input, element);
                            }
                            form.appendChild(input);
                            element.parentNode.insertBefore(form, element);
                        }
                    }
                }
            },
            Ordenacion: {
                EuropeanDate: true,
                AlternateRowColors: true,
                SORT_COLUMN_INDEX: 0,
                THead: false,
                Compare: function (a, b) {
                    var a = parseFloat(a);
                    a = (isNaN(a) ? 0 : a);
                    var b = parseFloat(b);
                    b = (isNaN(b) ? 0 : b);
                    return a - b;
                },
                Alternate: function (table) {
                    // Take object table and get all it's tbodies.
                    var tableBodies = table.getElementsByTagName("tbody");
                    // Loop through these tbodies
                    for (var i = 0; i < tableBodies.length; i++) {
                        // Take the tbody, and get all it's rows
                        var tableRows = tableBodies[i].getElementsByTagName("tr");
                        // Loop through these rows
                        // Start at 1 because we want to leave the heading row untouched
                        for (var j = 0; j < tableRows.length; j++) {
                            var item = tableRows[j];
                            // Check if j is even, and apply classes for both possible results
                            if ((j % 2) == 0) {
                                if (!(item.className.indexOf('odd') == -1)) {
                                    item.className = item.className.replace('odd', 'even');
                                } else {
                                    if (item.className.indexOf('even') == -1) {
                                        item.className += " even";
                                    }
                                }
                            } else {
                                if (!(item.className.indexOf('even') == -1)) {
                                    item.className = item.className.replace('even', 'odd');
                                } else {
                                    if (item.className.indexOf('odd') == -1) {
                                        item.className += " odd";
                                    }
                                }
                            }
                        }
                    }
                },
                Trim: function (s) {
                    //Retorna un String con sin espacios en blanco innesarios
                    return s.replace(/^\s+|\s+$/g, "");
                },
                CleanNum: function (str) {
                    str = str.replace(new RegExp(/[^-?0-9.]/g), "");
                    return str;
                },
                SortDefault: function (a, b) {
                    var aa = this.InnerText(a.cells[this.SORT_COLUMN_INDEX]);
                    var bb = this.InnerText(b.cells[this.SORT_COLUMN_INDEX]);
                    if (aa == bb) {
                        return 0;
                    }
                    if (aa < bb) {
                        return -1;
                    }
                    return 1;
                },
                SortDate: function (date) {
                    // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
                    var dt = "00000000";
                    if (date.length == 11) {
                        var mtstr = date.substr(3, 3);
                        mtstr = mtstr.toLowerCase();
                        switch (mtstr) {
                            case "jan": var mt = "01"; break;
                            case "feb": var mt = "02"; break;
                            case "mar": var mt = "03"; break;
                            case "apr": var mt = "04"; break;
                            case "may": var mt = "05"; break;
                            case "jun": var mt = "06"; break;
                            case "jul": var mt = "07"; break;
                            case "aug": var mt = "08"; break;
                            case "sep": var mt = "09"; break;
                            case "oct": var mt = "10"; break;
                            case "nov": var mt = "11"; break;
                            case "dec": var mt = "12"; break;
                                // default: var mt = "00";
                        }
                        dt = date.substr(7, 4) + mt + date.substr(0, 2);
                        return dt;
                    } else if (date.length == 10) {
                        if (this.EuropeanDate == false) {
                            dt = date.substr(6, 4) + date.substr(0, 2) + date.substr(3, 2);
                            return dt;
                        } else {
                            dt = date.substr(6, 4) + date.substr(3, 2) + date.substr(0, 2);
                            return dt;
                        }
                    } else if (date.length == 8) {
                        yr = date.substr(6, 2);
                        if (parseInt(yr) < 50) {
                            yr = '20' + yr;
                        } else {
                            yr = '19' + yr;
                        }
                        if (this.EuropeanDate == true) {
                            dt = yr + date.substr(3, 2) + date.substr(0, 2);
                            return dt;
                        } else {
                            dt = yr + date.substr(0, 2) + date.substr(3, 2);
                            return dt;
                        }
                    }
                    return dt;
                },
                Parent: function (el, pTagName) {
                    if (el == null) {
                        return null;
                    } else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) {
                        return el;
                    } else {
                        return this.Parent(el.parentNode, pTagName);
                    }
                },
                ResortTable: function (lnk, clid) {
                    var self = this;
                    var span;
                    for (var ci = 0; ci < lnk.childNodes.length; ci++) {
                        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') {
                            span = lnk.childNodes[ci];
                        }
                    }
                    var spantext = this.InnerText(span);
                    var td = lnk.parentNode;
                    var column = clid || td.cellIndex;
                    var t = this.Parent(td, 'TABLE');
                    // Work out a type for the column
                    if (t.rows.length <= 1) return;
                    var itm = "";
                    var i = 0;
                    while (itm == "" && i < t.tBodies[0].rows.length) {
                        var itm = this.InnerText(t.tBodies[0].rows[i].cells[column]);
                        itm = this.Trim(itm);
                        if (itm.substr(0, 4) == "<!--" || itm.length == 0) {
                            itm = "";
                        }
                        i++;
                    }
                    if (itm == "") return;
                    var oCASEINSENTITIVE = 0, oDATE = 1, oNUMERIC = 2;
                    var sortfn = oCASEINSENTITIVE;
                    if (itm.match(/^\d\d[\/\.-][a-zA-z][a-zA-Z][a-zA-Z][\/\.-]\d\d\d\d$/)) { sortfn = oDATE; }
                    if (itm.match(/^\d\d[\/\.-]\d\d[\/\.-]\d\d\d{2}?$/)) { sortfn = oDATE; }
                    if (itm.match(/^-?[£$€Û¢´]\d/)) { sortfn = oNUMERIC; }
                    if (itm.match(/^-?(\d+[,\.]?)+(E[-+][\d]+)?%?$/)) { sortfn = oNUMERIC; }
                    this.SORT_COLUMN_INDEX = column;
                    var firstRow = new Array();
                    var newRows = new Array();
                    for (var k = 0; k < t.tBodies.length; k++) {
                        for (i = 0; i < t.tBodies[k].rows[0].length; i++) {
                            firstRow[i] = t.tBodies[k].rows[0][i];
                        }
                    }
                    for (var k = 0; k < t.tBodies.length; k++) {
                        if (!this.THead) {
                            // Skip the first row
                            for (var j = 1; j < t.tBodies[k].rows.length; j++) {
                                newRows[j - 1] = t.tBodies[k].rows[j];
                            }
                        } else {
                            // Do NOT skip the first row
                            for (var j = 0; j < t.tBodies[k].rows.length; j++) {
                                newRows[j] = t.tBodies[k].rows[j];
                            }
                        }
                    }

                    switch (sortfn) {
                        case oNUMERIC: {
                            newRows.sort(function (a, b) {
                                var aa = self.InnerText(a.cells[self.SORT_COLUMN_INDEX]);
                                aa = self.CleanNum(aa);
                                var bb = self.InnerText(b.cells[self.SORT_COLUMN_INDEX]);
                                bb = self.CleanNum(bb);
                                return self.Compare(aa, bb);
                            });
                            break;
                        }
                        case oDATE: {
                            newRows.sort(function (a, b) {
                                var dt1 = self.SortDate(self.InnerText(a.cells[self.SORT_COLUMN_INDEX]));
                                var dt2 = self.SortDate(self.InnerText(b.cells[self.SORT_COLUMN_INDEX]));
                                if (dt1 == dt2) {
                                    return 0;
                                }
                                if (dt1 < dt2) {
                                    return -1;
                                }
                                return 1;
                            });
                            break;
                        }
                        default: {
                            newRows.sort(function (a, b) {
                                var aa = self.InnerText(a.cells[self.SORT_COLUMN_INDEX]).toLowerCase();
                                var bb = self.InnerText(b.cells[self.SORT_COLUMN_INDEX]).toLowerCase();
                                if (aa == bb) {
                                    return 0;
                                }
                                if (aa < bb) {
                                    return -1;
                                }
                                return 1;
                            });
                        }

                    }

                    if (span.getAttribute("sortdir") == 'down') {
                        this.ARROW = '&nbsp;&nbsp;<b class="fa fa-caret-down"></b>';
                        //ARROW = '&nbsp;&nbsp;<img src="' + image_path + image_down + '" alt="&darr;"/>';
                        newRows.reverse();
                        span.setAttribute('sortdir', 'up');
                    } else {
                        this.ARROW = '&nbsp;&nbsp;<b class="fa fa-caret-up"></b>';
                        //ARROW = '&nbsp;&nbsp;<img src="' + image_path + image_up + '" alt="&uarr;"/>';
                        span.setAttribute('sortdir', 'down');
                    }
                    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
                    // don't do sortbottom rows
                    for (var i = 0; i < newRows.length; i++) {
                        if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) {
                            t.tBodies[0].appendChild(newRows[i]);
                        }
                    }
                    // do sortbottom rows only
                    for (var i = 0; i < newRows.length; i++) {
                        if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1))
                            t.tBodies[0].appendChild(newRows[i]);
                    }
                    // Delete any other arrows there may be showing
                    var allspans = document.getElementsByTagName("span");
                    for (var ci = 0; ci < allspans.length; ci++) {
                        if (allspans[ci].className == 'sortarrow') {
                            if (this.Parent(allspans[ci], "table") == this.Parent(lnk, "table")) { // in the same table as us?
                                allspans[ci].innerHTML = '&nbsp;&nbsp;';
                                //allspans[ci].innerHTML = '&nbsp;&nbsp;<img src="' + image_path + image_none + '" alt="&darr;"/>';
                            }
                        }
                    }
                    span.innerHTML = this.ARROW;
                    this.Alternate(t);
                },
                InnerText: function (el) {
                    if (typeof el == "string") { return el; }
                    if (typeof el == "undefined") { return el };
                    if (el.innerText) { return el.innerText; }
                    var str = "";
                    var cs = el.childNodes;
                    var l = cs.length;
                    for (var i = 0; i < l; i++) {
                        switch (cs[i].nodeType) {
                            case 1: //ELEMENT_NODE
                                str += this.InnerText(cs[i]);
                                break;
                            case 3: //TEXT_NODE
                                str += cs[i].nodeValue;
                                break;
                        }
                    }
                    return str;
                },
                MakeSortable: function (t) {
                    if (t.rows && t.rows.length > 0) {
                        if (t.tHead && t.tHead.rows.length > 0) {
                            var firstRow = t.tHead.rows[t.tHead.rows.length - 1];
                            this.THead = true;
                        } else {
                            var firstRow = t.rows[0];
                        }
                    }
                    if (!firstRow) { return; }
                    // We have a first row: assume it's the header, and make its contents clickable links
                    for (var i = 0; i < firstRow.cells.length; i++) {
                        var cell = firstRow.cells[i];
                        var txt = this.InnerText(cell);
                        if (cell.className != "unsortable" && cell.className.indexOf("unsortable") == -1) {
                            //cell.innerHTML = '<a href="#" class="sortheader" onclick="Jarvis.UI.Tablas.Ordenacion.ResortTable(this, ' + i + ');return false;">' + txt + '<span class="sortarrow">&nbsp;&nbsp;</span></a>';
                            cell.innerHTML = '<a href="#" class="sortheader" sort="' + i + '">' + txt + '<span class="sortarrow">&nbsp;&nbsp;</span></a>';
                            //cell.innerHTML = '<a href="#" class="sortheader" onclick="ts_resortTable(this, ' + i + ');return false;">' + txt + '<span class="sortarrow">&nbsp;&nbsp;<img src="' + image_path + image_none + '" alt="&darr;"/></span></a>';
                        }
                    }
                    if (this.AlternateRowColors) {
                        this.Alternate(t);
                    }
                },
                _: function () {
                    var self = this;
                    if (!document.getElementsByTagName) { return; }
                    var tbls = document.getElementsByTagName("table");
                    for (var ti = 0; ti < tbls.length; ti++) {
                        var thisTbl = tbls[ti];
                        if (((' ' + thisTbl.className + ' ').indexOf("sortable") != -1) ) {
                            this.MakeSortable(thisTbl);
                        }
                    }
                    var trSort = document.getElementsByClassName("sortheader");
                    if (trSort !== null) {
                        for (var i = 0; i < trSort.length; i++) {
                            trSort[i].onclick = function () {
                                self.ResortTable(this, this.getAttribute("sort"));
                                return false;
                            }
                        }
                    }
                }
            }
        },
        _: function () {
            this.parent = namespace;
            this.Tablas.parent = this;
            this.Tablas.Busqueda.parent = this.Tablas;
            this.Tablas.Ordenacion.parent = this.Tablas;
            delete this._;
            return this;
        }
    }._();
    Jarvis.prototype.Runtime = function (starTime) {
        if (_Tracert) { console.log('metodo: "Jarvis.Runtime(starTime)" ha cargado exitosamente'); }
        return (((new Date() - starTime) / 1000).toFixed(2) + " segundos...");
    };

    /*----------------------------
     * Métodos por Deprecar
     *----------------------------*/   
    Jarvis.prototype.Obtener = function (url, parametros, callback) {
        var self = this;
        var e = "[deprecated] Jarvis.Obtener(url, parametros, callback) está Obsoleto, por favor usar Jarvis.Utils.Callback(url, parametros, callback). Este metodo será removido en futuras versiones.";
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
        Object.defineProperty(Jarvis.prototype, "Resultado", {
            get: function Resultado() {
                return _Result;
            }
        });
        Object.defineProperty(Jarvis.prototype, "StartTime", {
            get: function Resultado() {
                return _StartTime;
            }
        });
        Object.defineProperty(Jarvis.prototype, "Tracert", {
            get: function Tracert() {
                return _Tracert;
            },
            set: function Tracert(value) {
                _Tracert = value;
            }
        });
        
        /* -------------------------------------------------------------------
             * Extendiendo objetos propios del JavaScript, 
             * para mejorar la programación de los métodos propios 
             * ------------------------------------------------------------------- */
             Object.defineProperty(Object.prototype, "Type", {
                get: function() {
                    return this.constructor.name;
                }
             });
             HTMLCollection.prototype.ToArray=function(){
                if (_Tracert) { console.log('metodo: "HTMLCollection.ToArray()", ha cargado exitosamente'); }
                if (_Info) { console.log('info: "HTMLCollection.ToArray()", retorna un Array, a partir de un HTMLCollection'); }
                var arr=[];
                for (var i = this.length - 1; i >= 0; i--) {
                    arr.push(this[i]);
                };
                return arr;             
             };
             NodeList.prototype.ToArray=function(){
                if (_Tracert) { console.log('metodo: "NodeList.ToArray()", ha cargado exitosamente'); }
                if (_Info) { console.log('info: "NodeList.ToArray()", retorna un Array, a partir de un NodeList'); }
                var arr=[];
                for (var i = this.length - 1; i >= 0; i--) {
                    arr.push(this[i]);
                };
                return arr;             
             };
             String.prototype.ToTitleCase = function () {
            var i, j, str, lowers, uppers;
            str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });

            // Certain minor words should be left lowercase unless 
            // they are the first or last words in the string
            lowers = ['El', 'En', 'Lo', 'Con', 'Un', 'La', 'Los', 'De', 'Desde', 'Hasta', 'Del', 'Las'];
            for (i = 0, j = lowers.length; i < j; i++)
                str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
                  function (txt) {
                      return txt.toLowerCase();
                  });

            // Certain words such as initialisms or acronyms should be left uppercase
            uppers = ['Id', 'Tv'];
            for (i = 0, j = uppers.length; i < j; i++)
                str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
                  uppers[i].toUpperCase());

            return str;
        }
             Array.prototype.Radios = function () {
                var arr = this;
                var _ = {
                    SelectedItem:function(arr){
                        if (_Tracert) { console.log('metodo: "Array.Radios().SelectedItem()", ha cargado exitosamente'); }
                        if (_Info) { console.log('info: "Array.Radios().SelectedItem()", retorna el elemento tipo Radios seleccionado'); }
                        var obj=null;
                        for (var i = arr.length - 1; i >= 0; i--) {
                            if(arr[i].checked){
                                obj= arr[i];
                                break;
                            }
                        }
                        return obj;
                    },
                    DistinctName: function (sName) {
                        if (_Tracert) { console.log('metodo: "Array.Radios().DistinctName(sName)", ha cargado exitosamente'); }
                        if (_Info) { console.log('info: "Array.Radios().DistinctName(sName)", retorna un arreglo de elementos Radios filtrados por su propiedad Name comparado por el parametro sName'); }
                        var a = [];
                        for (var i = 0, l = arr.length; i < l; ++i) {
                            if (arr[i].name === sName) {
                                a.push(arr[i]);
                            }
                        }
                        return a;
                    },
                    Distinct: function () {
                        if (_Tracert) { console.log('metodo: "Array.Radios().Distinct()", ha cargado exitosamente'); }
                        if (_Info) { console.log('info: "Array.Radios().Distinct()", retorna un arreglo de string con los nombre unicos del arreglo'); }
                        var u = {}, a = [];
                        for (var i = 0, l = arr.length; i < l; ++i) {
                            if (u.hasOwnProperty(arr[i].name)) {
                                continue;
                            }
                            a.push(arr[i].name);
                            u[arr[i].name] = 1;
                        }
                        return a;
                    },
                    FirstAtEachName: function () {
                        if (_Tracert) { console.log('metodo: "Array.Radios().FirstAtEachName()", ha cargado exitosamente'); }
                        if (_Info) { console.log('info: "Array.Radios().FirstAtEachName()", retorna un arreglo de elementos Radios tomando el primer elemento de cada sub arreglo'); }
                        var u = {}, a = [];
                        for (var i = 0, l = arr.length; i < l; ++i) {
                            if (u.hasOwnProperty(arr[i].name)) {
                                continue;
                            }
                            a.push(arr[i]);
                            u[arr[i].name] = 1;
                        }
                        return a;
                    }
                };
                return _;
            };
             Array.prototype.DistinctName=function(sName){
                    var self = this;
                    var e = "[deprecated] Array.DistinctName(sName) está Obsoleto, por favor usar Array.Radios().DistinctName(sName). Este metodo será removido en futuras versiones.";
                    if (!this.Radios().DistinctName) { throw (e); }
                    (this.DistinctName = function (sName) {
                        console.log(e);
                        self.Radios().DistinctName(sName);
                    })();
                };
             Array.prototype.Distinct=function(){
                    var self = this;
                    var e = "[deprecated] Array.Distinct() está Obsoleto, por favor usar Array.Radios().Distinct(). Este metodo será removido en futuras versiones.";
                    if (!this.Radios().Distinct) { throw (e); }
                    (this.Distinct = function () {
                        console.log(e);
                        self.Radios().Distinct();
                    })();
                };
             Array.prototype.FirstAtEachName=function(){
                    var self = this;
                    var e = "[deprecated] Array.FirstAtEachName() está Obsoleto, por favor usar Array.Radios().FirstAtEachName(). Este metodo será removido en futuras versiones.";
                    if (!this.Radios().FirstAtEachName) { throw (e); }
                    (this.FirstAtEachName = function () {
                        console.log(e);
                        self.Radios().FirstAtEachName();
                    })();
                };
            Array.prototype.Add=function(item){
                this.push(item);
            };
            Array.prototype.First=function(){
                return this[0];
            };
            Array.prototype.Last=function(){
                return this[this.length-1];
            };
            Array.prototype.Delete=function(index){
                this.splice(index,1);       
            };
            Array.prototype.Item=function(index){
                return this[index];
            }
            Array.prototype.Query=function(expresion){
                var terminos=expresion.match(/([A-Z]{1}\w+)([>=|<=|>|<|==]{1,2})(\w+)/);
                if(!terminos){
                    throw "La Condicion de busqueda no coincide con el patron requerido, por favor verifique que la expresion este correcta, y vuelva a intentarlo.";
                }
                var index=this.Find(terminos[1],terminos[3],terminos[2]);
                return this.Item(index);
            };
            Array.prototype.Find=function(columnName,keyToFind,condition){
                for (var i = 0; i < this.length; i++) {
                    var item=this[i];
                    if(!item.hasOwnProperty(columnName)){
                        return false;
                    }
                    if(item[columnName]==keyToFind){
                        return i
                    }
                }           
            };
            Array.prototype.Distinct= function (column,value) {
                if (_Tracert) { console.log('metodo: "Array.Radios().Distinct()", ha cargado exitosamente'); }
                if (_Info) { console.log('info: "Array.Radios().Distinct()", retorna un arreglo de string con los nombre unicos del arreglo'); }
                
                if(typeof value ==="undefined"){
                    var u = {}, a = [];
                    for (var i = 0, l = this.length; i < l; ++i) {
                        if (u.hasOwnProperty(this[i][column])) {
                            continue;
                        }
                        a.push(this[i][column]);
                        u[this[i][column]] = 1;
                    }
                    return a;
                } else {
                    var a = [];
                    for (var i = 0, l = this.length; i < l; ++i) {
                        if (this[i][column] === value) {
                            a.push(this[i]);
                        }
                    }
                    return a;
                }
            };
            Array.prototype.ForEach = function (callback) {
            for (var i = 0; i < this.length; i++) {
                callback(this[i]);
            };
        };
          
     } catch(err) {
        console.log("this explorer no support definition the properties") ;
     }
    /*----------------------------
     * Para Usar como plantilla para nuevos metodos, metodos obsoletos y/o propiedades 
     *----------------------------*/   
    /* 
        Jarvis.prototype.SUB_NAMESPACE = {
            METODO1: function () {
            },
            SUBCLASE: {
                METODO1: function () { },
                METODO2: function () { }
            }
        };
        Jarvis.prototype.NuevoMetodo = function (callback) {
            if (_Tracert) { console.log('metodo: "Jarvis.NuevoMetodo()" ha cargado exitosamente'); }
            var STARTTIME = new Date();
            var self = this;

            if (typeof callback === 'function') {
                callback();
            }

            if (_Tracert) { console.log('"Jarvis.NuevoMetodo()" realizado en ' + this.Runtime(STARTTIME)); }
        };
        //Marcar Método Obsoleto
        Jarvis.prototype.MetodoObsoleto = function () {
            var self = this;
            var e = "[deprecated] MetodoObsoleto está Obsoleto y será removido en futuras versiones. Usar el siguiente método NOMBRE_NUEVO_METODO";
            if (!this.NOMBRE_NUEVO_METODO) { throw (e); }
            (this.MetodoObsoleto = function () {
                console.log(e);
                self.NOMBRE_NUEVO_METODO();
            })();
        }
        Object.defineProperty(Jarvis.prototype, "Propiedad", {
            get: function Propiedad() {
                return myVariable;
            },
            set: function Propiedad(value) {
                unidad = myVariable;
            }
        });
    */
    namespace.Jarvis = new Jarvis();
    //return namespace.Jarvis;
    if (typeof namespace.$ === "undefined") {
        if (_Tracert) { console.log('metodo: "namespace.$(id)", ha cargado exitosamente'); }
        if (_Info) { console.log('info: "namespace.$(id)", retorna un object HTML a partir de su Id'); }
        namespace.$ = function (id) {
            var x = [];
            x.push(document.getElementById(id.replace('#', '')));
            return x;
        }
    }
    if (typeof namespace.console === "undefined") {
        if (_Tracert) { console.log('metodo: "namespace.console.log(msj)", ha cargado exitosamente'); }
        if (_Info) { console.log('info: "namespace.console.log(msj)", permite activar la consola para IE7, pero mostrará una alerta en lugar de escribir en la consola'); }        
        namespace.console={
            log: function (msj) {
                alert(msj);
            }
        };
    }
    if (typeof document.getElementsByClassName === "undefined") {
        if (_Tracert) { console.log('metodo: "document.getElementsByClassName(cl)", ha cargado exitosamente'); }
        if (_Info) { console.log('info: "document.getElementsByClassName(cl)", retorna una HTMLCollection de objetos a partir de una class, fix para IE7, ya que no cuenta IE7 con este metodo nativo'); } 
        document.getElementsByClassName = function (cl) {
            var retnode = [];
            var elem = this.getElementsByTagName('*');
            for (var i = 0; i < elem.length; i++) {
                if((' ' + elem[i].className + ' ').indexOf(' ' + cl + ' ') > -1) retnode.push(elem[i]);
            }
            return retnode;
        }; 
    }
    if (typeof namespace._ === "undefined") {
        if (_Tracert) { console.log('metodo: "namespace._(id)", ha cargado exitosamente'); }
        if (_Info) { console.log('info: "namespace._(id)", metodo abreviado de getElementById(), retorna un objeto a partir de su Id'); } 
        namespace._ = function (id) {
            //Funcion que retorna un objeto a partir de su id, para no usar el document.getElementById(), por FLOJERAAAA
            var item = $("#" + id)[0];
            if (item !== null) {
                return item;
            } else {
                return null;
            }
        };
    }
    if (typeof namespace.__ === "undefined") {
        if (_Tracert) { console.log('metodo: "namespace._(id)", ha cargado exitosamente'); }
        if (_Info) { console.log('info: "namespace._(id)", metodo abreviado de getElementById(), retorna un objeto a partir de su Id'); }
        namespace.__ = function (selector) {
            //Funcion que retorna un objeto a partir de su id, para no usar el document.getElementById(), por FLOJERAAAA
            var items = document.querySelectorAll(selector);
            return items.ToArray();
            //if (items.length == 1) {
            //    return items[0];
            //} else if (items.length > 1) {
            //    var _ = {
            //        ForEach: function (callback) {
            //            for (var i = 0; i < items.length; i++) {
            //                callback(items[i]);
            //            };
            //        },
            //        First: function () {
            //            return items[0];
            //        },
            //        Last: function () {
            //            return items[items.length - 1];
            //        },
            //        Items: function () {
            //            return items;
            //        }
            //    }
            //    return _;
            //} else {
            //    return null;
            //}
        };
    }
})(window || {});   
