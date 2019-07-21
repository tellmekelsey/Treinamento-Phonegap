document.addEventListener("deviceready", this.onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
}

function onOffline() {
    // alert('Você está offline!');
    Snackbar.show({
        duration: null,
        text: 'Você está offline!',
        pos: 'top-center',
        backgroundColor: '#f6685e',
        actionText: 'Fechar',
        actionTextColor: '#323232'
    });
}

function onOnline() {
    // alert('Você está online!');
    Snackbar.show({
        text: 'Conectado à Internet!',
        pos: 'top-center',
        textColor: '#323232',
        backgroundColor: '#8bc34a',
        actionText: 'Fechar',
        actionTextColor: '#FFF'
    });
}

var nucleoBacksite = {
    actionUrl: function (url, params, debug, funcaoCallback) {
        if(navigator.onLine){
            try{
                var call = $.ajax({
                    async: true,
                    url: url,
                    type:'POST',
                    data:params
                }).done(function(data){
                    funcaoCallback.call(this, data);

                }).fail(function (jqXHR, textStatus) {
                    if(localStorage.getItem('protocol') == undefined){
                        localStorage.setItem('protocol', 'https://')
                        __dm = 'http://';
                    }else if(localStorage.getItem('protocol') == 'https://'){
                        localStorage.setItem('protocol', 'http://')
                        __dm = 'http://';
                    }else if(localStorage.getItem('protocol') == 'http://'){
                         localStorage.setItem('protocol', 'https://')
                        __dm = 'https://';
                    }
                    if(url.match('^https://')){
                        var auxDomain = url.replace(/^https:\/\//i, '');
                    }
                    else{
                        var auxDomain = url.replace(/^http:\/\//i, '');
                    }

                    nucleoBacksite.actionUrl(__dm+''+auxDomain, params, debug, funcaoCallback);
                });     
            }catch(e){
            }
        }else{
            nucleoBacksite.tratamentoLoad();
            throw new Error("Houve uma dificuldade ao acessar os dados no servidor");
        }
    },
    msg: function(m) {
        $('.alert').html(m);
        $('.mensagem').show();
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
        return false;
    },
    msgSemScroll: function(m) {
        $('.alert').html(m);
        $('.mensagem').show();
        return false;
    },      
    verificacaoDeErros: function (code, error) {
        code = parseInt(code);
        if (code == null || code == undefined || Number.isNaN(code) == true) {
            // nucleoBacksite.tratamentoLoad();
        } else {
            switch (code) {
                case 300:
                    window.location.href = "../loginCorp/login.html";
                    break;
                case 305:
                    window.location.href = "../loginCorp/login.html";
                    break;
                case 404:
                    var executed = false;
                    nucleoBacksite.msg('Requisição não encontrada!');
                    break;
                case 417:
                    console.log(error)
                    if (error != undefined) {
                        if (error.pt != undefined)
                            nucleoBacksite.alert('Error#417 - ' + error.pt);
                        else
                            nucleoBacksite.alert('Error#417 - ' + error);
                    } else {
                        nucleoBacksite.tratamentoLoad();
                    }
                    break;
                case 500:
                    // nucleoBacksite.msg('Error#500 - Servidor indisponível!');
                    nucleoBacksite.tratamentoLoad();
                    // $.unblockUI();
                    break;
            }
        }
    },
    tratamentoLoad: function() {
        // window.plugins.spinnerDialog.hide();
        navigator.notification.confirm('Houve uma dificuldade ao acessar os dados no servidor, verifique sua internet. ', onConfirm, 'Alerta!', ['Voltar', 'Tentar Novamente']);

        function onConfirm(buttonIndex) {
            if (buttonIndex == 1)
                history.go(-1);
            else
                location.reload();
        }
    },
    envioJSON: function(elementos){
    /*
    var elemento = array do tipo string;
    @param:     Verifica o elemento ou o conjunto de elementos que for especificado, há a necessidade de determinar a ultima
                classe do elemento como sendo a que você passará para o ajax, para que atenda o padrão de data, conforme exemplificado no @return.
    @use:       Para utilizar está função basta determinar a última classe do elemento como sendo o nome da variavel que irá passar para o php, e no seu evento
                passar uma string separada por virgulas com os elementos que deseja passar, lembrando que é necessário estar em um form.
    @example:   chamando a função => envioJSON(elementoPai,input, textarea);
                elemento => <input type="text" class="classeEstilo minhaVariavelPHP"> (no caso o nome que passará no $_REQUEST, $_POST, $_GET);
    @author:    Marcos Henrique.
    @date:      19/02/2016
    @return:    dados ex:(param1=valor1&param2=valor2).

    */
    var vazio =[];
        //dados       = new Array(); -> array
        var jsonData    = {}; // -> object
        var elementos   = elementos.replace(" ","");
        var elementos   = elementos.split(',');
        var container   = elementos.shift();
        var qtdEl       = elementos.length;
        var lastVal     = '';
        var lastClass   = '';
        for(var i=0; i<qtdEl;i++)
        {
            var listar = elementos[i];
            $(container).find(listar).each(function(i, el)
            {   
                var atributo    = $(this).attr('class');
                var tipo        = $(this).attr('type');
                //caso queira ignorar algum input, basta colocar o tipo, ou o nome da classe aqui em baixo.
                if((tipo != 'submit')&&(tipo !='button')&&(tipo !='checkbox')&&(tipo !='radio'))
                {
                    atributo    = atributo.split(' ');
                    lastClass   = atributo.pop();
                    if(tipo=='radio')
                    {
                       if(lastClass.is(':checked'))
                        lastVal = $(this).val();
                    }
                    else if(tipo == 'datetime-local') 
                    {
                        lastVal     = $(this).val().replace("T"," ")+':00';
                    }
                    else
                    {
                        lastVal     = $(this).val();
                    }
                    /*lastString  = lastClass+'='+lastVal; -> para criar um array com retorno como o da legenda.
                    dados.push(lastString); -> adiciona os valores ao array.
                    */
                    jsonData[lastClass] = lastVal;
                    if(lastVal=='')
                    {
                        vazio.push({nome:this.getAttribute('name'),classe:lastClass});
                    }
                }
            });
        }
        if(vazio.length==0)
        {
            /*dados = dados.join(',');
            return dados;
            @return: ARRAY
            */
            return jsonData
        }
        else
        {
            nucleoBacksite.msgSemScroll('Preencha o campo: '+vazio[0].nome);
            $('.'+vazio[0].classe).css('border-color','red');
            //scrolar até o elemento faltante
            $('html, body').animate({
                scrollTop: $('.'+vazio[0].classe).offset().top-200
            }, 400);
            return false
        }   
    },
    isAndroid:function(){
        var devicePlatform = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
        if (devicePlatform  == "iPhone" || devicePlatform =="iPad")
            return false;
        else
            return true;
    },
    toast:function(m, d){
        window.plugins.toast.showWithOptions({
                message: m,
                duration: d,
                position: "bottom",
                addPixelsY: -50
            },
        );                       
    },
    navAlert: function(titulo, msg, funcao) {
        function onConfirm() {
            funcao.call();
        }
        navigator.notification.alert(msg, onConfirm, titulo, ['Ok']);
    },
    navConfirm: function(titulo, msg, btnIndex1, btnIndex2, funcao, funcaoElse) {
        navigator.notification.confirm(msg, onConfirm, titulo, [btnIndex1, btnIndex2]);

        function onConfirm(btnIndex) {
            if (btnIndex == 2) {
                funcao.call();
            } else {
                funcaoElse.call();
            }
        }
    },
    encriptaDados: function(dados){
        var mensx="";
        var l;
        var i;
        var j=0;
        var ch;
        ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";
        for (i=0;i<dados.length; i++){
            j++;
            l=(nucleoBacksite.Asc(dados.substr(i,1))+(nucleoBacksite.Asc(ch.substr(j,1))));
            if (j==50){
                j=1;
            }
            if (l>255){
                l-=256;
            }
            mensx+=(nucleoBacksite.Chr(l));
        }
        return mensx;
    },
    Asc: function(String){
        return String.charCodeAt(0);
    },
    Chr: function(AsciiNum){
        return String.fromCharCode(AsciiNum)
    },
    descriptaDados: function(dados){
        var mensx="";
        var l;
        var i;
        var j=0;
        var ch;
        ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";
        for (i=0; i<dados.length;i++){
            j++;
            l=(nucleoBacksite.Asc(dados.substr(i,1))-(nucleoBacksite.Asc(ch.substr(j,1))));
            if (j==50){
                j=1;
            }
            if (l<0){
                l+=256;
            }
            mensx+=(nucleoBacksite.Chr(l));
        }
        return mensx;
    },
    imgBG: function () {
        var _p = {
            device: sessao.get()
        }
        var result = bs.actionUrl(dominio.complete() + 'padrao.tema.php', _p);
        if (result.tema.logo_scorecard != "") {
            // document.getElementById('bsBannerLogo').style.backgroundImage = "url( data:image/png;base64," + result.tema.logo_scorecard + ")";
            document.getElementById('bsBannerCapa').style.backgroundImage = "url( data:image/png;base64," + result.tema.plano_fundo + ")";
            localStorage.setItem('imgLocal', 1);
            localStorage.setItem('corpScoreCard', result.tema.plano_fundo);
            // localStorage.setItem('corpLogo', result.tema.logo_scorecard);
        }
    },
    carregaImg: function(url,vetIds, vetClasses) {
        var avatar = new Image();

        avatar.onload = function() {
            for (var i in vetIds) {
                var elemento = document.getElementById(vetIds[i]);
                if(elemento.nodeName == "DIV"){
                    elemento.style.backgroundImage = 'url(' + avatar.src + ')';
                }
                else if(elemento.nodeName == "IMG"){
                    elemento.src = avatar.src;
                }     
                if(vetClasses[i] == '' || vetClasses[i] == [] || vetClasses[i] == {} || vetClasses[i] == null || vetClasses[i] == undefined)
                    elemento.classList.add('NoClass');   
                else
                    elemento.classList.add(vetClasses[i]);
            }
        };
        avatar.src = url;
    },
    playAudio: function(musica) {
        window.ad = new Audio('assets/sounds/'+musica);
        ad.id = 'playAudio';
        ad.autoplay = true;
        ad.play();
    },
    //DOWNLOAD MULTIMIDIA----------------------------------------------------------------------------------
    salvarImagem: function(uUrl,uAlbum){
        cordova.plugins.photoLibrary.saveImage(uUrl, uAlbum, 
            function (libraryItem) {
                nucleoBacksite.navAlert('Sucesso','Imagem salva!',
                    function(){
                        //Callback do alerta
                   }
                );
            }, 
            function (err) {
                //se o erro for de permissão
                if (err.startsWith('Permission')) {
                // chama o requestAuthorization, e tenta novamente
                    cordova.plugins.photoLibrary.requestAuthorization(
                        function () {
                            // Usuario deu permissão, então tenta salvar de novo
                            nucleoBacksite.salvarImagem(uUrl,uAlbum);
                        },
                        function (err) {
                            // Usuario negou acesso
                        },
                        {
                            read: true,
                            write: true
                        }
                    );
                }
                else{
                    alert('erro: '+err);
                }                
            }
        );
    },
    salvarVideo: function(uUrl,uAlbum){
        cordova.plugins.photoLibrary.saveVideo(uUrl, uAlbum, 
            function () {
                nucleoBacksite.navAlert('Sucesso','Vídeo salvo!',
                    function(){
                        //Callback do alerta
                    }
                );
            }, 
            function (err) {
                //se o erro for de permissão
                if (err.startsWith('Permission')) {
                // chama o requestAuthorization, e tenta novamente
                    cordova.plugins.photoLibrary.requestAuthorization(
                        function () {
                            // Usuario deu permissão, então tenta salvar de novo
                            nucleoBacksite.salvarVideo(uUrl,uAlbum);
                        },
                        function (err) {
                            // Usuario negou acesso
                        },
                        {
                            read: true,
                            write: true
                        }
                    );
                }
                else{
                    alert('erro: '+err);
                }
            }
        );
    },
    //GPS------------------------------------------------------------------
    permissionGps: function() {
        cordova.plugins.diagnostic.isLocationAvailable(
            function(available){
                if(available)
                    nucleoBacksite.getPositionGps();
                else
                    nucleoBacksite.requestPermissionGps();
            }, function(error){
                nucleoBacksite.requestPermissionGps();
            }, false
        );
    },
    requestPermissionGps: function() {
        cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
            switch(status){
                case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                    console.log("Permissão não solicitada");
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED:
                    console.log("Permissão negada");
                    break;
                case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                    nucleoBacksite.altaPrecisaoGps();                            
                    // getPositionGps();
                    break;
                case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                    console.log("Permissão concedida somente quando em uso");
                    break;
            }
        }, function(error){
            console.error(error);
        }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);                
    },    
    altaPrecisaoGps: function() {
        cordova.plugins.locationAccuracy.canRequest(function(canRequest){
            if(canRequest){
                cordova.plugins.locationAccuracy.request(function (success){
                    if (!window.location.hash) {
                        window.location = window.location + '#loaded';
                        window.location.reload();
                    }                            
                    getPositionGps();
                }, 
                function (error){
                    if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                        if(window.confirm("Falha ao aplicar modo de 'Alta Precisão'. Você gostaria de ir para as configurações do GPS e alterar manualmente?")){
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            }
        });
    },
    getPositionGps: function() {
        navigator.geolocation.watchPosition(onSuccess, onError,{
            enableHighAccuracy: true,
            priority: navigator.geolocation.PRIORITY_HIGH_ACCURACY 
        });

        function onSuccess(position){
            sucessoGps(position);       
        }

        function onError(error){
            nucleoBacksite.navAlert('Ocorreu algum erro que impossibilitou de obtermos sua localização!','Alerta!',
                function(){
                    //Callback do alerta
               }
            );
        }
    },
    //CEMERA---------------------------------------------------------------
    permissaoCamera: function() {
        if (nucleoBacksite.isAndroid()) {
            cordova.plugins.diagnostic.isCameraAuthorized({
                successCallback: function(authorized) {
                    if (!authorized) {
                        cordova.plugins.diagnostic.requestCameraAuthorization({
                            reqSuccess: function(status) {
                                console.log("Authorization request for camera use was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
                            },
                            reqError: function(error) {
                                alert(error);
                            },
                            externalStorage: true
                        });
                    }
                },
                errorCallback: function(error) {
                    alert("The following error occurred: " + error);
                },
                externalStorage: true
            });
        }
    },
    //MICROFONE---------------------------------------------------------------
    initializeMicrophone: function(){
        window.objectURL = null;
        // Capture configuration object
        window.captureCfg = {};
        // Audio Buffer
        window.audioDataBuffer = [];
        // Timers
        window.timerInterVal;
        window.timerGenerateSimulatedData;
        // Info/Debug
        window.totalReceivedData = 0;
        // URL shim
        window.URL = window.URL || window.webkitURL;

        window.addEventListener('audioinput', onAudioInputCapture, false);
        window.addEventListener('audioinputerror', onAudioInputError, false);

        //Called continuously while AudioInput capture is running.
        function onAudioInputCapture(evt) {
            try {
                if (evt && evt.data) {
                    // Increase the debug counter for received data
                    totalReceivedData += evt.data.length;

                    // Add the chunk to the buffer
                    audioDataBuffer = audioDataBuffer.concat(evt.data);
                }
            }
            catch (ex) {
                alert("onAudioInputCapture ex: " + ex);
            }
        }

        function onAudioInputError(error) {
            alert("onAudioInputError event recieved: " + JSON.stringify(error));
        }
    },
    permissionMicrophone: function(){
        cordova.plugins.diagnostic.isMicrophoneAuthorized(
            function(authorized){
                if (!authorized) {
                    cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status){
                        // alert('status: '+status);
                        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
                            // alert("Microphone use is authorized");
                        }
                    }, function(error){
                        // alert(error);
                    });
                }
            }, 
            function(error){
                nucleoBacksite.requestPermissionMicrophone();
            }
        );
    },
    requestPermissionMicrophone: function(){
        cordova.plugins.diagnostic.requestRuntimePermission(function(status){
            switch(status){
                case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                    console.log("Permission granted");
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
                    console.log("Permission has not been requested yet");
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                    console.log("Permission denied - ask again?");
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                    console.log("Permission permanently denied - guess we won't be using it then");
                    break;
            }
        }, function(error){
            console.error("The following error occurred: "+error);
        }, cordova.plugins.diagnostic.runtimePermission.RECORD_AUDIO);               
    },
    startCaptureMicrophone: function(htmlLabel) {
        window.audioinput.checkMicrophonePermission(function(hasPermission) {
            if (hasPermission) {
                console.log("We already have permission to record.");
                captureAudio();
            } 
            else {          
                // Ask the user for permission to access the microphone
                window.audioinput.getMicrophonePermission(function(hasPermission, message) {
                    if (hasPermission) {
                        console.log("User granted us permission to record.");
                        captureAudio();
                    } else {
                        console.log("User denied permission to record.");
                    }
                });
            }
        });

        function captureAudio() {
            try{
                if (window.audioinput && !audioinput.isCapturing()) {
                    captureCfg = {
                        sampleRate: 16000,
                        bufferSize: 8192,
                        channels: 1,
                        format: audioinput.FORMAT.PCM_16BIT,
                        audioSourceType: audioinput.AUDIOSOURCE_TYPE.DEFAULT
                    };

                    audioinput.start(captureCfg);

                    if (objectURL) {
                        URL.revokeObjectURL(objectURL);
                    }

                    // Inicia o timer e seta no html o tempo deccorido e o total de data recebido em uma label na pagina.
                    timerInterVal = setInterval(function () {
                        if (audioinput.isCapturing()) {
                            document.getElementById(htmlLabel).innerHTML = "" +
                                new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") +
                                "|Received:" + totalReceivedData;
                        }
                    }, 1000);
                }
            }
            catch (e) {
                alert("startCapture exception: " + e);
            }
        }
    },
    stopCaptureMicrophone: function() {
        try {
            if (window.audioinput && audioinput.isCapturing()) {
                if (timerInterVal) {
                    clearInterval(timerInterVal);
                }

                if (window.audioinput) {
                    audioinput.stop();
                }
                else {
                    clearInterval(timerGenerateSimulatedData);
                }

                var encoder = new WavAudioEncoder(captureCfg.sampleRate, captureCfg.channels);
                encoder.encode([audioDataBuffer]);

                console.log("Encoding WAV finished");

                console.log("BLOB criado");

                var blob = encoder.finish("audio/wav");

                return blob;
            }
        }
        catch (e) {
            alert("stopCapture exception: " + e);
        }
    },
    //MOLDES-------------------------------------------------------------------
    moldeVazio:function(texto,subtexto,onde){
        // document.getElementById(onde).innerHTML = ''; 

        txt= ' <li class="btnBloco">';
        txt+= '      <div class="btnText" style="width: 100%;">';
        txt+= '          <strong>'+texto+'</strong>';
        txt+= '          <p>'+subtexto+'</p>';
        txt+= '      </div>';
        txt+= '</li>';

        nucleoBacksite.appendToMyChild(onde, txt, undefined);
    },
    moldeSkeletonScoreCard: function(onde){
        document.getElementById(onde).innerHTML = ''; 
        var skl = '';
            skl += ' <div class="skeletonCapa">';
            skl += '    <div class="bs-scorecard-name">';
            skl += '       <div class="skeletonRec sRScore animated-background" style="margin-left: 10%;"></div>';
            skl += '    </div>';
            skl += '</div>';
            skl += '<div class="bs-scorecard-avatar animated-avatar" id="skeletonAvatar">';
            skl += '</div>';
            skl += '<div class="skeletonScoreRow row">';
            skl += '     <div class="skeletonRowCol">';
            skl += '       <div class="skeletonRec animated-background"></div>';
            skl += '    </div>';
            skl += '    <div class="skeletonRowCol">';
            skl += '        <div class="skeletonRec animated-background"></div>';
            skl += '    </div>';
            skl += '    <br><br>';
            skl += '</div>';
        nucleoBacksite.appendToMyChild(onde, skl, undefined);
    },
    moldeSkeletonCta: function(onde){
        document.getElementById(onde).innerHTML = ''; 
        var skl =' <div id="skeletonsCtas">';
            skl+=' <li class="btnBloco">';
            skl+='     <div class="btnImg animated-background" id="skeletonImg">';
            skl+='     </div>';
            skl+='     <div class="btnText" style="margin-top: 1px;">';
            skl+='         <div class="skeletonRec animated-background"></div>';
            skl+='         <div class="skeletonRec sRMed animated-background"></div>';
            skl+='         <div class="skeletonRec sRBig animated-background"></div>';
            skl+='     </div>';
            skl+=' </li>';
            skl+=' <li class="btnBloco">';
            skl+='     <div class="btnImg animated-background" id="skeletonImg">';
            skl+='     </div>';
            skl+='     <div class="btnText" style="margin-top: 1px;">';
            skl+='         <div class="skeletonRec animated-background"></div>';
            skl+='         <div class="skeletonRec sRMed animated-background"></div>';
            skl+='         <div class="skeletonRec sRBig animated-background"></div>';
            skl+='     </div>';
            skl+=' </li>';
            skl+=' <li class="btnBloco">';
            skl+='     <div class="btnImg animated-background" id="skeletonImg">';
            skl+='     </div>';
            skl+='     <div class="btnText" style="margin-top: 1px;">';
            skl+='         <div class="skeletonRec animated-background"></div>';
            skl+='         <div class="skeletonRec sRMed animated-background"></div>';
            skl+='         <div class="skeletonRec sRBig animated-background"></div>';
            skl+='     </div>';
            skl+=' </li>';
            skl+=' </div>';
        nucleoBacksite.appendToMyChild(onde, skl, undefined);
    },
    moldeSkeletonPanel: function(onde){
        document.getElementById(onde).innerHTML = '';     
        var skl ='';
            skl+=' <div id="" class="blc_tit" style="background:#FFFFFF;">';
            skl+='     <div class="skeletonRec sRFull animated-background"></div>';
            skl+=' </div>';
            skl+=' <div id="" class="blc_tit" style="background:#FFFFFF;">';
            skl+='     <div class="skeletonRec sRFull animated-background"></div>';
            skl+=' </div>';
            skl+=' <div id="" class="blc_tit" style="background:#FFFFFF;">';
            skl+='     <div class="skeletonRec sRFull animated-background"></div>';
            skl+=' </div>';
            skl+=' <div id="" class="blc_tit" style="background:#FFFFFF;">';
            skl+='     <div class="skeletonRec sRFull animated-background"></div>';
            skl+=' </div>';
            skl+=' <div id="" class="blc_tit" style="background:#FFFFFF;">';
            skl+='     <div class="skeletonRec sRFull animated-background"></div>';
            skl+=' </div>';
            skl+=' <div id="" class="blc_tit" style="background:#FFFFFF;">';
            skl+='     <div class="skeletonRec sRFull animated-background"></div>';
            skl+=' </div>';
            skl+=' <div id="" class="blc_tit" style="background:#FFFFFF;">';
            skl+='     <div class="skeletonRec sRFull animated-background"></div>';
            skl+=' </div>';
        nucleoBacksite.appendToMyChild(onde, skl, undefined);
    },
    moldeSkeletonGrafico: function(onde){
        document.getElementById(onde).innerHTML = '';        
        var skl ='<div class="bs-panel skeletonGrafico">';
            skl+='<div class="blc_topo" style="background: #fff;">';
            skl+='    <div class="skeletonRec sRScore animated-background"></div>';
            skl+='</div>';
            skl+='</div>';
            skl+='<div class="bs-panel skeletonGrafico">';
            skl+='<div class="blc_topo" style="background: #fff;">';
            skl+='    <div class="skeletonRec sRScore animated-background"></div>';
            skl+='</div>';
            skl+='</div>';
        nucleoBacksite.appendToMyChild(onde, skl, undefined);
    },
    esconderSkl: function(elmntsObj){
        //caso for um ws de inicio da pagina ele ira esconder os skeletons, se não, vai fazer oque o usuario definir
        try{
            for(var i in elmntsObj.preenchido){                
                try{
                    document.getElementById('skeletonsCtas').remove();
                }
                catch(e){}

                try{
                    document.getElementById(elmntsObj.skl[i]).style.display = 'none';
                }
                catch(e){}

                try{
                    if(elmntsObj.preenchido[i] == 'outrosPreenchido'){
                        var elements = document.getElementsByClassName('outrosPreenchido');

                        for(var i in elements){
                            elements[i].style.display = 'block';
                        }
                    }
                    else{
                        document.getElementById(elmntsObj.preenchido[i]).style.display = 'block';
                    }
                }
                catch(e){}
            }
        }
        catch(e){}        
    },
    appendToMyChild:function(dad, html, nodeElement = 'div', _class){
        var wrapper = document.createElement(nodeElement);
        wrapper.innerHTML = html;
        if(_class)
            wrapper.className = _class;
        document.getElementById(dad).appendChild(wrapper);
    },
    doResize: function(textbox) {
        var maxrows = 15;
        var txt = textbox.value;
        var cols = textbox.cols;

        var arraytxt = txt.split('\n');
        var rows = arraytxt.length;

        for (i = 0; i < arraytxt.length; i++)
            rows += parseInt(arraytxt[i].length / cols);

        if (rows > maxrows)
            textbox.rows = maxrows;
        else
            textbox.rows = rows;
    }
}