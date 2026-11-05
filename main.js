(function(){
  var toggle=document.getElementById('navToggle'), links=document.getElementById('navLinks');
  function setMenu(open){links.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',open);toggle.setAttribute('aria-label',open?'Close menu':'Open menu');}
  toggle.addEventListener('click',function(){setMenu(!links.classList.contains('is-open'));});
  links.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false);});

  document.querySelectorAll('.tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      document.querySelectorAll('.tab').forEach(function(t){var on=t===tab;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',on);});
      document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.toggle('is-active',p.dataset.panel===tab.dataset.tab);});
      document.querySelectorAll('.tab-panel.is-active .reveal').forEach(function(el){el.classList.add('is-visible');});
    });
  });

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target);}});},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
    var navMap={};document.querySelectorAll('.nav-links a[href^="#"]').forEach(function(a){navMap[a.getAttribute('href').slice(1)]=a;});
    var so=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting&&navMap[en.target.id]){Object.values(navMap).forEach(function(a){a.classList.remove('is-current');});navMap[en.target.id].classList.add('is-current');}});},{rootMargin:'-45% 0px -50% 0px'});
    document.querySelectorAll('main section[id]').forEach(function(s){so.observe(s);});
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('is-visible');});
  }
})();
