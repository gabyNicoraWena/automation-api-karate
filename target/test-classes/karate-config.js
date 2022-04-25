 function fn() {
   karate.configure('connectTimeout', 30000000);
   karate.configure('readTimeout', 30000000);

   var env = karate.env; // get system property 'karate.env'
   karate.log('karate.env system property was:', env);

   if (!env) {
       env = 'int';
   }

   var data = karate.read('classpath:env_data.json');
   var env_data = data[env];
   var user_data = karate.read('classpath:user_data.json')[env];
   var config = { // base config JSON
       apiURL: env_data.apiUrl,
       apiUrl2: env_data.apiUrl2,
       randomCuil: makecuil(),
       randomEmail: makeEmail(),
       randomDevice: makeDevice(),
       randomName: makeName(),
       randomLastName: makeLastName(),
       randomPasscode: makePasscode(),
       randomLegacy: makeLegacy(),
       randomFeatureWhiteListName: featureWhiteList(),
       usuariot24: makeusuarioT24(),
       usuariobds: makeusuariobds(),
       usuariocoelsa: makeusuariocoelsa(),
       getTodayDate: getTodayDate()
   };
    function getTodayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      return yyyy + '-' + mm + '-' + dd + 'T00:00:00'
    }
   /*
   if (env == 'int')
       // over-ride only those that need to be
       config.scoringUrl = 'https://scoring-int.bdsdigital.com.ar';
   } else if (env == 'uat') {
       config.scoringUrl = 'https://scoring-uat.bdsdigital.com.ar';
   }*/

    function makeusuarioT24() {
           var temp = 'T24SRVCSLEGACY' + ':' + 'NULL';
             var Base64 = Java.type('java.util.Base64');
             var encoded = Base64.getEncoder().encodeToString(temp.toString().getBytes());
             return 'Basic ' + encoded;
       }

    function makeusuariobds() {
           var temp = '102399' + ':' + '123456';
             var Base64 = Java.type('java.util.Base64');
             var encoded = Base64.getEncoder().encodeToString(temp.toString().getBytes());
             return 'Basic ' + encoded;
       }

    function makeusuariocoelsa() {
                var temp = 'T24SRVCSLEGACY' + ':' + 'NULL';
                  var Base64 = Java.type('java.util.Base64');
                  var encoded = Base64.getEncoder().encodeToString(temp.toString().getBytes());
                  return 'Basic ' + encoded;
            }


    function makeLegacy() {
           var text = "LEGACY";
           var random  = "0123456789";
           for (var i = 0; i < 10; i++)
               text += random.charAt(Math.floor(Math.random() * random.length));
           return text;
       }

   function makeName() {
       var name = "Juan";
       var random = "abcdefghijklmnopqrstuvwxyz";
       for (var i = 0; i < 13; i++)
           name += random.charAt(Math.floor(Math.random() * random.length));
       return name;
   }

   function featureWhiteList() {
          var feature = "WhiteListFeatureTest";
          var random = "abcdefghijklmnopqrstuvwxyz";
          for (var i = 0; i < 2; i++)
              feature += random.charAt(Math.floor(Math.random() * random.length));
          return feature;
      }

   function makeLastName() {
       var lastname = "Perez";
       var random = "abcdefghijklmnopqrstuvwxyz";
       for (var i = 0; i < 13; i++)
           lastname += random.charAt(Math.floor(Math.random() * random.length));
       return lastname;
   }

   function makeEmail() {
       var text = "bdsolqe";
       var random = "a1b2c3d4e5f6g7";
       for (var i = 0; i < 10; i++)
           text += random.charAt(Math.floor(Math.random() * random.length));
       return text + '@gmail.com';
   }

   function makeDevice() {
     var uuid = java.util.UUID.randomUUID() + '';
     karate.set('prevUuid', uuid);
     return uuid;
   }

   function makecuil() {
       var dni = "";
         var random = "0123456789";
         for (var i = 0; i < 8; i++)
         dni += random.charAt(Math.floor(Math.random() * random.length));

       var HOMBRE = ["HOMBRE", "M", "MALE"];
       var MUJER = ["MUJER", "F", "FEMALE"];
       var SOCIEDAD = ["SOCIEDAD", "S", "SOCIETY"];
       var document_number = dni;
       var gender = ["F"];
       var AB;
       var C;

     //let AB, C;

     if (document_number.length != 8 || isNaN(document_number)) {
       if (document_number.length == 7 && !isNaN(document_number)) {
         document_number = "0".concat(document_number);
       } else {
         throw "El numero de document_number ingresado no es correcto.";
       }
     }

     //gender = gender.toUpperCase();

     if (gender == "M") {
       AB = "20";
     } else if (gender == "F") {
       AB = "27";
     } else {
       AB = "30";
     }

     var multiplicadores = [3, 2, 7, 6, 5, 4, 3, 2];

     var calculo = parseInt(AB.charAt(0)) * 5 + parseInt(AB.charAt(1)) * 4;

     for (i = 0; i < 8; i++) {
       calculo += parseInt(document_number.charAt(i)) * multiplicadores[i];
     }

     var resto = parseInt(calculo) % 11;

     if (SOCIEDAD.indexOf(gender) < 0 && resto == 1) {
       if (HOMBRE.indexOf(gender) >= 0) {
         C = "9";
       } else {
         C = "4";
       }
       AB = "23";
     } else if (resto === 0) {
       C = "0";
     } else {
       C = 11 - resto;
     }

     var cuil = AB + document_number + C;
     return {cuil, dni};
   }

   function makePasscode() {
          var pass = "";
          var random = "123456";
             for (var i = 0; i < 6; i++)
                  pass += random.charAt(Math.floor(Math.random() * random.length));
          return "648492";
   }

   retryCount = 8;
   retryInterval = 90000;
   return config;
}

