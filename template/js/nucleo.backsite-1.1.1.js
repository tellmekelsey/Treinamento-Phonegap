urlprojeto = "http://www.backsite.com.br";

try{
	conexaoDB = window.openDatabase("backsiteDB", "1.0", "Backsite", 200000);
}
catch(e){
	alert('Este dispositivo não suporta SQLite.');
}

// Executa uma função sql
function query(sql, success, error){

	conexaoDB.transaction(function(tx){
		tx.executeSql(sql, [],
			function(transaction) {

				if( typeof(success) != 'undefined' ){
					success.call();
				}

			},
			function(transaction, sqlError) {

				if( typeof(error) != 'undefined' ){
					error.call([], sqlError.message, sql);
				}

			}
		);
	});
}

// Executa uma função select
function select(sql, success, vazio, error){

	conexaoDB.transaction(function(tx){
		tx.executeSql(sql, [],
			function(transaction, results) {

				if( typeof(success) != 'undefined' ){

					var total = results.rows.length;

					for( registro=0; registro<total; registro++){
						var row = results.rows.item(registro);
						var lne = registro+1;
						success.call([], row, total, lne);
					}

					if(total==0){
						if( typeof(vazio) != 'undefined' ){
							vazio.call([]);
						}
					}
				}

			},
			function(transaction, sqlError) {

				if( typeof(error) != 'undefined' ){
					error.call([], sqlError.message, sql);
				}

			}
		);
	});
}
function statusBar()
{
    /*
    @param: verfica o tipo do device, caso seja um iOS ele irá aumentar o tamanho do cabeçalho, por conta do iOS 9.
    @author: Marcos Henrique.
    @date: 23/11/2015
    @return: cabeçalho maior.
    */
    var devicePlatform = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
    if (devicePlatform  == "iPhone" || devicePlatform =="iPad")
    {
        $(".es_top").css("padding-top", "20px");
        $(".es_body").css("padding-top", "60px");
        $(".buttonVoltar").css("top","27px");
        $(".iBack").css({"position":"fixed","top":"31px","padding-top":"0px","margin-left":"13px"});
    }
}
function envioJSON(elemento)
{
    //listando a ultima classe de um elemento e pegando seu valor, enviando no formato certo para um json ($data) :
    dados      	 	= new Array();
    var elemento    = elemento.replace(" ","");
   		elemento    = elemento.split(',');
   	qtdEl       	= elemento.length;
    vazio			='';
    for(i=0; i<qtdEl;i++)
    {
        listar = elemento[i];
        $('form').find(listar).each(function(i, el)
        {
         	atributo    = this.getAttribute('class');
            tipo        = this.getAttribute('type');

			if((tipo != 'submit')&&(tipo !='button'))
            {
                atributo    = atributo.split(' ');
                lastClass   = atributo.pop();
                if(tipo=='radio')
                {
                   if(lastClass.is(':checked'))
                    lastVal = encodeURIComponent(this.value);
                }
                else
                {
                    lastVal     = encodeURIComponent(this.value);
               	}
               	lastString  = lastClass+'='+lastVal;
                dados.push(lastString);
                if(lastVal=='')
	            {
	            	vazio = this.getAttribute('name');
	            }
            }

        });
    }
    if(vazio=='')
    {
    	dados = dados.join('&');
    	return dados;
    }
    else
    {
    	return msg('Preencha o campo: '+vazio);
    }

}

function get_contents(url, data, debug){
	if(navigator.onLine){
		try{
			var call = $.ajax({
				async: false,
				url: url,
				type:'POST',
				data:data,
			}).responseText;
			if( typeof call == 'undefined' ){
			 	if(localStorage.getItem('protocol') == undefined){
                    localStorage.setItem('protocol', 'https://')
                    __dm = 'https://';
                }else if(localStorage.getItem('protocol') == 'https://'){
                    localStorage.setItem('protocol', 'http://')
                    __dm = 'http://';
                }else if(localStorage.getItem('protocol') == 'http://'){
                     localStorage.setItem('protocol', 'https://')
                    __dm = 'https://';
                }
                var auxDomain = url.replace(/^(((ht|f)tps)(:\/\/))?/, '');
                var _z = $.ajax({
                    async: false,
                    cache: false,
                    url: __dm+''+auxDomain,
                    type: 'POST',
                    data: post,
                }).responseText;
                return JSON.parse(_z);
			}
			if( debug == true ){
				if(typeof(call === "object") && call != undefined && call != null)
					return call;
				else{
			    }
			}
			try{
				if(typeof(call === "object") && call != undefined && call != null)
					return eval('('+call+')');
				else{
					call = {"code":"500"};
					return call;
			    }
			}catch(e){
				return false;
			}
		}catch(e){
		}
	}else{
		tratamentoLoad();
		throw new Error("Houve uma dificuldade ao acessar os dados no servidor");
	}
}

function playMp3(src) {

	if(playAudio == false || muted() ){
		return false;
	}

	try{
		if (my_media == null) {

			if(device.platform=="Android"){
				mySrc='file:///android_asset/www/'+src;
			}
			else{
				mySrc=src;
			}
			my_media = new Media(mySrc, onSuccess, onError);
		}

		my_media.play({ playAudioWhenScreenIsLocked : true});
	}catch(e){

		if( my_media == null ){

			var audio = $('<audio>');
				audio.attr('id', 'tagAudio');
				audio.attr('controls');

			var source = $('<source>');
				source.attr('src', src);
				source.attr('type', 'audio/mpeg');
				audio.append(source);

			my_media = $('body');
			my_media.append(audio);
		}

		document.getElementById('tagAudio').play();

	}
}
/*
verifica se o app está online ou não.

*/
function openUrl(url){
	try
	{
		navigator.app.loadUrl(url, {openExternal : true});
	}
	catch(e)
	{
		window.open(url, '_blank');
	}
}

function encriptaDados(dados){
	var mensx="";
	var l;
	var i;
	var j=0;
	var ch;
	ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";
	for (i=0;i<dados.length; i++){
		j++;
		l=(Asc(dados.substr(i,1))+(Asc(ch.substr(j,1))));
		if (j==50){
			j=1;
		}
		if (l>255){
			l-=256;
		}
		mensx+=(Chr(l));
	}
	return mensx;
}
function Asc(String){
	return String.charCodeAt(0);
}

function Chr(AsciiNum){
	return String.fromCharCode(AsciiNum)
}

function descriptaDados(dados){
	var mensx="";
	var l;
	var i;
	var j=0;
	var ch;
	ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";
	for (i=0; i<dados.length;i++){
		j++;
		l=(Asc(dados.substr(i,1))-(Asc(ch.substr(j,1))));
		if (j==50){
			j=1;
		}
		if (l<0){
			l+=256;
		}
		mensx+=(Chr(l));
	}
	return mensx;
}
