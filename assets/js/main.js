(function(){
  const els = (sel) => Array.from(document.querySelectorAll(sel));

  const year = new Date().getFullYear();
  els('#year, #yearFooter, #yearFooter2, #yearFooter3, #yearFooter4').forEach(e=>{
    if(e) e.textContent = year;
  });

  const selectEls = els('#langSwitch');
  function getSavedLang(){ return localStorage.getItem('psykeros_lang') || (navigator.language && navigator.language.startsWith('en') ? 'en' : 'es'); }

  function applyLang(lang){
    selectEls.forEach(s=> s.value = lang);
    document.querySelectorAll('[data-i18n]').forEach(node=>{
      const key = node.getAttribute('data-i18n');
      const txt = (window.TRANSLATIONS && TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || '';
      if(txt){
        if(node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea' || node.tagName.toLowerCase() === 'select'){
          node.placeholder = txt;
        } else {
          node.textContent = txt;
        }
      }
    });
    document.documentElement.lang = (lang === 'en') ? 'en' : 'es';
    localStorage.setItem('psykeros_lang', lang);
  }

  selectEls.forEach(s=>{
    s.addEventListener('change', e=>{
      applyLang(e.target.value);
    });
  });

  applyLang(getSavedLang());

  window.handleContactForm = function(ev){
    ev.preventDefault();
    const form = ev.target;
    const data = {
      name: form.name?.value || form.cname?.value,
      email: form.email?.value || form.cemail?.value,
      message: form.message?.value || form.cmsg?.value
    };
    console.log('Contacto enviado', data);
    alert((localStorage.getItem('psykeros_lang') === 'en' ? 'Message sent — we will contact you.' : 'Mensaje enviado — nos pondremos en contacto.'));
    form.reset();
  };

  window.handleAppointmentForm = function(ev){
    ev.preventDefault();
    const f = ev.target;
    const payload = {
      name: f.name?.value,
      email: f.email?.value,
      type: f.type?.value,
      date: f.date?.value,
      msg: f.msg?.value
    };
    console.log('Solicitud de cita', payload);
    alert((localStorage.getItem('psykeros_lang') === 'en' ? 'Request submitted — we will confirm the appointment.' : 'Solicitud enviada — confirmaremos la cita.'));
    f.reset();
  };
})();