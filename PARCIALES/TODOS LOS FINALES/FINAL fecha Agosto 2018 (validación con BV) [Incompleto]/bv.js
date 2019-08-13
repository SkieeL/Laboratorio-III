//AL TERMINAR DE CARGAR TODO EL DOM, SE ASIGNAN LOS MANEJADORES DE EVENTOS
$(document).ready(function () {
    ValidatorLogin();
    ValidatorRegistro();
});

function ValidatorLogin() {
    $("#loginForm").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacío'
                    },
                    emailAddress: {
                        message: 'El formato del campo es inválido'
                    }
                }
            },
            txtClave: {
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacío'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'Este campo debe tener entre 4 y 8 caracteres'
                    }
                }
            }
        }
    });
}

function ValidatorRegistro() {
    $("#registroForm").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtApellido: {
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacío'
                    },
                    stringLength: {
                        max: 15,
                        message: 'Este campo no debe tener más de 15 caracteres'
                    }
                }
            },
            txtNombre: {
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacío'
                    },
                    stringLength: {
                        max: 10,
                        message: 'Este campo no debe tener más de 10 caracteres'
                    }
                }
            },
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacío'
                    },
                    emailAddress: {
                        message: 'El formato del campo es inválido'
                    }
                }
            },
            txtLegajo: {
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacío'
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: 'Este campo debe tener un valor entre 100 y 999.999'
                    },
                    integer:{
                        message:'Este campo debe tener únicamente números'
                    }
                }
            },
            fileFoto: {
                validators: {
                    notEmpty: {
                        message: 'Debe cargar una imagen'
                    },
                    file: {
                        extension: 'jpg,png',
                        type: 'image/jpeg,image/png',
                        //maxSize: 699392, //=> 1024 * 683 //2097152 => 2048 * 1024
                        message: 'La extensión del archivo seleccionado no es válida'
                    },
                }
            },
            txtClave: {
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacío'
                    },
                    identical: {
                        field: 'txtConfirmar',
                        message: 'La contraseña y su confirmación no coinciden'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'Este campo debe tener entre 4 y 8 caracteres'
                    }
                    
                }
            },
            txtConfirmar: {
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacío'
                    },
                    identical: {
                        field: 'txtClave',
                        message: 'La contraseña y su confirmación no coinciden'
                    }
                }
            }
            
        }
    });
}