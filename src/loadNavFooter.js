
  async function cargar() {
    try {
      let response1 = await fetch('partials/nav.html');
      let response2 = await fetch('partials/footer.html');
      if (response1.ok && response2.ok) {
              let data1 = await response1.text();
              let data2 = await response2.text();
              document.querySelector('.header').innerHTML = data1;
              document.querySelector('.pie-pagina').innerHTML = data2;
              //Open y Close Nav
              document.getElementById('nav-menu-open').addEventListener('click', openNav);
              document.getElementById('nav-menu-close').addEventListener('click', closeNav);
          } else {
            console.error('Error al cargar el archivo', response.statusText);
          }
        } catch (error) {
          console.error('Error al cargar el archivo:', error);
      }
}

  //funcion esconder nav
  function openNav(){
      document.getElementById("mobile-menu").style.width = "100%";
  }

  function closeNav(){
      document.getElementById("mobile-menu").style.width = "0%";
  }
  cargar()

  const swiper = new Swiper('#miCarousel', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 2500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
