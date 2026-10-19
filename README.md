# Lurkide — Ingeniería sanitaria y ambiental

Landing corporativa responsive basada en `LandingLurkide.pdf`, desarrollada con HTML semántico, CSS personalizado, JavaScript nativo y Bootstrap 5.3.3. Las secciones y textos del documento se conservaron, junto con el logo original. La paleta parte de su azul profundo, verde y turquesa.

## Tipografía y diseño

Se eligió **Manrope** para títulos, navegación y botones, por su carácter profesional y geométrico. **Source Sans 3** se usa en párrafos, formularios y textos de apoyo por su legibilidad. Ambas se cargan desde Google Fonts con fuentes de sistema como alternativa.

El diseño combina una portada editorial de dos columnas, fotografías realistas, listados numerados, un proceso de tres etapas, bloques institucionales y llamadas a la acción claras. Las fotografías son imágenes originales generadas para ilustrar ingeniería y trabajo de campo; no se presentan como fotografías de proyectos o personas reales de Lurkide. Se optimizaron a WebP y están guardadas en el almacenamiento del proyecto.

## Estructura

`public/index.html` contiene todas las secciones, la metadata y la estructura accesible. `public/css/styles.css` define la identidad y los puntos de ruptura. `public/js/main.js` gestiona navegación, consulta de servicios y validación del formulario. `public/vendor/` contiene Bootstrap localmente. `public/assets/` contiene el logo original y copias de los recursos optimizados. `public/manus-routes.json` declara la única página del sitio. `app.config.ts` define el logo para la identidad del proyecto.

## Contacto

El formulario valida Nombre, Barrio / Consorcio, Dirección, Teléfono y Mensaje. Al completarlo, prepara los enlaces para enviar la consulta por correo o WhatsApp. El visitante elige el canal y confirma el envío en su aplicación; el sitio no simula que un mensaje fue enviado ni almacena los datos.

El pedido del checklist “Qué hacer ante una intimación del AdA” se incluye en la consulta cuando la casilla está marcada. El envío automático por correo no está habilitado: esa función no fue seleccionada en el plan aprobado y requiere un servicio de correo y el material final del checklist.

## Desarrollo y publicación

En la raíz del proyecto, ejecutar:

```bash
python3 -m http.server 3000 --bind 0.0.0.0 --directory public
```

El proyecto está configurado para publicación estática desde `public`, sin compilación. Los recursos `/manus-storage/` son resueltos por la vista previa y por el alojamiento de Manus; una petición directa al servidor local no pasa por esa capa. Para otro alojamiento, las imágenes están en `public/assets/` y sus rutas pueden cambiarse a las copias locales.

Antes de definir una URL canonical o `og:url`, se debe configurar el dominio público real. No se ha supuesto que `www.lurkide.com.ar` esté conectado al proyecto; figura como dato de contacto aportado en el documento.
