import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    heroSlides: collection({
      label: 'Hero Slides (Conferencias/Novedades)',
      slugField: 'title',
      path: 'src/content/heroSlides/*',
      entryLayout: 'form',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Título de la Diapositiva' } }),
        description: fields.text({ label: 'Descripción / Subtítulo', multiline: true }),
        backgroundImage: fields.image({
          label: 'Imagen de Fondo',
          directory: 'public/images/hero',
          publicPath: '/images/hero',
        }),
        ctaLink: fields.text({ label: 'Enlace del CTA (ej. Formulario de Google)' }),
        ctaLabel: fields.text({ label: 'Texto del Botón CTA', defaultValue: 'Registrarse Ahora' }),
      },
    }),
    events: collection({
      label: 'Otros Eventos',
      slugField: 'title',
      path: 'src/content/events/*',
      entryLayout: 'form',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Título del Evento' } }),
        date: fields.text({ label: 'Fecha del Evento' }),
        location: fields.text({ label: 'Ubicación / Modalidad' }),
        image: fields.image({
          label: 'Imagen del Evento',
          directory: 'public/images/events',
          publicPath: '/images/events',
        }),
        ctaLink: fields.text({ label: 'Enlace del Botón' }),
        ctaLabel: fields.text({ label: 'Texto del Botón', defaultValue: 'Saber Más' }),
      },
    }),
    videos: collection({
      label: 'Sección Videos',
      slugField: 'title',
      path: 'src/content/videos/*',
      entryLayout: 'form',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Título del Video' } }),
        youtubeUrl: fields.text({ label: 'URL de YouTube' }),
        thumbnail: fields.image({
          label: 'Imagen de Miniatura',
          directory: 'public/images/videos',
          publicPath: '/images/videos',
        }),
      },
    }),
  },
  singletons: {
    cepev: singleton({
      label: 'Sección CEPEV',
      path: 'src/content/cepev',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Título Principal de CEPEV' }),
        description: fields.text({ label: 'Descripción de CEPEV', multiline: true }),
        ctaLink: fields.text({ label: 'Enlace del Botón (Formulario)' }),
        ctaLabel: fields.text({ label: 'Texto del Botón', defaultValue: 'Inscribirse en CEPEV' }),
        rotations: fields.array(
          fields.object({
            type: fields.select({
              label: 'Tipo de Bloque',
              options: [
                { label: 'Versículo', value: 'versiculo' },
                { label: 'Frase del día', value: 'frase' },
                { label: 'Grito de guerra', value: 'grito' },
                { label: 'Inmersión', value: 'inmersion' },
              ],
              defaultValue: 'frase',
            }),
            content: fields.text({ label: 'Contenido del Texto', multiline: true }),
            author: fields.text({ label: 'Autor o Referencia (Opcional)' }),
          }),
          {
            label: 'Bloques de Texto Rotativos (Versículo, Frase, Grito, Inmersión)',
            itemLabel: (item) => `${item.fields.type.value}: ${item.fields.content.value?.substring(0, 30) || ''}...`,
          }
        ),
      },
    }),
    pac: singleton({
      label: 'Sección PAC',
      path: 'src/content/pac',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Título Sección PAC' }),
        description: fields.text({ label: 'Descripción PAC', multiline: true }),
        ctaLink: fields.text({ label: 'Enlace del CTA General' }),
        ctaLabel: fields.text({ label: 'Texto del CTA General', defaultValue: 'Unirse a PAC' }),
        whatIsTitle: fields.text({ label: 'Título: ¿Qué es?', defaultValue: '¿Qué es PAC?' }),
        whatIsContent: fields.text({ label: 'Contenido: ¿Qué es?', multiline: true }),
        whereTitle: fields.text({ label: 'Título: ¿Dónde estamos?', defaultValue: '¿Dónde estamos?' }),
        whereContent: fields.text({ label: 'Contenido: ¿Dónde estamos?', multiline: true }),
        howTitle: fields.text({ label: 'Título: ¿Cómo ser parte?', defaultValue: '¿Cómo ser parte?' }),
        howContent: fields.text({ label: 'Contenido: ¿Cómo ser parte?', multiline: true }),
        gallery: fields.array(
          fields.image({
            label: 'Imagen de la Galería',
            directory: 'public/images/pac',
            publicPath: '/images/pac',
          }),
          {
            label: 'Galería de Imágenes (Slider)',
            itemLabel: (item) => item.value || 'Imagen sin seleccionar',
          }
        ),
      },
    }),
    footer: singleton({
      label: 'Pie de Página (Footer)',
      path: 'src/content/footer',
      format: { data: 'json' },
      schema: {
        emailCepev: fields.text({ label: 'Email CEPEV' }),
        emailPac: fields.text({ label: 'Email PAC' }),
        localidades: fields.text({ label: 'Localidades' }),
        phoneOrar: fields.text({ label: 'Teléfono (Puedo Orar por Ti)' }),
        address: fields.text({ label: 'Dirección del Instituto' }),
        facebookUrl: fields.text({ label: 'Enlace Facebook (Opcional)' }),
        instagramUrl: fields.text({ label: 'Enlace Instagram (Opcional)' }),
        youtubeUrl: fields.text({ label: 'Enlace YouTube (Opcional)' }),
      },
    }),
  },
});
