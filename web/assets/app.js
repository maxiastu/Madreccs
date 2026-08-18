/**
 * MADRE Trattoria - comportamiento del sitio.
 * Sin dependencias. Cada bloque se activa solo si su marcado existe en la pagina.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * CONFIGURACION DEL NEGOCIO
   * Rellena estos datos y el sitio activa automaticamente WhatsApp,
   * el telefono y el enlace al mapa. Si se dejan vacios, la pagina
   * sigue funcionando y esas acciones se ocultan en vez de romperse.
   * ------------------------------------------------------------------ */
  var SITE = {
    whatsapp: '',                 // Solo digitos con codigo de pais. Ej: '584121234567'
    telefono: '',                 // Formato visible. Ej: '+58 412 123 4567'
    direccion: 'Chacao, Caracas, Venezuela',
    mapsUrl: '',                  // Enlace de Google Maps del local
    instagram: '',                // Ej: 'https://instagram.com/madre.trattoria'
    horario: [
      { dias: 'Martes a Jueves', horas: '12:00 - 22:00' },
      { dias: 'Viernes y Sábado', horas: '12:00 - 23:30' },
      { dias: 'Domingo', horas: '12:00 - 21:00' },
      { dias: 'Lunes', horas: 'Cerrado' }
    ]
  };

  function has(valor) {
    return typeof valor === 'string' && valor.trim().length > 0;
  }

  function $(sel, raiz) {
    return (raiz || document).querySelector(sel);
  }

  function $$(sel, raiz) {
    return Array.prototype.slice.call((raiz || document).querySelectorAll(sel));
  }

  /* ------------------------------------------------------------------ *
   * NAVEGACION POR ANCLAS
   * Compensa la altura del header fijo para que el titulo de la seccion
   * no quede oculto detras de la barra.
   * ------------------------------------------------------------------ */
  function alturaHeader() {
    var header = $('[data-header]');
    return header ? header.offsetHeight : 0;
  }

  function irASeccion(id) {
    var destino = document.getElementById(id);
    if (!destino) return false;
    var y = destino.getBoundingClientRect().top + window.pageYOffset - alturaHeader() - 8;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(y, 0), behavior: reduce ? 'auto' : 'smooth' });
    // Mueve el foco por accesibilidad sin provocar un segundo salto.
    destino.setAttribute('tabindex', '-1');
    destino.focus({ preventScroll: true });
    return true;
  }

  document.addEventListener('click', function (evento) {
    var enlace = evento.target.closest('a[href^="#"]');
    if (!enlace) return;
    var id = enlace.getAttribute('href').slice(1);
    if (!id) return;
    if (irASeccion(id)) {
      evento.preventDefault();
      history.replaceState(null, '', '#' + id);
      cerrarMenu();
    }
  });

  /* ------------------------------------------------------------------ *
   * MENU MOVIL
   * Panel lateral accesible: bloquea el scroll de fondo, cierra con ESC,
   * con clic fuera y devuelve el foco al boton que lo abrio.
   * ------------------------------------------------------------------ */
  var botonMenu = $('[data-menu-toggle]');
  var panelMenu = $('[data-menu-panel]');
  var fondoMenu = $('[data-menu-backdrop]');

  function menuAbierto() {
    return !!panelMenu && panelMenu.dataset.open === 'true';
  }

  function abrirMenu() {
    if (!panelMenu) return;
    panelMenu.dataset.open = 'true';
    panelMenu.classList.remove('translate-x-full');
    if (fondoMenu) fondoMenu.classList.remove('pointer-events-none', 'opacity-0');
    if (botonMenu) botonMenu.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var primero = $('a, button', panelMenu);
    if (primero) primero.focus();
  }

  function cerrarMenu() {
    if (!panelMenu || !menuAbierto()) return;
    panelMenu.dataset.open = 'false';
    panelMenu.classList.add('translate-x-full');
    if (fondoMenu) fondoMenu.classList.add('pointer-events-none', 'opacity-0');
    if (botonMenu) {
      botonMenu.setAttribute('aria-expanded', 'false');
      botonMenu.focus();
    }
    document.body.style.overflow = '';
  }

  if (botonMenu) {
    botonMenu.addEventListener('click', function () {
      if (menuAbierto()) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });
  }

  if (fondoMenu) fondoMenu.addEventListener('click', cerrarMenu);

  $$('[data-menu-close]').forEach(function (boton) {
    boton.addEventListener('click', cerrarMenu);
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && menuAbierto()) cerrarMenu();
  });

  /* ------------------------------------------------------------------ *
   * ACCIONES CONFIGURABLES (WhatsApp, telefono, mapa, Instagram)
   * Si el dato no esta configurado el elemento se oculta, en lugar de
   * dejar un enlace roto en produccion.
   * ------------------------------------------------------------------ */
  function urlWhatsApp(mensaje) {
    if (!has(SITE.whatsapp)) return '';
    var base = 'https://wa.me/' + SITE.whatsapp.replace(/\D/g, '');
    return mensaje ? base + '?text=' + encodeURIComponent(mensaje) : base;
  }

  function aplicarConfig() {
    $$('[data-requiere]').forEach(function (el) {
      if (!has(SITE[el.dataset.requiere])) el.hidden = true;
    });

    $$('[data-whatsapp]').forEach(function (el) {
      var url = urlWhatsApp(el.dataset.whatsapp);
      if (url) el.href = url;
    });

    $$('[data-telefono]').forEach(function (el) {
      if (!has(SITE.telefono)) return;
      el.href = 'tel:' + SITE.telefono.replace(/[^\d+]/g, '');
      if (el.dataset.telefono === 'texto') el.textContent = SITE.telefono;
    });

    $$('[data-maps]').forEach(function (el) {
      if (has(SITE.mapsUrl)) el.href = SITE.mapsUrl;
    });

    $$('[data-instagram]').forEach(function (el) {
      if (has(SITE.instagram)) el.href = SITE.instagram;
    });

    $$('[data-direccion]').forEach(function (el) {
      el.textContent = SITE.direccion;
    });

    var horario = $('[data-horario]');
    if (horario) {
      horario.innerHTML = SITE.horario.map(function (fila) {
        return '<div class="flex justify-between gap-gutter py-2 border-b border-outline-variant/20">' +
          '<span class="font-body-md text-body-md text-on-surface-variant">' + fila.dias + '</span>' +
          '<span class="font-body-md text-body-md text-on-surface">' + fila.horas + '</span>' +
          '</div>';
      }).join('');
    }

    $$('[data-anio]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ------------------------------------------------------------------ *
   * FORMULARIO DE RESERVAS
   * Validacion en cliente con mensajes accesibles. No hay backend: al
   * enviar se muestra una confirmacion y, si WhatsApp esta configurado,
   * se ofrece enviar la solicitud por ese canal.
   * ------------------------------------------------------------------ */
  var formulario = $('[data-reserva-form]');

  var REGLAS = {
    nombre: function (valor) {
      if (!valor.trim()) return 'Escribe tu nombre.';
      if (valor.trim().length < 2) return 'El nombre es demasiado corto.';
      return '';
    },
    fecha: function (valor) {
      if (!valor) return 'Elige una fecha.';
      var hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      var elegida = new Date(valor + 'T00:00:00');
      if (isNaN(elegida.getTime())) return 'Fecha no válida.';
      if (elegida < hoy) return 'Esa fecha ya pasó.';
      return '';
    },
    hora: function (valor) {
      if (!valor) return 'Elige una hora.';
      var minutos = Number(valor.slice(0, 2)) * 60 + Number(valor.slice(3, 5));
      if (minutos < 720 || minutos > 1380) return 'Servimos de 12:00 a 23:00.';
      return '';
    },
    telefono: function (valor) {
      if (!valor.trim()) return '';
      if (valor.replace(/\D/g, '').length < 7) return 'Teléfono demasiado corto.';
      return '';
    }
  };

  function pintarError(campo, mensaje) {
    var contenedor = campo.closest('[data-campo]') || campo.parentElement;
    var salida = $('[data-error]', contenedor);
    if (mensaje) {
      campo.setAttribute('aria-invalid', 'true');
      campo.classList.add('border-error');
      if (salida) salida.textContent = mensaje;
    } else {
      campo.removeAttribute('aria-invalid');
      campo.classList.remove('border-error');
      if (salida) salida.textContent = '';
    }
  }

  function validarCampo(campo) {
    var regla = REGLAS[campo.name];
    if (!regla) return true;
    var mensaje = regla(campo.value);
    pintarError(campo, mensaje);
    return !mensaje;
  }

  function fechaLegible(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function mostrarConfirmacion(datos) {
    var panel = $('[data-reserva-confirmacion]');
    if (!panel) return;

    var resumen = $('[data-reserva-resumen]', panel);
    if (resumen) {
      resumen.textContent = datos.nombre + ' - ' + fechaLegible(datos.fecha) +
        ' a las ' + datos.hora + ' - ' + datos.personas +
        (datos.personas === '1' ? ' persona' : ' personas');
    }

    var enlaceWa = $('[data-reserva-whatsapp]', panel);
    if (enlaceWa) {
      var mensaje = 'Hola MADRE, quiero reservar una mesa.\n\n' +
        'Nombre: ' + datos.nombre + '\n' +
        'Fecha: ' + fechaLegible(datos.fecha) + '\n' +
        'Hora: ' + datos.hora + '\n' +
        'Personas: ' + datos.personas +
        (datos.telefono ? '\nTelefono: ' + datos.telefono : '');
      var url = urlWhatsApp(mensaje);
      if (url) {
        enlaceWa.href = url;
        enlaceWa.hidden = false;
      } else {
        enlaceWa.hidden = true;
      }
    }

    formulario.hidden = true;
    panel.hidden = false;
    panel.setAttribute('tabindex', '-1');
    panel.focus({ preventScroll: true });
  }

  if (formulario) {
    // La fecha minima seleccionable es hoy.
    var inputFecha = formulario.elements.fecha;
    if (inputFecha) inputFecha.min = new Date().toISOString().slice(0, 10);

    $$('input, select', formulario).forEach(function (campo) {
      campo.addEventListener('blur', function () {
        validarCampo(campo);
      });
      campo.addEventListener('input', function () {
        if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo);
      });
    });

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();

      var primerFallo = null;
      $$('input, select', formulario).forEach(function (campo) {
        if (!validarCampo(campo) && !primerFallo) primerFallo = campo;
      });

      if (primerFallo) {
        primerFallo.focus();
        return;
      }

      mostrarConfirmacion({
        nombre: formulario.elements.nombre.value.trim(),
        fecha: formulario.elements.fecha.value,
        hora: formulario.elements.hora.value,
        personas: formulario.elements.personas.value,
        telefono: formulario.elements.telefono.value.trim()
      });
    });
  }

  var botonOtraReserva = $('[data-reserva-reiniciar]');
  if (botonOtraReserva) {
    botonOtraReserva.addEventListener('click', function () {
      var panel = $('[data-reserva-confirmacion]');
      formulario.reset();
      $$('input, select', formulario).forEach(function (campo) {
        pintarError(campo, '');
      });
      panel.hidden = true;
      formulario.hidden = false;
      formulario.elements.nombre.focus();
    });
  }

  /* ------------------------------------------------------------------ *
   * ARRANQUE
   * ------------------------------------------------------------------ */
  aplicarConfig();

  // Si se llega con un ancla en la URL, corrige el desplazamiento por el header fijo.
  if (location.hash.length > 1) {
    window.addEventListener('load', function () {
      irASeccion(location.hash.slice(1));
    });
  }
})();
