<script setup>
import FooterComponent from '@/components/FooterComponent.vue';

</script>

<template>
  <div class="nossa-equipe-container">
    <div class="equipe-content">
      <!-- Card da imagem grande -->
      <div class="image-card">
        <img src="/icons/equipe.jpg" alt="Imagem da equipe" class="team-image">
        <div class="card-footer">
          <h1 class="titulo-principal">Equipe Sharehelp</h1>
        </div>
      </div>

      <!-- Membros da equipe -->
      <div class="members-section">
        <div class="membro-item">
          <img src="/icons/arthurteam.png" alt="Arthur Cândido Benk" class="avatar">
          <div class="info-container">
            <h3 class="nome">Arthur Cândido Benk</h3>
            <p class="cargo">UI/UX - Design Figma</p>
            <div class="social-links">
              <a href="https://github.com/ArthurBenk" class="social-link github"></a>
              <a href="https://www.linkedin.com/in/arthur-benk-1600a12b9/" class="social-link linkedin"></a>
              <a href="https://www.instagram.com/mittens064/" class="social-link instagram"></a>
            </div>
          </div>
        </div>

        <div class="membro-item">
          <img src="/icons/caueteam.png" alt="Cauê Joaquim de Lemos Kreutz" class="avatar">
          <div class="info-container">
            <h3 class="nome">Cauê Joaquim de Lemos Kreutz</h3>
            <p class="cargo">Backend</p>
            <div class="social-links">
              <a href="https://github.com/cauejlk" class="social-link github"></a>
              <a href="https://www.linkedin.com/in/cauejlk/" class="social-link linkedin"></a>
              <a href="https://www.instagram.com/wtfcauejlk/" class="social-link instagram"></a>
            </div>
          </div>
        </div>

        <div class="membro-item">
          <img src="/icons/filipeteam.png" alt="Filipe Bento dos Santos" class="avatar">
          <div class="info-container">
            <h3 class="nome">Filipe Bento dos Santos</h3>
            <p class="cargo">Frontend</p>
            <div class="social-links">
              <a href="https://github.com/FilipeBento19" class="social-link github"></a>
              <a href="https://www.linkedin.com/in/filipe-bento-3b29a92b8/" class="social-link linkedin"></a>
              <a href="https://www.instagram.com/_filipe_bentoo_/" class="social-link instagram"></a>
            </div>
          </div>
        </div>

        <div class="membro-item">
          <img src="/icons/ijairteam.png" alt="Ijair Erick Machado" class="avatar">
          <div class="info-container">
            <h3 class="nome">Ijair Erick Machado</h3>
            <p class="cargo">Frontend - API</p>
            <div class="social-links">
              <a href="https://www.instagram.com/ijairerick/" class="social-link github"></a>
              <a href="https://www.linkedin.com/in/ijair-erick-machado-6878152b8/" class="social-link linkedin"></a>
              <a href="https://www.instagram.com/ijairerick/" class="social-link instagram"></a>
            </div>
          </div>
        </div>

        <div class="membro-item">
          <img src="/icons/gabrielteam.jpg" alt="Gabriel Antônio Pinto" class="avatar">
          <div class="info-container">
            <h3 class="nome">Gabriel Antônio Pinto</h3>
            <p class="cargo">Pesquisa e Gerência</p>
            <div class="social-links">
              <a href="#" class="social-link github"></a>
              <a href="#" class="social-link linkedin"></a>
              <a href="https://www.instagram.com/_biel._dz7/" class="social-link instagram"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style scoped>
.nossa-equipe-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.equipe-content {
  display: flex;
  gap: 40px;
  width: 95%;
  max-width: 1400px;
  margin: 40px auto;
}

/* Card da imagem */
.image-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  max-height: 40vh;
}

.team-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
}

.card-footer {
  padding: 20px;
  text-align: left;
}

.titulo-principal {
  font-size: 1.8rem;
  font-weight: 800;
  color: #2563eb;
  margin: 0;
}

/* Lista de membros */
.members-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;

}

.membro-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #fff;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.membro-item:hover {
  transform: translateY(-3px);
}

.avatar {
  width: 95px;
  height: 95px;
  object-fit: cover;
  border: 2px solid #e5e7eb;
  border-radius: 8%;
}

.info-container {
  flex: 1;
}

.nome {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

.cargo {
  font-size: 0.95rem;
  color: #2563eb;
  margin: 5px 0 12px 0;
  font-weight: 550;
}

.social-links {
  display: flex;
  gap: 12px;
}

/* Ícones sociais com imagens */
.social-link {
  width: 28px;
  height: 28px;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s ease;
}

.social-link.github {
  background-image: url('/icons/git.png');
}

.social-link.linkedin {
  background-image: url('/icons/linkedin.png');
}

.social-link.instagram {
  background-image: url('/icons/inst.png');
}

.social-link:hover {
  transform: scale(1.1);
}

@media (max-width: 1024px) {
  .members-section {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    padding-top: 25px;
  }
}

@media (max-width: 768px) {
  .equipe-content {
    gap: 25px;
    margin: 15px auto;
    display: block;
  }
  
  .team-image {
    height: 180px;
  }


  .titulo-principal {
    font-size: 1.4rem;
  }

  .members-section {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 15px;
  }

  .membro-item {
    padding: 15px;
  }

  .avatar {
    width: 70px;
    height: 70px;
  }

  .nome {
    font-size: 1rem;
  }

  .cargo {
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .nossa-equipe-container {
    padding: 15px;
  }

  .team-image {
    height: 160px;
  }

  .titulo-principal {
    font-size: 1.3rem;
  }

  .members-section {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .membro-item {
    flex-direction: row;
    text-align: left;
    padding: 15px;
  }

  .avatar {
    margin-bottom: 0;
    margin-right: 15px;
    width: 70px;
    height: 80px;
  }

  .social-links {
    justify-content: flex-start;
  }
}

@media (max-width: 400px) {
  .membro-item {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
