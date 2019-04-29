- [Proyecto node.js + mongoDB](#proyecto-nodejs--mongodb)
  - [MongoDB](#mongodb)
    - [Instalación de módulo de MongoDB para Node.js](#instalaci%C3%B3n-de-m%C3%B3dulo-de-mongodb-para-nodejs)
  - [Node.js](#nodejs)
    - [Dirigido a eventos](#dirigido-a-eventos)
    - [Ejecución asíncrona](#ejecuci%C3%B3n-as%C3%ADncrona)
    - [Sistema de módulos](#sistema-de-m%C3%B3dulos)
  - [Creación del proyecto](#creaci%C3%B3n-del-proyecto)
  - [Personalización de VSCode](#personalizaci%C3%B3n-de-vscode)
    - [Linting de JS](#linting-de-js)
  - [Dockerizando la aplicación](#dockerizando-la-aplicaci%C3%B3n)

# Proyecto node.js + mongoDB

En este proyecto instalamos:

- Una base de datos NoSQL como **mongoDB**
- El módulo Node.js mongodb para podernos conectar y hacer consultas a la BD utilizando javascript. Node.js nos va a permitir ejecutar JavaScript en el lado del servidor.

El proyecto está extraído de https://www.w3schools.com/nodejs/nodejs_mongodb.asp

## MongoDB

Vamos a utilizar como BD **MongoDB**, en este caso la versión 4.0.9. Tenemos varias opciones:

- Instalarlo como servicio en la máquina (mi caso)
- Dockerizarlo a partir de una imagen de **MongoDB** y levantarlo como contenedor
- Desplegarlo como SAAS utilizando **MongoDB Atlas**

### Instalación de módulo de MongoDB para Node.js

Asumiento que tenemos instalado **Node.js** y el gestor de paquetes **NPM**, instalaremos el módulo de Mongo en la carpeta en la que lo vamos a  utilizar

## Node.js

### Dirigido a eventos

Prácticamente todo el código estará escrito de tal manera que:

- O bien responde a un evento concreto
- O él mismo dispara un evento

### Ejecución asíncrona

### Sistema de módulos

El código se agrupa en módulos para hacerlo lo más reutilizable posible. Node utiliza un sistema de **módulos*- que nos permite organizar mejor nuestro código. Básicamente:

- Escribimos un código que realiza una tarea en particular
- Exportamos el código como un módulo que sirve para un propósito determinado.

De este modo, cuando queramos reutilizar el código en cualquier otro lugar del proyecto, únicamente debemos
requerir (importar) dicho módulo.

Utilizando este sistema:

- Podemos reutilizar una funcionalidad de un modo en cualquier archivo
- Los archivos de un módulo actúan como un espacio de nombres privado

## Creación del proyecto

En primer lugar he inicializado NPM en la carpeta en la que tengo el trabajo:

    npm init

Me va a preguntar información sobre el package que estoy haciendo.

```console
C:\Carpeta>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.
```

A rellenar y listo. Me generará un JSON: package.json

## Personalización de VSCode

### Linting de JS

Instalo ESlint desde VSCode para que me mire el código. 0 warnings, así que palante.

    npm install eslint

O bien:

```console
npm i -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard
```

Por último he creado el archivo .eslintrc.js y lo he modificado para que contenga las siguientes reglas.

```js
module.exports = {
    "extends": "standard",
    "rules": {
        'semi': [1, 'always']
    }
  };
```

Se ha deshabilitado la recomendación de quitar puntoycomas porque era un coñazo.

```console
C:\Users\dnick\Desktop\github\node.js-mongoDB>npm install eslint
+ eslint@5.16.0
updated 1 package and audited 195 packages in 4.289s
found 0 vulnerabilities
```

A todo esto me falta instalar la extensión ESlint para VSCode.

## Dockerizando la aplicación

Aprovechando que VSCode me detecta el dockerfile y me sugiere la instalación de una extensión para docker,
me doy cuenta que la extensión te autogenera los dockerfiles y dockercomposes a partir del código fuente, siempre que le digas:

- El framework/tecnología utilizado, en mi caso Node.js
- El puerto que va a exponer

A partir de esto el tio te mira que imagen de docker para Node.js es la última, en este caso una creada a partir de alpine y versión Nodejo 10.13. Veremos si es compatible

Levantamos el contenedor y vemos que:

1. Me descarga la imagen **node:10.13-alpine**
2. Me crea las variables de entorno (pues muy bien)
3. Me define la carpeta de workspace del contenedor
4. Me copia los ficheros package.json, necesarios para instalar dependencias, entre otras cosas
5. Me instalo la aplicación, con lo que se me descargan los módulos necesarios
6. Copio todo el código al contenedor
7. Expongo el puerto
8. Arranco el servidor

Al ataquer.

```docker
C:\Users\dnick\Desktop\github\node.js-mongoDB>docker-compose up
Creating network "nodejs-mongodb_default" with the default driver
Building node.js-mongodb
Step 1/8 : FROM node:10.13-alpine
10.13-alpine: Pulling from library/node
4fe2ade4980c: Pull complete
c245f6a8ecc5: Pull complete
82bdc9503d50: Pull complete
Digest: sha256:22c8219b21f86dfd7398ce1f62c48a022fecdcf0ad7bf3b0681131bd04a023a2
Status: Downloaded newer image for node:10.13-alpine
 ---> 93f2dcbcddfe
Step 2/8 : ENV NODE_ENV production
 ---> Running in 81f8a0e3f21b
Removing intermediate container 81f8a0e3f21b
 ---> dfed64966883
Step 3/8 : WORKDIR /usr/src/app
 ---> Running in 9e22183ca941
Removing intermediate container 9e22183ca941
 ---> 26a899761b57
Step 4/8 : COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
 ---> e65fb9cc24da
Step 5/8 : RUN npm install --production --silent && mv node_modules ../
 ---> Running in 4075010507b2
added 200 packages from 199 contributors and audited 674 packages in 6.162s
found 0 vulnerabilities

Removing intermediate container 4075010507b2
 ---> 114be1d446b8
Step 6/8 : COPY . .
 ---> 103c97925487
Step 7/8 : EXPOSE 3000
 ---> Running in 5348ace55bbc
Removing intermediate container 5348ace55bbc
 ---> f25b6ec0359b
Step 8/8 : CMD node server.js
 ---> Running in 25b791998b92
Removing intermediate container 25b791998b92
 ---> fd975f1306ed
Successfully built fd975f1306ed
Successfully tagged node.js-mongodb:latest
WARNING: Image for service node.js-mongodb was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating nodejs-mongodb_node.js-mongodb_1 ... done
Attaching to nodejs-mongodb_node.js-mongodb_1
node.js-mongodb_1  | Mon, 22 Apr 2019 15:18:47 GMT body-parser deprecated undefined extended: provide extended option at server/configure.js:32:22
node.js-mongodb_1  | Server up: http://localhost:3300
Gracefully stopping... (press Ctrl+C again to force)
Stopping nodejs-mongodb_node.js-mongodb_1 ... done

```

E voilà, funciona. Servidor levantado y funcionando. Al principio tarda porque descarga la imagen base y crea la imagen final,
pero las siguientes veces que levanto el contenedor está ready en segundos.

```js
Recreating nodejs-mongodb_node.js-mongodb_1 ... done
Attaching to nodejs-mongodb_node.js-mongodb_1
node.js-mongodb_1  | Mon, 22 Apr 2019 15:27:13 GMT body-parser deprecated undefined extended: provide extended option at server/configure.js:32:22
node.js-mongodb_1  | Server up: http://localhost:3300
node.js-mongodb_1  | GET / 200 43.832 ms - 6410
node.js-mongodb_1  | GET /public/css/styles.css 404 6.451 ms - 160
node.js-mongodb_1  | GET /public/js/scripts.js 404 3.577 ms - 159
node.js-mongodb_1  | GET /public/upload/sample1.jpg 404 2.739 ms - 164
node.js-mongodb_1  | GET /public/upload/sample2.jpg 404 3.656 ms - 164
node.js-mongodb_1  | GET /public/upload/sample3.jpg 404 3.561 ms - 164
node.js-mongodb_1  | GET /public/upload/sample4.jpg 404 3.393 ms - 164
node.js-mongodb_1  | GET /public/js/scripts.js 404 0.555 ms - 159
node.js-mongodb_1  | GET /favicon.ico 404 0.382 ms - 150
node.js-mongodb_1  | GET /images/3 200 13.613 ms - 7746
node.js-mongodb_1  | GET /public/css/styles.css 404 1.650 ms - 160
node.js-mongodb_1  | GET /public/js/scripts.js 404 1.652 ms - 159
node.js-mongodb_1  | GET /public/upload/sample1.jpg 404 1.097 ms - 164
node.js-mongodb_1  | GET /public/js/scripts.js 404 0.390 ms - 159
```

Lo curioso es que la imagen ocupa unos 100 MB, con código y módulos incluídos.

```docker
C:\Users\dnick\Desktop\github\node.js-mongoDB>docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
node.js-mongodb                 latest              fd975f1306ed        11 minutes ago      103MB
```
