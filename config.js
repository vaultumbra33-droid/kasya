// Único archivo que hay que editar al publicar una nueva versión.
window.KASYA = {
  version: "1.1.2",
  // Enlace directo al APK. Con GitHub Releases:
  // https://github.com/<usuario>/<repositorio>/releases/download/v1.1.2/kasya-1.1.2.apk
  apkUrl: "https://github.com/vaultumbra33-droid/kasya/releases/download/v1.1.2/kasya-1.1.2.apk",
  size: "45 MB",
  sha256: "3382f01c8847f536f109988c52c2d80b7ec118a23f4595e6a0a50ad6be9f2f20",
  changelog: [
    { version: "1.1.2", date: "2026-11-02",
      es: ["Buscar actualizaciones desde Ajustes: compara tu versión con la del sitio y te lleva a la descarga.", "Compartir KASYA: envía el enlace de descarga desde Ajustes.", "Barra inferior sin el hueco sobrante bajo las etiquetas."],
      en: ["Check for updates from Settings: compares your version with the site and takes you to the download.", "Share KASYA: send the download link from Settings.", "Bottom bar without the extra gap under the labels."] },
    { version: "1.1.1", date: "2026-11-02",
      es: ["Barra inferior compacta que se adapta a pantallas angostas (Z Fold, POCO).", "Encabezado de día de Noticias más discreto."],
      en: ["Compact bottom bar that adapts to narrow screens (Z Fold, POCO).", "More discreet day header in News."] },
    { version: "1.1.0", date: "2026-11-02",
      es: ["Pestaña Noticias en Explorar: titulares directos de los feeds de cada medio, por región y por día.", "Términos y condiciones dentro de la app y en el sitio.", "App y sitio en español e inglés, con selector de idioma."],
      en: ["News tab in Explore: headlines straight from each outlet's own feeds, by region and day.", "Terms and conditions inside the app and on the site.", "App and site in English and Spanish, with a language picker."] },
    { version: "1.0.1", date: "2026-11-02",
      es: ["Galería de capturas tipo carrusel en el sitio.", "Ajustes menores de la primera versión."],
      en: ["Screenshot carousel on the site.", "Minor fixes to the first release."] },
    { version: "1.0", date: "2026-11-01",
      es: ["Primera versión: mensajería P2P cifrada, PIN, clave de emergencia, mensajes temporales, canales y tiendas."],
      en: ["First release: encrypted P2P messaging, PIN, emergency key, disappearing messages, channels and stores."] }
  ],
  // Capturas reales de la app: { src: "assets/shots/01.png", caption: "..." }
  shots: [
    { src: "assets/shots/01-bienvenida.png", src_en: "assets/shots/01-bienvenida-en.png", caption: "Bienvenida: creas tu cuenta en segundos, sin teléfono ni correo. Términos e idioma a un toque.", caption_en: "Welcome: create your account in seconds, with no phone number or email. Terms and language one tap away.", alt: "Pantalla de bienvenida de KASYA", alt_en: "KASYA welcome screen" },
    { src: "assets/shots/03-registro-paso1-pin.png", src_en: "assets/shots/03-registro-paso1-en.png", caption: "Una contraseña numérica opcional; sirve también como tu PIN de acceso.", caption_en: "An optional numeric password; it also works as your access PIN.", alt: "Registro, paso 1: contraseña", alt_en: "Sign-up, step 1: password" },
    { src: "assets/shots/04-registro-paso2-usuario.png", src_en: "assets/shots/04-registro-paso2-en.png", caption: "Nombre de usuario opcional: puedes saltarlo.", caption_en: "Optional username: you can skip it.", alt: "Registro, paso 2: nombre de usuario", alt_en: "Sign-up, step 2: username" },
    { src: "assets/shots/05-registro-paso3-perfil.png", src_en: "assets/shots/05-registro-paso3-en.png", caption: "Perfil opcional: nombre y foto, o hazlo después.", caption_en: "Optional profile: name and photo, or do it later.", alt: "Registro, paso 3: perfil", alt_en: "Sign-up, step 3: profile" },
    { src: "assets/shots/06-bloqueo-pin.png", es_only: true, caption: "KASYA se abre solo con tu PIN.", alt: "Pantalla de bloqueo con PIN" },
    { src: "assets/shots/08-chats.png", es_only: true, caption: "Tus chats (conversaciones de ejemplo, con cuentas de prueba).", alt: "Pantalla de chats" },
    { src: "assets/shots/08b-conversacion.png", es_only: true, caption: "Una conversación: cifrada de extremo a extremo (cuentas de prueba).", alt: "Conversación en KASYA" },
    { src: "assets/shots/10-noticias.png", src_en: "assets/shots/10-noticias-en.png", caption: "Explorar > Noticias: titulares directos de los feeds de cada medio, ordenados por día.", caption_en: "Explore > News: headlines straight from each outlet's own feed, grouped by day.", alt: "Pestaña Noticias", alt_en: "News tab" },
    { src: "assets/shots/11-noticias-mexico.png", src_en: "assets/shots/11-noticias-latam-en.png", caption: "Filtra por región: México, Latinoamérica, Europa, Rusia, China, Medio Oriente y más.", caption_en: "Filter by region: Mexico, Latin America, Europe, Russia, China, Middle East and more.", alt: "Noticias de México", alt_en: "Latin America news" },
    { src: "assets/shots/12-terminos.png", src_en: "assets/shots/12-terminos-en.png", caption: "Términos y condiciones dentro de la app, en español e inglés.", caption_en: "Terms and conditions inside the app, in English and Spanish.", alt: "Términos y condiciones", alt_en: "Terms and conditions" },
    { src: "assets/shots/16-manual.png", es_only: true, caption: "Manual de usuario dentro de la app.", alt: "Manual de usuario en la app" }
  ]
};
