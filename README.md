![](https://i.imgur.com/4RhdKcy.jpg)

# Phonegap do zero ao deploy 🚀
Aqui armazenaremos códigos e links úteis 😊

## 💻 Programas necessários:
* [NodeJS](https://nodejs.org/en/) versão: 10.16.0
* [VSCODE](https://code.visualstudio.com/)
* [Sublime Text](https://www.sublimetext.com/3)
* [GIT](https://git-scm.com/downloads)
* [Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk12-downloads-5295953.html)


## 📔 Sumário
### 👩‍🚀👨‍🚀 Primeiros Passos:
* [0] Afinal o que é Phonegap?
* [1] Meu primeiro projeto: “Hello World”
* [2] Buildando nosso projeto no Phonegap Build (Easy way)
* [3] UDID (Unique Device Identifier)
* [4] Deploy “Olá mundo” no iPhone
* [5] Aplicando o “Olá mundo” em um kit padrão BS (Ícone, Splash e Home)
* [6] O Guia de estilos do Backsite (header, home e footer)
* [7] Conhecendo os estilos de layout de componentes contidos no repositório
* [9] Meu primeiro protótipo
* [10] Buildando nosso projeto no Phonegap Build (Hard way)

### 🐱‍👤 Estilo Ninja:
* [0] Consultando um JSON 
* [1] O LocalStorage e o SessionStorage
* [2] O processo de logon
* [3] Padrã BS (Sorecard, Listagens, CTAs, CRUD
* [4] Plugins (câmera, localização, acelerômetro, Bedge,  notificações Push, etc)
* [5] Licenças (CSR, PEM, P12, Provisioning Profile, keystore)
* [6] Publicando nas lojas

![](https://i.imgur.com/kWXFPFm.jpg)

## [0] Afinal o que é Phonegap?
![](https://phonegap.com/blog/uploads/2013-02/cordova-phonegap-build.jpg)

Já pensou o trabalho que seria ter que criar um aplicativo e disponibilizar para todas as plataformas, seja elas Android, IOS, Windows Phone, etc.?

Teríamos que aprender como cada plataforma trabalha, sem contar que teríamos que desenvolver o mesmo para cada plataforma, só de imaginar o trabalho que seria dá até um frio na barriga. E se existisse uma maneira de desenvolver um único aplicativo e que rodasse em todas as plataformas? Pois bem, esse é um dos motivos pelo qual o PhoneGap vem crescendo a cada dia.

O PhoneGap é um software framework de código aberto, totalmente gratuito, que permite a criação de aplicações móveis utilizando APIs (Application Programming Interface ou Interface de Programação de Aplicativos) padronizadas da web. É indicado para desenvolvimento de aplicativos de **pequeno e médio porte**.

#### 📚 Contexto Histórico
O software foi desenvolvido pela Nitobi em 2008, passando a dar suporte primeiramente a Iphone, Android e Blackberry 4, posteriormente a Symbian e WebOS e finalmente a Windows phone 7. Em 2011, a Adobe adquire a Nitobi software. Em outubro de 2011, o PhoneGap foi doado para a Apache Software Foundation (ASF), sob o nome Apache Cordova. Através da ASF, o desenvolvimento do PhoneGap passa a garantir administração aberta do projeto. Permanecendo livre e de código aberto sob a licença Apache. 
(No BS utilizamos apenas IOS e Android)

#### 🛠 E na pratica? Como Funciona?
![](https://arquivo.devmedia.com.br/artigos/guias/funcionamento_cordova.png)

Para entender melhor, portanto, o PhoneGap é um conjunto de APIs que permite que o desenvolvedor acesse as funções nativas do dispositivos, como câmera, agenda, etc; através de JavaScript, HTML5 e CSS3, em vez de linguagens específicas de dispositivo, como Objective-C e Java (Android SDK). 
O desenvolvimento é como o de qualquer site e por isso oferece uma maior facilidade de aprendizado. Dispensando, por exemplo, longas horas de dedicação a sistemas mais complicados, como Java, além de reduzir custos do projeto.

Outra vantagem é que as aplicações desenvolvidas são híbridas (criam uma webview) ou seja, elas não são completamente nativas (porque toda a renderização do layout é feito através de visualizações da web em vez de uma UI nativa da plataforma) nem puramente web (porque eles não são apenas aplicações web, mas são feitos como aplicativos para distribuição e possuem acesso a APIs nativas do dispositivo como citado anteriormente).

##### 🤖 Diagrama da Build 
![](https://build.phonegap.com/images/marketing/build-diagram.png)

##### E o Cordova? 
O Apache Cordova é uma plataforma de desenvolvimento móvel com APIs que permitem que o desenvolvedor acesse funções nativas do dispositivo, como a câmera ou o acelerômetro, ou seja, sem ele nada seria possível, Cordova é o herói da webView 🐱‍🏍 



## [1] Meu primeiro projeto: “Hello World”

### 🗂 A Estrutura do projeto
Todo projeto construido em Phonegap, deve estar contido em uma pasta raiz denominada **www/**, e a estrutura dos arquivos da mesma deve seguir o seguinte exemplo:

![](https://i.imgur.com/FnDt0df.png)

O arquivo **cordova.js** não precisa ser necessariamente inserido, pois a build insere ele automaticamente caso ele não esteja já incluido, porém por padrão replicamos o mesmo entre os projetos, já que foi modificado nele questões de vulnerabilidade.

### 🗃 O HTML 
No nosso arquivo **html** devemos incluir o **cordova.js**, seguindo o padrão de boas práticas, scripts no final do arquivo, e estilos no começo, porém se adicionarmos o mesmo no final, algumas funcionalidades, como os eventos de device, não funcionaram corretamente, portanto o local mais adequado para inserção do mesmo é após as tag `<style>`conforme exemplo:

![](https://i.imgur.com/Tc4yp9I.png)
  
#### A `<meta>` tag

**Qual a importância dessa tag? O que de fato ela faz?**
Meta tags são linhas de código HTML que descrevem o conteúdo do seu site para os buscadores. 
É nelas que você vai inserir as palavras-chave que ajudarão no disposição do seu app na tela, por exemplo. Por meio delas, você pode especificar o tipo de conteúdo da página e o conjunto de caracteres que ele usa. 

Nós por padrão em todo projeto inserimos as seguintes tags <meta>: 

`<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0, orientation=portrait">`

`<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />`

A primeira `<meta>` define nossa viewport, ou seja, como nosso html sera disposto em um dispositivo, seu conteúdo preenche todo o tamanho da tela, na escala de 100% e proibindo o usuário de utilizar o pinch zoom na página toda e definindo a orientação como retrato.
Já a segunda `<meta>` define o conjunto de caracteres que ela usa.

### ⚙ O JS
No padrão BS os arquivos javascripts devem seguir a nomenclatura **nucleo.moduloOuNomeDoApp.js** por exemplo **nucleo.inovacao.js** e **nucleo.boaCidade.js**, já no contéudo do arquivo seguimos o padrão de desenvolvimento similar ao **POO** porém de uma forma funcional, assim a primeira linha do seu código contém a declaração da variavel que deve ter o nome do projeto, sendo declarada como um objeto, e dentro desse objeto teremos as funções de cada módulo ou componente, lembrando que sempre em camelCase, conforme o nosso exemplo:

![](https://i.imgur.com/anVlvKT.png)

### 📱 O CSS
Levando em consideração novamente o padrão BS a responsividade em geral é definida pelo **Flexbox**.

O **Flexbox** nos ajuda a organizar esses elementos sem a ajuda do float e também nos ajudam a sanar problemas de Box Model que normalmente acontecem quando acrescentamos, padding, margin e border além da largura do elemento.
o intuito deste treinamento não é se aprofundar nos conceitos do CSS mas caso queira saber mais [clique aqui](https://tableless.com.br/flexbox-organizando-seu-layout/).

Para a nomenclatura de elementos seguimos o padrão similar ao **SMACSS** (caso queira saber mais sobre [clique aqui](https://tableless.com.br/oocss-smacss-bem-dry-css-afinal-como-escrever-css/)), como no exexmplo a seguir:

![](https://i.imgur.com/g12Wsum.png)

### 📦 O config.xml
Config.xml é um arquivo de configuração global que controla muitos aspectos do comportamento de um aplicativo cordova. Esse arquivo XML agnóstico de plataforma é organizado com base na especificação Packaged Web Apps (Widgets) do W3C e estendido para especificar recursos, plug-ins e configurações específicas de plataforma do Cordova API. Este arquivo deve estar na raiz do seu projeto, seguindo nosso exemplo, o mesmo deve ficar no caminho **www/config.xml**.

É neste arquivo que definimos imports de plugins, preferencias da aplicação, tal como statusBar, o sdk do android, o tipo de device que vai receber nosso dispositivo, podemos também por meio dele editar o AndroidManifest e o Info.plist que são arquivos de permissões, por exemplo no caso do iOS temos que utilizar uma tag <config-file> para especificar o porque de estarmos acessando a câmera, e neste arquivo também inserimos nossos splashes e definimos nossa liberação de acesso.
  
Tudo começa e termina na tag `<widget>`que é o elemento raiz do documento config.xml, ela contém diversos atributos, porém vamos nos atentar apenas aos mais relevantes para o cotidiano de desenvolvimento, porém ela conter 2 por padrão o **xmlns="http://www.w3.org/ns/widgets"** e o **xmlns:gap="http://phonegap.com/ns/1.0"**, os demais são:
* **id** que é o id do seu projeto, que deve seguir o padrão *com.backsite.nomeDoApp*;
* **version** que é versão do seu app, este atributo é utilizado pela Apple;
* **versionCode** também refere-se a versão do seu app, porém é o atributo utilizado pelo Android;

Depois dentro da tag `<widget>` temos as tags:
*  **name** O nome do seu app;
*  **description** A descrição do seu app;
* **author** com os atibutos **email** e **href**, que apontam para o autor do app;
* **preference** que define várias opções como pares de atributos de nome/valor. O nome de cada preferência é case-insensitive. Muitas preferências são exclusivas de plataformas específicas e serão indicadas como tal;
* **gap:plugin** Especifica detalhes sobre qual plug-in restaurar durante uma preparação para build;
* **config-file** Identifica um arquivo de configuração baseado em XML a ser modificado, onde nesse documento a modificação deve ocorrer e o que deve ser modificado. Dois tipos de arquivo que foram testados para modificação com este elemento são arquivos xml e plist. O elemento config-file permite apenas acrescentar novos filhos a uma árvore de documentos XML. Os filhos são literais XML a serem inseridos no documento de destino;
* **platform** Identifica plataformas que possuem código nativo associado ou exigem modificações em seus arquivos de configuração. As ferramentas que usam essa especificação podem identificar plataformas suportadas e instalar o código nos projetos do Cordova. Os plug-ins sem tags `<platform>` são assumidos como sendo somente JavaScript e, portanto, podem ser instalados em todas as plataformas;
* **access** Define o conjunto de domínios externos com os quais o aplicativo pode se comunicar;

Nosso exemplo está disponivel [aqui](https://github.com/wakeupmh/Treinamento-Phonegap/blob/master/helloWorld/www/config.xml).

Para saber mais sobre o config.xml acesse a [documentação](https://cordova.apache.org/docs/en/9.x/config_ref/).

#### 🐱‍🚀 Sem mais delongas, vamos ao hands-on!
1) Crie um projeto chamado meuPrimeiroProjeto, o mesmo deve conter duas *divs*, a primeira com uma `img` a sua escolha e a segunda com um `h1` com o texto da sua escolha, depois crie ainda nessa `div` um `button`, este `button` deve chamar uma função e essa função deve trocar o valor do seu `h1` para outro valor.

## [2] Buildando nosso projeto no Phonegap Build (Easy way)
Para realizar o buid é bem simples após definir corretamente nosso **config.xml** basta compactar em **.zip** nossa pasta **www/**, feito isto é só pegar nosso **zip** acessar a [Phonegap Build](https://build.phonegap.com/) após clicar no **sign In** e colocar suas credenciais, ou você pode criar uma conta gratuita (limitada a um projeto privado apenas) na opção **Get an Adobe ID**, feito isto teremos uma tela similar a essa: 
![](https://i.imgur.com/umnbDaN.png)
Clique na opção **new app**, ai teremos duas abas:
* **open-source** Onde é possivel inserir um link de um repositório github e por ele buildar nossa aplicação
* **private** Nesta opção subiremos nosso **zip**

![](https://i.imgur.com/Ab9s1Ck.png)

Após selecionar o arquivo de destino, ele fará o upload, feito o upload, teremos a seguinte tela:

![](https://i.imgur.com/7jRbx5Z.png)

Clique no botão **Ready to build**, ele buildará nossa aplicação e então teremos o seguinte:

![](https://i.imgur.com/sBfMffg.png)

Como é possível notar para a plataforma **iOS** não temos um build disponivel, isto ocorre pelo fato de que temos que atrelar uma licença **provisiong profile** do tipo **development**, faremos isto no próximo cápitulo, já no Android que depende de uma licença apenas na hora de ir para produção temos nossa build pronta para ser testada.

Independente da plataforma é possivel instalar o app apenas lendo o **QRCODE** no lado direito da tela, mas caso você queira compartilhar o link, basta apenas clicar em install e depois com o botão direito clicar em cima da plataforma desejada e copiar o endereço do link, feito isto é só compatilhar onde quiser 😎

![](https://i.imgur.com/2D8rPh2.png)


## [3] UDID (Unique Device Identifier)
UDID é uma sigla para "identificador do dispositivo único", uma combinação alfanumérica única de 40 dígitos específico para um gadget Apple, seja ele um iPhone, iPad ou iPod touch. Ele é como um número de série, só que muito mais difícil de adivinhar. Algo parecido com isto: 2b6f0cc904d137be2e1730235f5664094b831186.

O UDID é usado pela Apple para identificar o aparelho em algumas operações, como no registro de aparelhos de testes para desenvolvimento.

### Como encontrar o UDID pelo iTunes?
A primeira maneira de encontrar o UDID é pelo iTunes. Depois de instalar o iTunes, conecte o dispositivo ao computador e ele se abrirá automaticamente. Selecione o seu dispositivo e clique no ícone do iPhone para abrir a sua interface de informações. Clique no número de série para exibir o UDID: 

![](https://img-21.ccm2.net/krbQw7sNA0DVALsA0okEy1piCf0=/500x/5880547950fb414aa88e60a5121e6a3c/ccm-faq/UfPTTYctIzW9hpBBCcWAMlau3n2n-imgem-1.png)
### Como descobrir o UDID online
Uma maneira mais simples ainda de fazer isso é acessar o site pelo seu dispositivo, diretamente. Acesse o site [GETUDID.IO](https://get.udid.io/)

## Registrando um dispositivo
1) Conecte-se à página do [Apple Developer](https://idmsa.apple.com/IDMSWebAuth/signin?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2F&rv=1), menu do Member Center;
2) Clique nos Certificados, Identificadores e Perfis;
3) Clique na guia Dispositivos para exibir todos os dispositivos registrados
4) Clique no botão ➕ para abrir o formulário para registrar dispositivos.

![](https://www.aquafadas.com/documentation/calenco/en/Set_your_app_on_Apple_Developper/content/images/Add_new_test_device.png)
*Você pode registrar até 100 dispositivos por ano* 

5) Registrando o dispositivo
    * Selecione o botão Registrar dispositivo para registrar um dispositivo de teste.
      * Preencha o Nome do dispositivo: descrição rápida do dispositivo, tipo, usuário;
      * Preencha o UDID (Unique Device Identifier) com o código que pegamos anteriormente;
![](https://www.aquafadas.com/documentation/calenco/en/Set_your_app_on_Apple_Developper/content/images/Register_one_device.png)

6) Clique no botão Continuar para registrar o dispositivo.

## [4] Deploy “Olá mundo” no iPhone
Para conseguirmos buildar nossa aplicação para iOS precisamos primeiramente gerar um **Apple App Id**, depois um **provisioning profile development** e incluir no Phonegap Build, vamos lá:

### Criando o ID do aplicativo
1) Faça login na sua conta de desenvolvedor da Apple® e navegue até Certificados, IDs e perfis> Identificadores> IDs de aplicativos;
2) Adicione um novo ID de aplicativo;
3) Preencha um nome. O nome não é visível para o usuário final.

![](https://support.staffbase.com/hc/article_attachments/360000404712/app-dist_apple-appid.png)

4) Ative o Explicit App ID.
5) Preencha um **Bundle ID**. A melhor prática é usar o nome de domínio externo ➕ o nome do aplicativo, por exemplo *com.backsite.meuApp*.
6) Clique em Continuar. Uma visão geral dos dados inseridos é exibida.
7) Verifique os dados e clique em **Enviar**.

### Criando o Provisioning Profile
Para criar um provisioning profile, acesse a página principal do portal, e na seção “Provisioning Profiles“, escolha “All“. Clique no “➕“. Você verá várias opções, neste post seu objetivo é assinar o seu app para continuar desenvolvendo em cima de um dispositivo físico, então selecione “iOS App Development” e continue.

![](http://high5devs.com/wp-content/uploads/2017/08/iosappdev.png)

A primeira informação que você vai precisar definir é o App ID, selecione o App ID criado anteriormente.

![](http://high5devs.com/wp-content/uploads/2017/08/prof-appid.png)

Agora você deve selecionar o certificado criado para o seu app.

![](http://high5devs.com/wp-content/uploads/2017/08/prof-cert.png)

Escolha todos os dispositivos em que queira poder testar seu app.

![](http://high5devs.com/wp-content/uploads/2017/08/prof-devices.png)

Escolha um nome para o provisioning profile, confira tudo, e se estiver correto, clique em Continue.

![](http://high5devs.com/wp-content/uploads/2017/08/prof-name.png)

Pronto! Agora faça o download do provisioning profile para finalizarmos a inclusão da licença

### Inserindo sua licença no Phonegap Build
Para inserir sua licença, clique no 👤 localizado no canto superior direito, depois clique em **Edit Account**

![](https://i.imgur.com/RqY7P9p.png)

Feito isto, selecione a opção **Signing Keys** 

![](https://i.imgur.com/Bk0q3Iv.png)

No container do iOS clique no botão **add key**, insira um titulo, por padrão definimos como prefixo **dev** para desenvolvimento e **prod** para produção, assim ficaria algo como: **devMeuApp**, depois selecione o **.p12** disponivel para download [aqui]()(mais tarde ensinarei como gerar este e outros certificados), agora selecione o **provisioning profile** que você baixou, feito isto clique em **submit key**, ela aparecerá **locked**.

![](https://i.imgur.com/E3XJJoH.png)

Para desbloquear basta clicar no 🔒 e inserir nossa senha padrão, depois clique em **submit key** e ela será desbloqueada, apresentando um cadeado aberto 🔓

![](https://i.imgur.com/9f1lLtJ.png)

Feito isto basta voltarmos para a aba **Apps** e selecionar nosso aplicativo

![](https://i.imgur.com/gW1jJ9p.png)

Agora basta selecionar nossa key, que inserimos anteriormente e esperar o rebuild

![](https://i.imgur.com/BenQxPF.png)

Caso dê tudo certo, teremos no final nosso aplicativo compilado e pronto para instalação 😎

![](https://i.imgur.com/PcX5LVi.png)
