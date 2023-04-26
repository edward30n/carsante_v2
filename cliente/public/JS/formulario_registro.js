
$(document).ready(function () {
    // evento clic del botón ingresar
    $('#btn_registrarse').click(function (e) {
        e.preventDefault(); // previene la acción por defecto del botón
        const url = "api/v1/carSante/createUser";
        var nombre1 = $('#nombre1_registro').val();
        var nombre_sec1 = $('#nombre2_registro').val();
        var apellido1 = $('#apellido1_registro').val();
        var apellido_sec1 = $('#apellido2_registro').val();
        var correo1 = $('#correo_registro').val();
        var telefono1 = $('#telefono_registro').val();
        var fecha_nac1 = $('#nacimiento_registro').val();
        var clave1 = $('#contrasena_registro').val();
        var codigo_activacion1 = $('#codigo_registro').val();
        const data = {
            nombre: nombre1,
            nombre_sec: nombre_sec1,
            apellido: apellido1,
            apellido_sec: apellido_sec1,
            correo: correo1,
            telefono: telefono1,
            fecha_nac: fecha_nac1,
            clave: clave1,
            codigo_activacion: codigo_activacion1
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                alert('Registro exitoso');
                window.location.href = 'login.html';
                return response.json();
            } else {
                alert('Registro invalido');
                throw new Error("Error en la solicitud");
            }
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    });
});
