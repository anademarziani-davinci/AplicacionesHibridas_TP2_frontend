import * as yup from "yup"

export const registerSchema = yup.object({
    email: yup.string().email("Tiene que ser un mail válido").required("El campo email es obligatorio"),
    password: yup.string().required()
        .min(8, "La contraseña debe tener como minimo 8 caracteres")
        .matches(/[0-9]/, "La contraseña debe tener al menos un numero")
        .matches(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
        .matches(/[a-z]/, "La contraseña debe tener al menos una minuscula")
        .matches(/[@#$%&()=?-]/, "La contraseña debe tener un caracter especial"),
    passwordConfirm: yup.string().required().oneOf( [ yup.ref("password") ], "Las contraseñas tienen que ser iguales" ),
    age: yup.number().positive().optional()
})

export const loginSchema = yup.object({
    email: yup.string().email("Tiene que ser un mail valido").required("El campo email es obligatorio"),
    password: yup.string().required()
})