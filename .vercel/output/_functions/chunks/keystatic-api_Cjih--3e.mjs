import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, singleton, fields, collection } from '@keystatic/core';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const config = config$1({
  storage: {
    kind: "local"
  },
  collections: {
    heroSlides: collection({
      label: "Hero Slides (Conferencias/Novedades)",
      slugField: "title",
      path: "src/content/heroSlides/*",
      entryLayout: "form",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Título de la Diapositiva" } }),
        description: fields.text({ label: "Descripción / Subtítulo", multiline: true }),
        backgroundImage: fields.image({
          label: "Imagen de Fondo",
          directory: "public/images/hero",
          publicPath: "/images/hero"
        }),
        ctaLink: fields.text({ label: "Enlace del CTA (ej. Formulario de Google)" }),
        ctaLabel: fields.text({ label: "Texto del Botón CTA", defaultValue: "Registrarse Ahora" })
      }
    }),
    events: collection({
      label: "Otros Eventos",
      slugField: "title",
      path: "src/content/events/*",
      entryLayout: "form",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Título del Evento" } }),
        date: fields.text({ label: "Fecha del Evento" }),
        location: fields.text({ label: "Ubicación / Modalidad" }),
        image: fields.image({
          label: "Imagen del Evento",
          directory: "public/images/events",
          publicPath: "/images/events"
        }),
        ctaLink: fields.text({ label: "Enlace del Botón" }),
        ctaLabel: fields.text({ label: "Texto del Botón", defaultValue: "Saber Más" })
      }
    }),
    videos: collection({
      label: "Sección Videos",
      slugField: "title",
      path: "src/content/videos/*",
      entryLayout: "form",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Título del Video" } }),
        youtubeUrl: fields.text({ label: "URL de YouTube" }),
        thumbnail: fields.image({
          label: "Imagen de Miniatura",
          directory: "public/images/videos",
          publicPath: "/images/videos"
        })
      }
    })
  },
  singletons: {
    cepev: singleton({
      label: "Sección CEPEV",
      path: "src/content/cepev",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Título Principal de CEPEV" }),
        description: fields.text({ label: "Descripción de CEPEV", multiline: true }),
        ctaLink: fields.text({ label: "Enlace del Botón (Formulario)" }),
        ctaLabel: fields.text({ label: "Texto del Botón", defaultValue: "Inscribirse en CEPEV" }),
        rotations: fields.array(
          fields.object({
            type: fields.select({
              label: "Tipo de Bloque",
              options: [
                { label: "Versículo", value: "versiculo" },
                { label: "Frase del día", value: "frase" },
                { label: "Grito de guerra", value: "grito" },
                { label: "Inmersión", value: "inmersion" }
              ],
              defaultValue: "frase"
            }),
            content: fields.text({ label: "Contenido del Texto", multiline: true }),
            author: fields.text({ label: "Autor o Referencia (Opcional)" })
          }),
          {
            label: "Bloques de Texto Rotativos (Versículo, Frase, Grito, Inmersión)",
            itemLabel: (item) => `${item.fields.type.value}: ${item.fields.content.value?.substring(0, 30) || ""}...`
          }
        )
      }
    }),
    pac: singleton({
      label: "Sección PAC",
      path: "src/content/pac",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Título Sección PAC" }),
        description: fields.text({ label: "Descripción PAC", multiline: true }),
        ctaLink: fields.text({ label: "Enlace del CTA General" }),
        ctaLabel: fields.text({ label: "Texto del CTA General", defaultValue: "Unirse a PAC" }),
        whatIsTitle: fields.text({ label: "Título: ¿Qué es?", defaultValue: "¿Qué es PAC?" }),
        whatIsContent: fields.text({ label: "Contenido: ¿Qué es?", multiline: true }),
        whereTitle: fields.text({ label: "Título: ¿Dónde estamos?", defaultValue: "¿Dónde estamos?" }),
        whereContent: fields.text({ label: "Contenido: ¿Dónde estamos?", multiline: true }),
        howTitle: fields.text({ label: "Título: ¿Cómo ser parte?", defaultValue: "¿Cómo ser parte?" }),
        howContent: fields.text({ label: "Contenido: ¿Cómo ser parte?", multiline: true }),
        gallery: fields.array(
          fields.image({
            label: "Imagen de la Galería",
            directory: "public/images/pac",
            publicPath: "/images/pac"
          }),
          {
            label: "Galería de Imágenes (Slider)",
            itemLabel: (item) => item.value || "Imagen sin seleccionar"
          }
        )
      }
    }),
    footer: singleton({
      label: "Pie de Página (Footer)",
      path: "src/content/footer",
      format: { data: "json" },
      schema: {
        emailCepev: fields.text({ label: "Email CEPEV" }),
        emailPac: fields.text({ label: "Email PAC" }),
        localidades: fields.text({ label: "Localidades" }),
        phoneOrar: fields.text({ label: "Teléfono (Puedo Orar por Ti)" }),
        address: fields.text({ label: "Dirección del Instituto" }),
        facebookUrl: fields.text({ label: "Enlace Facebook (Opcional)" }),
        instagramUrl: fields.text({ label: "Enlace Instagram (Opcional)" }),
        youtubeUrl: fields.text({ label: "Enlace YouTube (Opcional)" })
      }
    })
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
