    <script setup>
    import { computed } from 'vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import ongs from '@/data/ongsData'
    import '@/components/InstsCssComponent.css'

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    };

    // Pegar a instituição recomendada (Ecos de Esperança)
    const recommendedInstitution = computed(() => {
      const ong = ongs.find((o) => o.id === 'casa-vo-joaquina')
      return {
        id: ong.id,
        name: ong.title,
        description: ong.description,
        timeLeft: '12:23:01:09',
        goal: 5000,
        raised: 2800,
        image: ong.img,
        telefone: ong.telefone,
        local: ong.local,
        horario: ong.horario,
        filtros: ong.filtros,
        progress: ong.progress,
      }
    })


    const availableInstitutions = computed(() => {
      return ongs
        .filter((ong) => ong.id !== 'casa-vo-joaquina')
        .filter((ong) => ong.categoria == 'moradores-de-rua')
        .map((ong) => ({
          id: ong.id,
          name: ong.title,
          description: ong.description,
          image: ong.img,
          telefone: ong.telefone,
          local: ong.local,
          horario: ong.horario,
          filtros: ong.filtros,
          categoria: ong.categoria,
        }))
    })

    </script>

    <template>
      <main>
        <div class="topo">
          <div class="overlay"></div>
          <div class="banner">
            <h1>Ajude Gerando Abrigo Para Moradores de Rua</h1>
            <p>
              Cada valor doado gera lares para pessoas sem condição em situação de vulnerabilidade
            </p>
          </div>
        </div>

        <section class="sharehelp-recomenda">
          <h2>ShareHelp Recomenda</h2>
          <p>Conheça o projeto inovador que tem o apoio da<br />equipe sharehelp</p>

          <div class="recommendation-card">
            <div class="card-left">
              <div class="institution-logo">
                <img :src="recommendedInstitution.image" :alt="recommendedInstitution.name" />
              </div>
              <div class="timer">
                <span class="time">{{ recommendedInstitution.timeLeft }}</span>
              </div>
            </div>

            <div class="card-right">
              <h3>{{ recommendedInstitution.name }}</h3>
              <div class="description">
                <p>{{ recommendedInstitution.description }}</p>
              </div>

              <div class="progress-section">
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{
                      width: (recommendedInstitution.raised / recommendedInstitution.goal) * 100 + '%',
                    }"
                  ></div>
                </div>
                <div class="progress-info">
                    <span>{{ Math.round((recommendedInstitution.raised / recommendedInstitution.goal) * 100) }}% alcançado</span>
                    <span>Meta: {{ formatCurrency(recommendedInstitution.goal) }}</span>
                </div>
              </div>

              <div class="card-actions">
                <button class="btn-doar-opcao" >Doar para esta opção</button>
                <router-link :to="`${$route.path}/${recommendedInstitution.id}`"><button class="btn-pagina-instituicao" >Página da Instituição</button></router-link>
              </div>
            </div>
          </div>
        </section>

        <section class="instituicoes-disponiveis">
          <h2>Instituições disponíveis</h2>
          <p>Apoie projetos independentes com toda a segurança<br />garantida pela equipe sharehelp</p>

          <div class="institutions-grid">
            <div
              v-for="institution in availableInstitutions"
              :key="institution.id"
              class="institution-card"
            >
              <div class="institution-image">
                <img :src="institution.image" :alt="institution.name" />
              </div>
              <div class="institution-info">
                <h4>{{ institution.name }}</h4>
                <p class="institution-description">{{ institution.description }}</p>

                <div class="institution-meta">
                  <div class="meta-item"><strong>Categoria:</strong> {{ institution.categoria }}</div>
                  <div class="meta-item"><strong>Telefone:</strong> {{ institution.telefone }}</div>
                  <div class="meta-item"><strong>Horário:</strong> {{ institution.horario }}</div>
                  <div class="meta-item filtros-container">
                    <strong>Aceita:</strong>
                    <div class="filtros-list">
                      <span
                        v-for="filtro in institution.filtros"
                        :key="filtro"
                        class="filtro-tag-small"
                      >
                        {{ filtro }}
                      </span>
                    </div>
                  </div>
                </div>

                <router-link :to="`${$route.path}/${institution.id}`">
                  <button class="btn-doar-instituicao">Doar para esta instituição</button>
                </router-link>

              </div>
            </div>
          </div>
        </section>

        <section>
          <FooterComponent />
        </section>
      </main>
    </template>

    <style scoped>
   
    </style>
