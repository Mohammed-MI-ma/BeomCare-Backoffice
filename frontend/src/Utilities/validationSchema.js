import * as yup from "yup";

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail invalide")
    .required("L'e-mail est obligatoire"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),
  confirmedPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    )
    .required("Veuillez confirmer votre mot de passe"),
  phoneNumber: yup.string().required("Le numéro de téléphone est obligatoire"),
  termsOfServiceAccepted: yup
    .bool()
    .oneOf([true], "Vous devez accepter les conditions d'utilisation"),
  privacyPolicyAccepted: yup
    .bool()
    .oneOf([true], "Vous devez accepter la politique de confidentialité"),
  recaptchaToken: yup.string().required("Veuillez compléter le reCAPTCHA"),
});
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail invalide")
    .required("L'e-mail est obligatoire"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),

  recaptchaToken: yup.string().required("Veuillez compléter le reCAPTCHA"),
});
