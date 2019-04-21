# node.js-mongoDB
<<<<<<< HEAD
En primer lugar he inicializado NPM en la carpeta en la que tengo el trabajo:

                npm init

Me va a preguntar información sobre el package que estoy haciendo.

```console
C:\Carpeta>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.
```

A rellenar y listo. Me generará un JSON: package.json

Instalo ESlint desde VSCode para que me mire el código. 0 warnings, así que palante.

        npm install eslint

O bien:

        npm i -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard

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

```
C:\Users\dnick\Desktop\github\node.js-mongoDB>npm install eslint
+ eslint@5.16.0
updated 1 package and audited 195 packages in 4.289s
found 0 vulnerabilities
```
A todo esto me falta instalar la extensión ESlint para VSCode.
=======
En este proyecto instalamos:
* Una base de datos NoSQL como mongoDB
* El módulo Node.js mongodb para podernos conectar y hacer consultas a la BD utilizando javascript. Node.js nos va a permitir ejecutar JavaScript en el lado del servidor.

El proyecto está extraído de https://www.w3schools.com/nodejs/nodejs_mongodb.asp



# Instalación Node.js
Asumiento que tenemos instalado Node y el gestor de paquetes NPM, instalaremos el módulo de Mongo en la carpeta en la que lo vamos a  utilizar
>>>>>>> 4f231177357876c1b91aa0e981c036cdf7d413e8
