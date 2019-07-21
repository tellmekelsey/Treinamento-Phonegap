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
* [2] UDID 
* [3] Buildando nosso projeto no Phonegap Build (Easy way)
* [4] Rodando o “Olá mundo” no iPhone
* [5] Aplicando o “Olá mundo” em um kit padrão BS (Ícone, Splash e Home”)
* [6] O Guia de estilos do Backsite (header, home e footer)
* [7] Conhecendo os estilos de layout de componentes contidos no repositório
* [9] Meu primeiro protótipo
* [10] Buildando nosso projeto no Phonegap Build (Hard way)

### 🐱‍👤 Estilo Ninja:
* [0] JavaScript e Json (definições)
* [1] O Local Storage
* [2] O processo de logon
* [3] Sorecard
* [4] Listagens 
* [5] CTAs
* [6] CRUD
* [7] Plugins (câmera, localização, acelerômetro, Bedge,  notificações Push, etc)
* [8] Licenças (CSR, PEM, P12, Provisioning File, keystore)
* [9] Publicando nas lojas


## [0] Afinal o que é Phonegap?
Já pensou o trabalho que seria ter que criar um aplicativo e disponibilizar para todas as plataformas, seja elas Android, IOS, Windows Phone, etc.?

Teríamos que aprender como cada plataforma trabalha, sem contar que teríamos que desenvolver o mesmo para cada plataforma, só de imaginar o trabalho que seria dá até um frio na barriga. E se existisse uma maneira de desenvolver um único aplicativo e que rodasse em todas as plataformas? Pois bem, esse é um dos motivos pelo qual o PhoneGap vem crescendo a cada dia.

O PhoneGap é um software framework de código aberto, totalmente gratuito, que permite a criação de aplicações móveis utilizando APIs (Application Programming Interface ou Interface de Programação de Aplicativos) padronizadas da web. É indicado para desenvolvimento de aplicativos de **pequeno e médio porte**.

#### Contexto Histórico
O software foi desenvolvido pela Nitobi em 2008, passando a dar suporte primeiramente a Iphone, Android e Blackberry 4, posteriormente a Symbian e WebOS e finalmente a Windows phone 7. Em 2011, a Adobe adquire a Nitobi software. Em outubro de 2011, o PhoneGap foi doado para a Apache Software Foundation (ASF), sob o nome Apache Cordova. Através da ASF, o desenvolvimento do PhoneGap passa a garantir administração aberta do projeto. Permanecendo livre e de código aberto sob a licença Apache. 
(No BS utilizamos apenas IOS e Android)

#### E na pratica? Como Funciona?
Para entender melhor, portanto, o PhoneGap é um conjunto de APIs que permite que o desenvolvedor acesse as funções nativas do dispositivos, como câmera, agenda, etc; através de JavaScript, HTML5 e CSS3, em vez de linguagens específicas de dispositivo, como Objective-C e Java (Android SDK). 
O desenvolvimento é como o de qualquer site e por isso oferece uma maior facilidade de aprendizado. Dispensando, por exemplo, longas horas de dedicação a sistemas mais complicados, como Java, além de reduzir custos do projeto.

Outra vantagem é que as aplicações desenvolvidas são híbridas (criam uma webview) ou seja, elas não são completamente nativas (porque toda a renderização do layout é feito através de visualizações da web em vez de uma UI nativa da plataforma) nem puramente web (porque eles não são apenas aplicações web, mas são feitos como aplicativos para distribuição e possuem acesso a APIs nativas do dispositivo como citado anteriormente).

![](https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi6qcbf6sTjAhXDDbkGHf_1B_oQjRx6BAgBEAU&url=https%3A%2F%2Fbuild.phonegap.com%2F&psig=AOvVaw0VKk_8MnCKoqeJbdZVBuWt&ust=1563757728562271)
