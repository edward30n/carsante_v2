$(document).ready(function(){
  // evento clic del botón ingresar
  $('#btn_ingresar').click(function(e){
      e.preventDefault(); // previene la acción por defecto del botón
      // obtener valores del formulario
      var usuario = $('#usuario').val();
      var contrasena = $('#contrasena').val();
      // realizar la solicitud AJAX al servidor
      $.ajax({
          url: 'api/v1/carSante/' + usuario + '/' + contrasena,
          type: 'GET',
          dataType: 'json',
          success: function(data){
              // el usuario fue encontrado en la base de datos
              alert(data.mensaje);
              // redireccionar a la página de inicio del usuario
              window.location.href = 'inicio.html';
          },
          error: function(jqXHR, textStatus, errorThrown){
              // hubo un error en la solicitud AJAX
              console.log(textStatus + ': ' + errorThrown);
              if (jqXHR.status == 404) {
                // no se encontró el usuario en la base de datos
                alert('Usuario o contraseña incorrectos, intente nuevamente.');
            } else if (jqXHR.status == 500) {
                // error de la base de datos
                alert('Hubo un error en el servidor');
            }
        }
    });
  });
});
