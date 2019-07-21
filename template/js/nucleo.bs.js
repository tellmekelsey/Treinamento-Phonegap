var sessao = {
    get: function () {
        try {
            return (localStorage.getItem('corpId')) + '';
        } catch (e) {
            //bs.tratamentoLoad();
        }
    },
    set: function (session) {
        try {
            return (localStorage.setItem('corpId', session));
        } catch (e) {
            //bs.tratamentoLoad();
        }
    }
}
var storage = {
    get: function (name) {
        return (localStorage.getItem(name)) + '';
    },
    set: function (name, dominio_url) {
        return (localStorage.setItem(name, dominio_url));
    }
}
var dominio = {
    get: function () {
        return (localStorage.getItem('dominio')) + '';
    },
    set: function (dominio_url) {
        return (localStorage.setItem('dominio', dominio_url));
    },
    complete: function () {
        if(localStorage.getItem('protocol') == undefined || localStorage.getItem('protocol') == null)
            localStorage.setItem('protocol', 'http://');
        return (localStorage.getItem('protocol')+''+ localStorage.getItem('dominio')) + '/dispositivo/service/backsite/appBS_nv/versao_116/';
    },
    wHttp: function () {
        if(localStorage.getItem('protocol') == undefined || localStorage.getItem('protocol') == null)
            localStorage.setItem('protocol', 'http://');
        return (localStorage.getItem('protocol')+''+ localStorage.getItem('dominio'));
    }
}
// var dominio = {
//     get: function () {
//         return (localStorage.getItem('dominio')) + '';
//     },
//     set: function (dominio_url) {
//         return (localStorage.setItem('dominio', dominio_url));
//     },
//     complete: function () {
//         if(localStorage.getItem('protocol') == undefined || localStorage.getItem('protocol') == null || localStorage.getItem('protocol') == 'null'){
//             localStorage.setItem('protocol', 'https://');
//             __dm = 'https://';
//         }else{
//             __dm = localStorage.getItem('protocol');
//         }
//         return (__dm+''+ localStorage.getItem('dominio')) + '/dispositivo/service/backsite/appBS_nv/';
//     },
//     wHttp: function () {
//         if(localStorage.getItem('protocol') == undefined || localStorage.getItem('protocol') == null || localStorage.getItem('protocol') == 'null'){
//             localStorage.setItem('protocol', 'https://');
//             __dm = 'https://';
//         }else{
//             __dm = localStorage.getItem('protocol');
//         }
//         return (__dm+''+ localStorage.getItem('dominio'));
//     }
// }
var bs = {
    ajax:function(url, post){
        return $.ajax({
            async: false,
            cache: false,
            url: url,
            type: 'POST',
            data: post,
        }).responseText;
    },
    actionUrl: function (url, post) {
        if (navigator.onLine) {
            try {
                var _d = bs.ajax(url, post);
                try {
                    if (_d instanceof Object){
                        _d = eval('(' + _d + ')');
                    }
                    else if(_d == undefined || _d.indexOf("404 Not Found") > -1){
                        if(!localStorage.getItem('protocol')){
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
                        var _z = bs.ajax(__dm+''+auxDomain, post);
                        return JSON.parse(_z);
                        
                    }
                } catch (e) {}
                if(_d != undefined && _d != null)
                    return JSON.parse(_d);
                else{
                    _d = {'code': 500}
                    return _d;
                }
            } catch (e) {
                return false;
            }
        } else {
            bs.tratamentoLoad();
            throw new Error("Houve uma dificuldade ao acessar os dados no servidor");
        }

    },
    verificacaoDeErros: function (code, error) {
        code = parseInt(code);
        if (code == null || code == undefined || Number.isNaN(code) == true) {
            // bs.tratamentoLoad();
        } else {
            switch (code) {
                case 300:
                    // window.location.href = "../loginCorp/login.html";
                    break;
                case 305:
                    // window.location.href = "../loginCorp/login.html";
                    break;
                case 404:
                    var executed = false;
                    bs.msg('Requisição não encontrada!');
                    break;
                case 417:
                    console.log(error)
                    if (error != undefined) {
                        if (error.pt != undefined)
                            bs.alert('Error#417 - ' + error.pt);
                        else
                            bs.alert('Error#417 - ' + error);
                    } else {
                        bs.tratamentoLoad();
                    }
                    break;
                case 500:
                    // bs.msg('Error#500 - Servidor indisponível!');
                    bs.tratamentoLoad();
                    // $.unblockUI();
                    break;
            }
        }
    },
    verificaconexao: function (domin, funcaoSucess, funcaoFail) {
        dominio.set(domin);
        var identificador = sessao.get();
        var senha = "87d1608a31a752d491d88c407861141d";
        if (identificador == null || identificador == 'null') {
            identificador = senha;
        }
        var cod = {
            app: senha,
            device: identificador
        }

        nucleoBacksite.actionUrl(dominio.complete() + "padrao.verificaconexao.php", cod, false,
            function(result){
                if (result.code == 200) {                    
                    localStorage.setItem('corpId', result.identificador);
                    funcaoSucess.call();
                } else {
                    nucleoBacksite.msg("Sessão inválida!"); 
                    nucleoBacksite.verificacaoDeErros(result.code, result.error);
                }
            }
        );
    },
    verficaVersao: function () {
        var vsJson = JSON.parse(versao);
        var myVersion = vsJson[0].version;

        nucleoBacksite.actionUrl("http://www.backsite.com.br/dispositivo/service/backsite/appBS_nv/padrao.versao.php", null, false,
            function(result){
                if (result != undefined && result != null) {
                    var wsVersion = result.version;
                    if (parseInt(myVersion) < parseInt(wsVersion)) {
                        var devicePlatform = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

                        if(nucleoBacksite.isAndroid())
                            var link = result.android;
                        else
                            var link = result.ios;   

                        nucleoBacksite.navAlert('Nova versão!', "Atualize agora para ter sempre novos recursos e correções.", 
                            function() {
                                window.open(link, '_system');
                            }
                        );

                    } else {
                        verificaIndex();
                    }
                } else{
                    nucleoBacksite.tratamentoLoad();
                }
            }
        );
        
    },
    verificaPermissaoHome: function () {
        var _p = {
            device: sessao.get()
        }

        nucleoBacksite.actionUrl(dominio.complete() + "select.profissional.permissoes.php", _p, false,
            function(data){
                if (data.code == 200) {
                    var dados = data.dados;
                    var c = false;
                    // console.time("loopTime"); see the time of the loop
                    for(var i in dados){
                        var _n = i.replace('permissao_','');
                        var elem = document.getElementById(_n);
                        if(dados[i] != 0 && elem){
                            c = true;
                            elem.style.display = 'block';
                        }
                    }
                    // console.timeEnd("loopTime"); ~ 0.18ms
                    if(!c)
                        bs.alert('Você não possui permissão para nenhum módulo, entre em contato com o administrador!');''
                    $('#blockUICustom').fadeOut('fast');
                } 
                else {
                    nucleoBacksite.verificacaoDeErros(data.code);
                }
            }
        );
    },
    verificaPermissao: function () {
        var _p = {
            device: sessao.get()
        }
        var result = bs.actionUrl(dominio.complete() + 'select.profissional.permissoes.php', _p);
        if (result.code != 200) {
            window.location.href = "loginCorp/login.html";
        }
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
    login: function (email, senha, raiz) {
        var conteudo = {
            device: sessao.get(),
            email: email,
            senha: senha,
            ambiente: 'c'
        }
        nucleoBacksite.actionUrl(dominio.complete() + 'padrao.auth.php', conteudo, false, 
            function(result){
                if (result.code == 200) {
                    var dados = result.dados;
                    var domin = dominio.get();
                    var _alias = domin.split('.');
                    var arr = {
                        corpCod: dados.erp_prof_codigo,
                        dominio: domin,
                        corpEmail: dados.erp_prof_email,
                        password: nucleoBacksite.encriptaDados(senha),
                        corpName: dados.erp_prof_nome,
                        corpFoto: dados.erp_prof_foto,
                        corpCapa: dados.erp_prof_cover,
                        corpDep: dados.erp_dep_codigo
                    }
                    for (var i in arr) {
                        storage.set(i, arr[i]);
                    }
                    bs.sqlInsertDominio(_alias[1], dominio.get(), email, senha, true, raiz);
                }
                else{
                    if(raiz)
                        location.href='loginCorp/login.html';
                    else{
                        inputSite.disabled = false;
                        inputEmail.disabled = false;
                        inputPassword.disabled = false;
                        btnEnviar.disabled = false;
                        btnLoginStatic.style.display = 'block'
                        btnLoginLoading.style.display = 'none';
                        nucleoBacksite.verificacaoDeErros(result.code, result.error);
                    }
                }
            }
        );
    },
    sqlSelectDominio:function() {
        select('SELECT rowid, * FROM dominios', function(row, total){
            bs.moldeDominios(row.rowid, row.alias, row.dominio, row.login, row.senha);
        }, function(empty){
            if(!empty)
                nucleoBacksite.moldeVazio('Sem resultados!','Você não possui domínios registrados, utilize o botão "Novo" para adicionar um domínio.','listDominios');
        }, function(error){
            nucleoBacksite.moldeVazio('Sem resultados!','Você não possui domínios registrados, utilize o botão "Novo" para adicionar um domínio.','listDominios');
        });
        nucleoBacksite.esconderSkl({skl:['ctaListSkl'],preenchido:['ctaPreenchido']});
    },
    sqlInsertDominio:function(alias, dominio, login, senha, auth, raiz) {
        var q = 'CREATE TABLE  IF NOT EXISTS dominios('
              + 'dominio TEXT NOT NULL,'
              + 'login TEXT NOT NULL,'
              + 'senha TEXT NOT NULL,'
              + 'alias TEXT);';
        queryNoFunctions(q);
        var dom = 'INSERT INTO dominios (dominio, login, senha, alias) '
                + 'SELECT * FROM (SELECT "'+dominio+'", "'+login+'", "'+nucleoBacksite.encriptaDados(senha)+'","'+alias+'") AS tmp '
                + 'WHERE NOT EXISTS ('
                + 'SELECT dominio, login FROM dominios WHERE dominio = "'+dominio+'" AND login = "'+login+'"'
                + ') LIMIT 1';
        query(dom, function(){
            if(!auth)
                location.reload();
            else{
                if(raiz)
                    window.location.href = "home.html";
                else
                    window.location.href = "../home.html";
            }
        }, function(error){
            console.log(error);
        });
    },
    sqlDeleteDominio(id){
        nucleoBacksite.navConfirm('Atenção!', 'Deseja realmente excluir este domínio?', 'Cancelar', 'excluir', function(){
            var q = 'DELETE FROM dominios WHERE rowid ='+id;
            query(q, function(){
                location.reload();
            }, function(error){
                console.log(error);
            });
        }, function(){

        });
    },
    slideMenu: function(raiz){
        var aux = '../';
        if(raiz)
            aux = '';

        $('head').prepend('<meta name="format-detection" content="telephone=no">');

        var sMenu = '     <div id="nav">';
        sMenu += '            <div class="navigation__inner">';
        sMenu += '                <ul>';
        sMenu += '                    <li style="padding-bottom: 10px;border-bottom: 1px solid #cacaca;width: 93%">';
        sMenu += '                        <a href="#">';
        sMenu += '                            <div class="innerBtnPerfil" id="innerBtnPerfil" style="background-image:url();">';
        sMenu += '                            </div>';
        sMenu += '                            <div class="innerTitPerfil" id="innerTitPerfil"></div><br>';
        sMenu += '                            <div class="subTitPerfil" id="subTitPerfil"></div>';
        sMenu += '                        </a>';
        sMenu += '                    </li>';
        sMenu += '                    <li>';
        sMenu += '                        <a href="'+aux+'sobre.html">';
        sMenu += '                            <div class="innerBtn">';
        sMenu += '                                <i class="fa fa-info"></i>';
        sMenu += '                            </div>';
        sMenu += '                            <div class="innerTxt">Sobre</div>';
        sMenu += '                            <i class="fa fa-angle-right"></i>';
        sMenu += '                        </a>';
        sMenu += '                    </li>';
        sMenu += '                    <li>';
        sMenu += '                        <a href="'+aux+'perfil/alterar_senha.html">';
        sMenu += '                            <div class="innerBtn">';
        sMenu += '                                <i class="fa fa-edit"></i>';
        sMenu += '                            </div>';
        sMenu += '                            <div class="innerTxt">Alterar Senha</div>';
        sMenu += '                            <i class="fa fa-angle-right"></i>';
        sMenu += '                        </a>';
        sMenu += '                    </li>';
        sMenu += '                    <li>';
        sMenu += '                        <a href="'+aux+'perfil/sobreuser.html">';
        sMenu += '                            <div class="innerBtn">';
        sMenu += '                                <i class="fa fa-user"></i>';
        sMenu += '                            </div>';
        sMenu += '                            <div class="innerTxt">Perfil</div>';
        sMenu += '                            <i class="fa fa-angle-right"></i>';
        sMenu += '                        </a>';
        sMenu += '                    </li>';
        sMenu += '                    <li>';
        sMenu += '                        <a href="javascript:location.href=\''+aux+'dominios.html\'">';
        sMenu += '                            <div class="innerBtn">';
        sMenu += '                                <i class="fa fa-cloud"></i>';
        sMenu += '                            </div>';
        sMenu += '                            <div class="innerTxt">Meus domínios</div>';
        sMenu += '                            <i class="fa fa-angle-right"></i>';
        sMenu += '                        </a>';
        sMenu += '                    </li>';
        sMenu += '                    <li>';
        sMenu += '                        <a href="javascript:bs.deslogar('+'\''+aux+'\''+')">';
        sMenu += '                            <div class="innerBtn">';
        sMenu += '                                <i class="fa fa-lock"></i>';
        sMenu += '                            </div>';
        sMenu += '                            <div class="innerTxt">Finalizar Sessão</div>';
        sMenu += '                            <i class="fa fa-angle-right"></i>';
        sMenu += '                        </a>';
        sMenu += '                    </li>';
        sMenu += '                    <li class="footerMenu">';
        sMenu += '                        <ul>';
        sMenu += '                            <a href="'+aux+'home.html"><img src="'+aux+'img/icon.png" style="height:24px;width:24px;display:unset;"></a> <li> BS Studio 2019 - Versão 2.0 </li>';
        sMenu += '                        </ul>';
        sMenu += '                    </li>';
        sMenu += '                </ul>';
        sMenu += '            </div>';
        sMenu += '        </div>';

        document.getElementById('menu').innerHTML = sMenu;
    },
    usuarioImg:function(raiz){
        bs.slideMenu(raiz);
        document.getElementById('innerBtnPerfil').style.backgroundImage = 'url('+dominio.wHttp()+''+localStorage.getItem('corpFoto');
        document.getElementById('innerTitPerfil').innerHTML = localStorage.getItem('corpName');
        document.getElementById('subTitPerfil').innerHTML = localStorage.getItem('corpEmail');
    },
    esqueciSenha: function(email){
        var _z = {
            email: email,
            device: sessao.get()
        };

        nucleoBacksite.actionUrl(dominio.complete() + 'padrao.esqueci.php', _z, false, 
            function(result){
                if (result.code == 200) {
                    document.getElementById('buttonLogin').style.display = 'block';
                    $('#formEnviar').each(function() {
                        this.reset();
                    });

                    $('.alert').html('Senha enviada para o E-mail!');
                    document.getElementById('mensagemSuccess').style.display = 'block';

                    desbloquearCampos();
                }
                else if (result.code == 404) {
                    desbloquearCampos();

                    $('.alert').html('E-mail não encontrado!');
                    document.getElementById('mensagemAlerta').style.display = 'block';
                }
                else{
                    desbloquearCampos();

                    nucleoBacksite.verificacaoDeErros(result.code);
                }
            }
        );
    },
    authLogandoNew: function (email, senha) {
        // alert(sessao.get());
        var _auth = {
            device: sessao.get(),
            email: email,
            senha: senha
        }

        var url_dom = dominio.complete() + "padrao.auth.php";
        var data = get_contents(url_dom, _auth);
        if (data.code == 200) {
            var dados = data.dados;
            var domin = dominio.get();
            var arr = {
                corpCod: dados.erp_prof_codigo,
                dominio: domin,
                corpEmail: dados.erp_prof_email,
                password: encriptaDados(senha),
                coprName: dados.erp_prof_nome,
                corpFoto: dados.erp_prof_foto,
                corpCapa: dados.erp_prof_cover,
                corpDep: dados.erp_dep_codigo
            }
            for (var i in arr) {
                storage.set(i, arr[i]);
            }
            return true;
        } else {
            return false;
            bs.verificacaoDeErrosLogin(data.code);
        }
    },
    tratamentoLoad: function () {
        navigator.notification.confirm('Houve uma dificuldade ao acessar os dados no servidor, verifique sua internet. ', onConfirm, 'Alerta!', ['Voltar', 'Tentar Novamente']);

        function onConfirm(buttonIndex) {
            if (buttonIndex == 1)
                history.go(-1);
            else
                location.reload();
        }
    },
    deslogar: function (aux) {
        localStorage.removeItem('corpId');
        localStorage.removeItem('corpCod');
        localStorage.removeItem('coprName');
        localStorage.removeItem('corpCapa');
        localStorage.removeItem('corpEmail');
        localStorage.removeItem('corpFoto');
        localStorage.removeItem('imgLocal', 1);
        localStorage.removeItem('corpScoreCard');
        localStorage.removeItem('corpLogo');
        window.location.href = aux+'index.html';
    },
    menu: function () {
        var nMenu = $('.navMenu');

        var menu_bs = '<a href="home.html" class="bs-menu bs-left-one"><i class="fa fa-home fa-2x"></i></a>';
        nMenu.append(menu_bs);
        var menu_monit = '<a href="indicadores/home.html" class="bs-menu bs-left-three"><i class="fa fa-chart-pie fa-2x"></i></a>';
        nMenu.append(menu_monit);
        var menu_not = '<a href="lembrete/desktop.html" class="bs-menu bs-right-three"><i class="fa fa-bell fa-2x"></i></a>';
        nMenu.append(menu_not);

    },
    descriptaDados: function (dados) {
        var mensx = "";
        var l;
        var i;
        var j = 0;
        var ch;
        ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";
        for (i = 0; i < dados.length; i++) {
            j++;
            l = (Asc(dados.substr(i, 1)) - (Asc(ch.substr(j, 1))));
            if (j == 50) {
                j = 1;
            }
            if (l < 0) {
                l += 256;
            }
            mensx += (Chr(l));
        }
        return mensx;

    },
    msg: function (m) {
        $.unblockUI();
        $('.alert').html(m);
        $('.mensagem').show();
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
        return false;
    },
    filtro: function () {
        let input, filter, ul, li, strong, i, vazio = 0;
        input = document.getElementById('inputfiltro');
        filter = input.value.toUpperCase();
        ul = document.getElementById("ulBusca");
        li = ul.getElementsByTagName('li');
        for (i = 0; i < li.length; i++) {
            strong = li[i].getElementsByTagName("strong")[0];
            if (strong.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "flex";
            } else {
                li[i].style.display = "none";
                vazio++;
            }
        }
        if (vazio >= li.length) {
            $('#no_result').show()
        } else {
            $('#no_result').hide()
        }
    },
    moldeSemResult: function (html) {
        txt = ' <li class="btnBloco">';
        txt += '       <div class="btnText">';
        txt += '           <strong>Sem resultados!</strong>';
        txt += '           <p>Tente novamente com outros parâmetros</p>';
        txt += '       </div>';
        txt += ' </li>';

        $('#' + html + '').append(txt);
    },
    envioJSON: function (elementos) {
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
        var vazio = '';
        //dados       = new Array(); -> array
        jsonData = []; // -> object
        elementos = elementos.replace(" ", "");
        elementos = elementos.split(',');
        container = elementos.shift();
        qtdEl = elementos.length;
        for (i = 0; i < qtdEl; i++) {
            listar = elementos[i];
            $(container).find(listar).each(function (i, el) {
                atributo = $(this).attr('class');
                tipo = $(this).attr('type');
                if ((tipo != 'submit') && (tipo != 'button')) {
                    atributo = atributo.split(' ');
                    lastClass = atributo.pop();
                    if (tipo == 'radio') {
                        if ($('.' + lastClass).is(':checked'))
                            lastVal = $(this).val();
                    } else if (tipo == 'checkbox') {
                        if ($('.' + lastClass).is(':checked'))
                            lastVal = 1;
                        else
                            lastVal = 0;
                    } else if (tipo == 'datetime-local') {
                        lastVal = $(this).val().replace("T", " ") + ':00';
                    } else {
                        lastVal = $(this).val();
                    }
                    /*lastString  = lastClass+'='+lastVal; -> para criar um array com retorno como o da legenda.
                    dados.push(lastString); -> adiciona os valores ao array.
                    */
                    jsonData[lastClass] = lastVal;
                    if (lastVal == '') {
                        if (tipo != 'hidden' && this.getAttribute('name') != 'complemento')
                            vazio = this.getAttribute('name');
                    }
                }
            });
        }
        if (vazio == '') {
            /*dados = dados.join(',');
            return dados;
            @return: ARRAY
            */
            return jsonData
        } else {
            /* usuario.msg('Preencha o campo: '+vazio);
             return false*/
            return jsonData
        }
    },
    mostrar: function (elems) {
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.display = 'flex';
        }
    },
    sumir: function (elems) {
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.display = 'none';
        }
    },
    activeLocation: function () {
        cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
            switch (status) {
                case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                    bs.accuracyLocation();
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED:
                    bs.accuracyLocation();
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                    bs.accuracyLocation();
                    break;
                case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                    console.log('GRANTED');
                    break;
                case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                    console.log('GRANTED_WHEN_IN_USE');
                    break;
            }
        }, function (error) {}, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
    },
    activeCamera: function () {
        cordova.plugins.diagnostic.isCameraAuthorized({
            successCallback: function (authorized) {
                if (!authorized || authorized == 0) {
                    cordova.plugins.diagnostic.requestCameraAuthorization({
                        reqSuccess: function (status) {
                            console.log("Auth: " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
                        },
                        reqError: function (error) {
                            bs.activeCamera();
                        },
                        externalStorage: true
                    });
                }
            },
            errorCallback: function (error) {
                bs.activeCamera();
            },
            externalStorage: true
        });
    },
    getPosition: function () {
        navigator.geolocation.watchPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            priority: navigator.geolocation.PRIORITY_HIGH_ACCURACY
        });

        function onSuccess(position) {

        }

        function onError(error) {
            function msg(m) {
                $.unblockUI();
                $('.alert').html(m);
                $('.mensagem').show();
                return false;
            }
        }
    },
    isAndroid: function () {
        var devicePlatform = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
        if (devicePlatform == "iPhone" || devicePlatform == "iPad")
            return false;
        else
            return true;

    },
    alert: function (msg) {
        navigator.notification.alert(msg, onConfirm, 'Alerta!', ['Fechar']);

        function onConfirm(buttonIndex) {
            location.reload();
        }
    },
    alertNoReload: function (msg) {
        navigator.notification.alert(msg, onConfirm, 'Alerta!', ['Fechar']);

        function onConfirm(buttonIndex) {
            // location.reload();
        }
    },
    backAlert: function (msg) {
        navigator.notification.confirm(msg, onConfirm, 'Alerta!', ['Fechar', 'Voltar']);

        function onConfirm(btnIndex) {
            if (btnIndex == 2) {
                history.go(-1);
            } else {}
        }
    },
    moldeDominios:function(id ,alias, dominio, login, senha){
        var txt='<li class="btnBloco btnDomin" name="btnDomin" data-id="'+id+'" data-auth="'+senha+'">';
            txt+='      <div class="btnImg" style="background-image:linear-gradient(#010e45, #375d8f);">';
            txt+='          <img src="img/botoes/socket.svg" class="svgBtn">';
            txt+='      </div>';
            txt+='      <div class="btnText">';
            txt+='          <strong style="text-transform: capitalize;">'+alias+'</strong>';
            txt+='          <p id="pDominio">'+dominio+'</p>';
            txt+='          <p id="pLogin">'+login+'</p>';
            txt+='      </div>';
            txt+='      <i class="fa fa-angle-right fa-2x"></i>';
            txt+='</li>';
        document.getElementById('listDominios').innerHTML += txt;
        var btnDomin = document.getElementsByName("btnDomin");
        var touchStartTimeStamp = 0;
        var touchEndTimeStamp   = 0;
        if (btnDomin) {
            for (var i=0; i < btnDomin.length; i++) {
               btnDomin[i].addEventListener("touchstart", pressingDown);
               btnDomin[i].addEventListener("touchend", notPressingDown);
            }
        }
        function pressingDown(e) {
           touchStartTimeStamp = e.timeStamp;
        }
        function notPressingDown(e) {
            touchEndTimeStamp = e.timeStamp;
            var diff = touchEndTimeStamp - touchStartTimeStamp;
            if(diff > 790){
                var _this = '';
                if(!e.target.getAttribute('data-id'))
                    if(!e.target.parentNode.getAttribute('data-id'))
                        _this = e.target.parentNode.parentNode.getAttribute('data-id');
                    else
                        _this = e.target.parentNode.getAttribute('data-id');
                else
                   _this = e.target.getAttribute('data-id');
                bs.sqlDeleteDominio(_this);
            }
        }
    }
}