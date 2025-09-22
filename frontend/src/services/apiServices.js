// @/services /apiServices.js
import api from '@/config/api.js'

// =====================================
// UTILITÁRIOS DE MAPEAMENTO
// =====================================
const mapInstituicaoToOngData = (instituicao) => {
  return {
    // Compatibilidade com ongsData.js
    id: instituicao.identificador || instituicao.id.toString(),
    title: instituicao.nome,
    description: instituicao.descricao,
    categoria: instituicao.categoria,
    filtros: instituicao.filtros || [],
    telefone: instituicao.telefone,
    local: instituicao.endereco_completo,
    horario: instituicao.horario_funcionamento,
    img: instituicao.logo,
    coordenadas: instituicao.coordenadas || [0, 0],
    progress: instituicao.progresso || 0,

    // Campos adicionais da API
    endereco_resumo: instituicao.endereco_resumo,
    status: instituicao.status,
    data_criacao: instituicao.data_criacao,
    api_id: instituicao.id, // ID numérico da API
  }
}

// =====================================
// SERVIÇOS DE INSTITUIÇÕES
// =====================================
export const instituicoesService = {
  _cache: null,
  _cacheTime: null,
  _cacheDuration: 5 * 60 * 1000, // 5 minutos

  // Buscar todas as instituições (com cache)
  async getInstituicoes(forceRefresh = false) {
    try {
      // Verificar cache
      if (!forceRefresh && this._cache && this._cacheTime &&
          (Date.now() - this._cacheTime < this._cacheDuration)) {
        return this._cache
      }

      const response = await api.get('/instituicoes/')
      const instituicoes = response.data.map(mapInstituicaoToOngData)

      // Atualizar cache
      this._cache = instituicoes
      this._cacheTime = Date.now()

      return instituicoes
    } catch (error) {
      console.error('Erro ao buscar instituições:', error)
      throw error
    }
  },

  // Buscar instituição por ID (compatível com ongsData)
  async getInstituicao(id) {
    try {
      // Primeiro tentar buscar por identificador (string)
      const instituicoes = await this.getInstituicoes()
      let instituicao = instituicoes.find(inst => inst.id === id)

      if (instituicao) {
        return instituicao
      }

      // Se não encontrar, buscar diretamente na API por ID numérico
      const response = await api.get(`/instituicoes/${id}/`)
      return mapInstituicaoToOngData(response.data)
    } catch (error) {
      console.error('Erro ao buscar instituição:', error)
      throw error
    }
  },

  // Buscar por identificador específico
  async getByIdentificador(identificador) {
    try {
      const instituicoes = await this.getInstituicoes()
      return instituicoes.find(inst => inst.id === identificador)
    } catch (error) {
      console.error('Erro ao buscar por identificador:', error)
      throw error
    }
  },

  // Buscar por categoria
  async getByCategoria(categoria) {
    try {
      const response = await api.get(`/instituicoes/?categoria=${categoria}`)
      return response.data.map(mapInstituicaoToOngData)
    } catch (error) {
      console.error('Erro ao buscar por categoria:', error)
      throw error
    }
  },

  // Buscar com filtros
  async getWithFilters(filtros = {}) {
    try {
      const params = new URLSearchParams()

      if (filtros.categoria) params.append('categoria', filtros.categoria)
      if (filtros.filtro) params.append('filtro', filtros.filtro)
      if (filtros.cidade) params.append('cidade', filtros.cidade)
      if (filtros.busca) params.append('busca', filtros.busca)

      const response = await api.get(`/instituicoes/?${params}`)
      return response.data.map(mapInstituicaoToOngData)
    } catch (error) {
      console.error('Erro ao buscar com filtros:', error)
      throw error
    }
  },

  // Buscar para o mapa
  async getForMap() {
    try {
      const response = await api.get('/instituicoes/mapa/')
      return response.data.map(mapInstituicaoToOngData)
    } catch (error) {
      console.error('Erro ao buscar dados do mapa:', error)
      throw error
    }
  },

  // Buscar categorias disponíveis
  async getCategorias() {
    try {
      const response = await api.get('/instituicoes/categorias/')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      throw error
    }
  },

  // Limpar cache
  clearCache() {
    this._cache = null
    this._cacheTime = null
  }
}

// =====================================
// SERVIÇOS DE FAVORITOS
// =====================================
export const favoritosService = {
  // Buscar todos os favoritos do usuário
  async getFavoritos() {
    try {
      const response = await api.get('/favoritos/')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error)
      throw error
    }
  },

  // Buscar favoritos com detalhes das instituições
  async getFavoritosDetalhados() {
    try {
      const favoritos = await this.getFavoritos()
      const instituicoes = await instituicoesService.getInstituicoes()

      return favoritos.map(fav => {
        const instituicao = instituicoes.find(inst =>
          inst.api_id === fav.instituicao || inst.id === fav.instituicao_detalhes?.identificador
        )

        return {
          ...fav,
          instituicao_mapped: instituicao
        }
      })
    } catch (error) {
      console.error('Erro ao buscar favoritos detalhados:', error)
      throw error
    }
  },

  // Adicionar favorito (aceita ID string ou numérico)
  async addFavorito(instituicaoId) {
    try {
      // Se for string, buscar o ID numérico
      let apiId = instituicaoId

      if (typeof instituicaoId === 'string') {
        const instituicao = await instituicoesService.getByIdentificador(instituicaoId)
        if (!instituicao) {
          throw new Error('Instituição não encontrada')
        }
        apiId = instituicao.api_id
      }

      const response = await api.post('/favoritos/', {
        instituicao: apiId
      })
      return response.data
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error)
      throw error
    }
  },

  // Remover favorito
  async removeFavorito(favoritoId) {
    try {
      const response = await api.delete(`/favoritos/${favoritoId}/`)
      return response.data
    } catch (error) {
      console.error('Erro ao remover favorito:', error)
      throw error
    }
  },

  // Verificar se uma instituição é favorita (aceita ID string ou numérico)
  async isFavorited(instituicaoId) {
    try {
      const favoritos = await this.getFavoritos()

      // Se for string, buscar por identificador
      if (typeof instituicaoId === 'string') {
        const instituicao = await instituicoesService.getByIdentificador(instituicaoId)
        if (!instituicao) {
          return { isFavorited: false, favoritoId: null }
        }
        instituicaoId = instituicao.api_id
      }

      const favorito = favoritos.find(fav =>
        fav.instituicao.toString() === instituicaoId.toString()
      )

      return {
        isFavorited: !!favorito,
        favoritoId: favorito?.id || null
      }
    } catch (error) {
      console.error('Erro ao verificar favorito:', error)
      return { isFavorited: false, favoritoId: null }
    }
  }
}

// =====================================
// SERVIÇOS DE DOAÇÕES
// =====================================
export const doacoesService = {
  // Buscar todas as doações do usuário
  async getDoacoes() {
    try {
      const response = await api.get('/doacoes/')
      return response.data.map(doacao => ({
        id: doacao.id,
        ongId: doacao.instituicao_detalhes?.identificador || doacao.instituicao.toString(),
        ongNome: doacao.instituicao_nome || doacao.instituicao_detalhes?.nome,
        tipo: doacao.tipo_doacao_nome || doacao.tipo_doacao_detalhes?.nome_tipo,
        valor: parseFloat(doacao.valor_estimado || 0),
        descricao: doacao.descricao || '',
        status: doacao.status,
        data: doacao.data_doacao,
        dataCriacao: doacao.data_criacao
      }))
    } catch (error) {
      console.error('Erro ao buscar doações:', error)
      throw error
    }
  },

  // Criar nova doação (aceita ID string ou numérico)
  async criarDoacao(doacaoData) {
    try {
      let instituicaoId = doacaoData.instituicaoId

      // Se for string, buscar o ID numérico
      if (typeof instituicaoId === 'string') {
        const instituicao = await instituicoesService.getByIdentificador(instituicaoId)
        if (!instituicao) {
          throw new Error('Instituição não encontrada')
        }
        instituicaoId = instituicao.api_id
      }

      const response = await api.post('/doacoes/', {
        instituicao: instituicaoId,
        tipo_doacao: doacaoData.tipoDoacaoId,
        valor_estimado: doacaoData.valor,
        data_doacao: doacaoData.data || new Date().toISOString().split('T')[0],
        descricao: doacaoData.descricao,
        status: doacaoData.status || 'confirmada'
      })
      return response.data
    } catch (error) {
      console.error('Erro ao criar doação:', error)
      throw error
    }
  },

  // Atualizar doação
  async atualizarDoacao(doacaoId, dadosAtualizados) {
    try {
      const response = await api.patch(`/doacoes/${doacaoId}/`, dadosAtualizados)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar doação:', error)
      throw error
    }
  },

  // Deletar doação
  async deletarDoacao(doacaoId) {
    try {
      const response = await api.delete(`/doacoes/${doacaoId}/`)
      return response.data
    } catch (error) {
      console.error('Erro ao deletar doação:', error)
      throw error
    }
  },

  // Estatísticas do usuário
  async getEstatisticasUsuario() {
    try {
      const response = await api.get('/doacoes/estatisticas_usuario/')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
      throw error
    }
  }
}

// =====================================
// SERVIÇOS DE TIPOS DE DOAÇÃO
// =====================================
export const tiposDoacaoService = {
  // Buscar todos os tipos de doação
  async getTiposDoacao() {
    try {
      const response = await api.get('/tipos-doacao/')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar tipos de doação:', error)
      throw error
    }
  },

  // Buscar tipo de doação monetária/financeira
  async getTipoDoacaoMonetaria() {
    try {
      const tipos = await this.getTiposDoacao()
      return tipos.find(tipo =>
        tipo.nome_tipo.toLowerCase().includes('monetária') ||
        tipo.nome_tipo.toLowerCase().includes('dinheiro') ||
        tipo.nome_tipo.toLowerCase().includes('financeira') ||
        tipo.nome_tipo.toLowerCase().includes('valor')
      ) || tipos[0]
    } catch (error) {
      console.error('Erro ao buscar tipo de doação monetária:', error)
      throw error
    }
  }
}

// =====================================
// SERVIÇOS DE USUÁRIO
// =====================================
export const usuarioService = {
  // Buscar perfil do usuário
  async getPerfil() {
    try {
      const response = await api.get('/perfil/')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      throw error
    }
  },

  // Atualizar perfil do usuário
  async atualizarPerfil(dadosAtualizados) {
    try {
      const response = await api.patch('/perfil/', dadosAtualizados)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      throw error
    }
  }
}

// =====================================
// UTILITÁRIOS
// =====================================
export const authUtils = {
  // Verificar se usuário está logado
  isLoggedIn() {
    return !!localStorage.getItem('access_token')
  },

  // Fazer logout completo
  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('keepLoggedIn')

    // Limpar cache das instituições
    instituicoesService.clearCache()
  },

  // Verificar se token está expirado (básico)
  isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return Date.now() >= payload.exp * 1000
    } catch {
      return true
    }
  }
}

// =====================================
// COMPATIBILIDADE COM ONGSDATA
// =====================================
export const ongsDataCompatibility = {
  // Substituto direto para o import ongs from '@/data/ongsData'
  async getAll() {
    return await instituicoesService.getInstituicoes()
  },

  // Buscar por ID string (como no ongsData)
  async findById(id) {
    return await instituicoesService.getByIdentificador(id)
  },

  // Filtrar por categoria
  async filterByCategory(categoria) {
    const ongs = await this.getAll()
    return ongs.filter(ong => ong.categoria === categoria)
  },

  // Filtrar por filtros (tipos de doação)
  async filterByFilters(filtros) {
    const ongs = await this.getAll()
    return ongs.filter(ong =>
      filtros.some(filtro => ong.filtros.includes(filtro))
    )
  }
}

export default {
  favoritos: favoritosService,
  doacoes: doacoesService,
  instituicoes: instituicoesService,
  tiposDoacao: tiposDoacaoService,
  usuario: usuarioService,
  auth: authUtils,
  ongsData: ongsDataCompatibility // ← Para substituir o ongsData.js
}
