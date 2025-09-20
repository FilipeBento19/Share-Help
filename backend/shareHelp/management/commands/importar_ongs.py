from django.core.management.base import BaseCommand
from shareHelp.models import Instituicao, TipoDoacao

class Command(BaseCommand):
    help = 'Importa dados do ongsData.js para o banco'

    def handle(self, *args, **options):
        self.stdout.write('🚀 Iniciando importação das ONGs...')
        
        # Criar tipos de doação primeiro
        tipos_doacao = {
            'roupas': 'Roupas e Vestuário',
            'alimentos': 'Alimentos e Bebidas', 
            'brinquedos': 'Brinquedos e Jogos',
            'livros': 'Livros e Material Educativo',
        }
        
        self.stdout.write('📦 Criando tipos de doação...')
        for nome, descricao in tipos_doacao.items():
            tipo, created = TipoDoacao.objects.get_or_create(
                nome_tipo=nome,
                defaults={'descricao': descricao}
            )
            if created:
                self.stdout.write(f'  ✅ Tipo criado: {nome}')
            else:
                self.stdout.write(f'  ℹ️  Tipo já existe: {nome}')

        # Dados das ONGs convertidos para Python
        ongs_data = [
            # =================== CRIANÇAS ===================
            {
                'identificador': 'lar-abdon-batista',
                'categoria': 'criancas',
                'nome': 'Lar Abdon Batista',
                'descricao': 'Toda criança merece um lar seguro e cheio de carinho. No Lar Abdon Batista, acolhemos aquelas que, por diferentes motivos, não podem estar com suas famílias no momento. Aqui, elas encontram proteção, cuidado e oportunidades para um novo começo. Nosso maior compromisso é oferecer um ambiente acolhedor enquanto trabalhamos para fortalecer seus vínculos familiares e garantir um futuro com mais segurança e esperança.',
                'filtros': ['roupas', 'alimentos'],
                'telefone': '(47) 3422-6944',
                'endereco_completo': 'R. Pres. Affonso Penna, 680 - Bucarein, Joinville - SC, 89202-420',
                'horario_funcionamento': '08:00 - 18:00',
                'logo': '/icons/LarAbdonBatista-Logo.png',
                'coordenadas': [-26.3044, -48.8487],
            },
            {
                'identificador': 'omunga',
                'categoria': 'criancas',
                'nome': 'OMUNGA',
                'descricao': 'A OMUNGA é uma organização social de Joinville que nasceu como uma grife em 2013 e hoje atua como instituto, levando educação para comunidades vulneráveis no Brasil e na África. Por meio da venda de produtos, doações e projetos, a OMUNGA implementa bibliotecas, capacita professores e incentiva a leitura. Seu nome, de origem angolana, significa "união". Já impactou milhares de crianças e educadores em regiões como o sertão nordestino, Amazônia e Angola.',
                'filtros': ['livros'],
                'telefone': '(47) 33056716',
                'endereco_completo': 'Rua Dona Francisca, 8300 - Sala 307 - Distrito Industrial',
                'horario_funcionamento': '08:30 - 17:30',
                'logo': '/icons/OmungaGrifeSocial-logo.png',
                'coordenadas': [-26.2744, -48.8187],
            },
            {
                'identificador': 'missao-crianca-jardim-paraiso',
                'categoria': 'criancas',
                'nome': 'Missão Criança',
                'descricao': 'Há 28 anos, o Projeto Missão Criança tem transformado vidas no Jardim Paraíso, oferecendo 250 vagas no contraturno escolar para crianças e adolescentes. Movido pelo amor de Deus, o projeto promove desenvolvimento social, emocional e espiritual, em um ambiente seguro e acolhedor. Mais do que reforço escolar e oficinas, o Missão Criança oferece esperança, orientação e apoio às famílias, impactando toda a comunidade.',
                'filtros': ['brinquedos', 'roupas'],
                'telefone': '(47) 39031827',
                'endereco_completo': 'R. Crux, 450 - Jardim Paraíso, Joinville - SC',
                'horario_funcionamento': '08:00 - 17:00',
                'logo': '/icons/MissaoCriancaJardimParaiso-logo.png',
                'coordenadas': [-26.3244, -48.8687],
            },
            {
                'identificador': 'ecos-esperanca',
                'categoria': 'criancas',
                'nome': 'Ecos de Esperança',
                'descricao': 'Instituição cristã, não-governamental e sem fins lucrativos, dedicada à proteção integral de crianças e adolescentes e à promoção de seus direitos. Nossa missão é lutar por igualdade, justiça social e dignidade para todos, fundamentados nos princípios do Evangelho de Cristo.',
                'filtros': ['roupas', 'brinquedos', 'alimentos'],
                'telefone': '(47) 34230104',
                'endereco_completo': 'R. Osvaldo Valcanaia, 766 - Paranaguamirim, Joinville - SC',
                'horario_funcionamento': '08:00 - 17:00',
                'logo': '/icons/AssociacaoEcosDeEsperanca-logo.png',
                'coordenadas': [-26.2844, -48.8787],
            },
            {
                'identificador': 'instituto-conforme',
                'categoria': 'criancas',
                'nome': 'Instituto Conforme',
                'descricao': 'Atende famílias em vulnerabilidade, oferecendo apoio por meio de projetos, palestras, consultas com profissionais de saúde e orientação jurídica. Também distribui cestas básicas e promove a qualificação profissional.',
                'filtros': ['roupas', 'brinquedos', 'alimentos'],
                'telefone': '(47) 34266602',
                'endereco_completo': 'R. do Campo, 315 - Morro do Meio, Joinville - SC',
                'horario_funcionamento': '08:00 - 17:00',
                'logo': '/icons/ConformeInstituto-logo.png',
                'coordenadas': [-26.3344, -48.8887],
            },
            {
                'identificador': 'casa-do-adalto',
                'categoria': 'criancas',
                'nome': 'Casa do Adalto',
                'descricao': 'Instituição de apoio a crianças e adolescentes com neoplasia, fundada em 2002 em memória de Adalto, diagnosticado com câncer aos 4 anos. Atua de forma beneficente, oferecendo acolhimento e suporte.',
                'filtros': ['roupas', 'alimentos'],
                'telefone': '(47) 34381629',
                'endereco_completo': 'R. Inambu, 3.290 - Costa e Silva, Joinville - SC',
                'horario_funcionamento': '08:00 - 18:00',
                'logo': '/icons/AssosiciacaoCasaDoAdalto-logo.png',
                'coordenadas': [-26.2644, -48.8287],
            },
            {
                'identificador': 'projeto-resgate',
                'categoria': 'criancas',
                'nome': 'Projeto Resgate',
                'descricao': 'Oferecemos um ambiente acolhedor para fortalecer vínculos familiares.',
                'filtros': ['roupas', 'brinquedos', 'livros'],
                'telefone': '(47) 996950330',
                'endereco_completo': 'R. XV de Novembro, 780 - Centro, Joinville - SC',
                'horario_funcionamento': '13:00 - 18:00',
                'logo': '/icons/ProjetoResgate-logo.png',
                'coordenadas': [-26.3000, -48.8450],
            },
            {
                'identificador': 'casa-lar-emanuel',
                'categoria': 'criancas',
                'nome': 'Casa Lar Emanuel',
                'descricao': 'A Associação Água da Vida denominada Casa Lar Emanuel, acolhe em medida de proteção, conforme prevê o ECA (Estatuto da Criança e do Adolescente), para crianças e adolescentes na faixa etária de 0 a 12 anos preferencialmente, que se encontram com direitos violados, necessitando ser afastados, temporariamente ou permanentemente, do convívio familiar e/ou comunitário, que por sua vez, enquadra- se como Serviço de Proteção Social Especial de Alta Complexidade.',
                'filtros': ['roupas', 'alimentos'],
                'telefone': '(47) 3436-2999',
                'endereco_completo': 'Rua Padre Roma, 339 - João Costa, Joinville - SC',
                'horario_funcionamento': '08:00 - 18:00',
                'logo': '/icons/CasaLarEmanuel-logo.png',
                'coordenadas': [-26.3144, -48.8387],
            },
            {
                'identificador': 'instituto-caranguejo',
                'categoria': 'criancas',
                'nome': 'Instituto Caranguejo',
                'descricao': 'O Instituto Caranguejo de Educação Ambiental surgiu a partir dos trabalhos realizados com o Menino Caranguejo e do Caranga na comunidade de escolas de Joinville e região; e também da necessidade de se elaborar um diagnóstico nacional sobre o perfil não só dos professores, mas das escolas, ambientalistas e estudantes que trabalham e realizam atividades de Educação Ambiental em suas práticas pedagógicas.',
                'filtros': ['roupas', 'alimentos'],
                'telefone': '(47) 3473-0772',
                'endereco_completo': 'R. Ten. Antônio João, 4296 - Jardim Sofia, Joinville - SC',
                'horario_funcionamento': '08:00 - 18:00',
                'logo': '/icons/institutoCarangueijo-logo.png',
                'coordenadas': [-26.3444, -48.8987],
            },
            
            # =================== IDOSOS ===================
            {
                'identificador': 'lar-betania',
                'categoria': 'idosos',
                'nome': 'Lar do Idoso Betânia',
                'descricao': 'Instituição de Longa Permanência para Idosos (ILPI), acolhe em média 50 idosos. Conta com equipe técnica completa para oferecer cuidado, dignidade e qualidade de vida.',
                'filtros': ['roupas'],
                'telefone': '(47) 34225258',
                'endereco_completo': 'R. Dr. Plácido Olímpio de Oliveira, 565 - Bucarein',
                'horario_funcionamento': '08:00 - 17:00',
                'logo': '/icons/LarDoIdosoBetania-logo.png',
                'coordenadas': [-26.3044, -48.8587],
            },
            {
                'identificador': 'ventura-residence',
                'categoria': 'idosos',
                'nome': 'Ventura Residencial',
                'descricao': 'Residencial especializado em cuidados de saúde, nutrição, fisioterapia e apoio social para idosos. Ambiente humanizado e profissional.',
                'filtros': ['alimentos'],
                'telefone': '(47) 30296600',
                'endereco_completo': 'Av. Cel. Procópio Gomes, 669 - Bucarein',
                'horario_funcionamento': '07:00 - 19:00',
                'logo': '/icons/VenturaResidencial-logo.png',
                'coordenadas': [-26.3144, -48.8687],
            },
            {
                'identificador': 'lar-renascer',
                'categoria': 'idosos',
                'nome': 'Lar Renascer',
                'descricao': 'Organização dedicada ao acolhimento e cuidado de mulheres idosas em situação de vulnerabilidade, oferecendo dignidade, proteção e qualidade de vida.',
                'filtros': ['roupas', 'livros', 'alimentos'],
                'telefone': '(47) 3227-7910',
                'endereco_completo': 'R. Dep. Lauro Carneiro de Loyola, 836 - Iririú',
                'horario_funcionamento': 'Aberto 24H',
                'logo': '/icons/AssociacaoLarRenascer-logo.png',
                'coordenadas': [-26.2844, -48.8387],
            },
            {
                'identificador': 'joao-de-paula',
                'categoria': 'idosos',
                'nome': 'Exército da Salvação',
                'descricao': 'Instituição que oferece apoio e desenvolvimento social, com foco em idosos e imigrantes. Trabalha para promover envelhecimento saudável e autonomia.',
                'filtros': ['alimentos', 'roupas'],
                'telefone': '(47) 3453-0588',
                'endereco_completo': 'R. XV de Novembro, 3165 - Glória, Joinville - SC',
                'horario_funcionamento': '09:00 - 17:00',
                'logo': '/icons/ExércitoDeSalvação-logo.png',
                'coordenadas': [-26.3244, -48.8487],
            },
            {
                'identificador': 'lar-aconchego',
                'categoria': 'idosos',
                'nome': 'Lar Aconchego',
                'descricao': 'Ambiente acolhedor com acompanhamento 24h por profissionais de saúde. Oferece atividades de bem-estar e atendimento humanizado.',
                'filtros': ['alimentos', 'livros'],
                'telefone': '(47) 99684-3724',
                'endereco_completo': 'R. Adhemar de Barros, 47 - Bucarein, Joinville - SC',
                'horario_funcionamento': 'Aberto 24H',
                'logo': '/icons/CasaDeRepousoLarAconchego-logo.png',
                'coordenadas': [-26.3044, -48.8687],
            },
            {
                'identificador': 'bom-retiro',
                'categoria': 'idosos',
                'nome': 'Repouso Bom Retiro',
                'descricao': 'Espaço dedicado ao cuidado integral de idosos, com equipe disponível 24h, oferecendo conforto e atenção especializada.',
                'filtros': ['alimentos', 'livros'],
                'telefone': '(47) 98494-7572',
                'endereco_completo': 'R. Max Colin, 155 - Centro, Joinville - SC',
                'horario_funcionamento': '09:00 - 19:00',
                'logo': '/icons/CasaDeRepousoBomRetiro-logo.png',
                'coordenadas': [-26.3000, -48.8550],
            },
            {
                'identificador': 'casa-de-repouso-siloe',
                'categoria': 'idosos',
                'nome': 'Casa de Repouso SILOÉ',
                'descricao': 'A Casa de Repouso SILOÉ é um espaço dedicado ao cuidado e bem-estar da pessoa idosa. Com uma equipe preparada e atenciosa, oferecemos acompanhamento diário, apoio médico, atividades de lazer e convivência que promovem qualidade de vida e dignidade. Nosso objetivo é proporcionar um ambiente acolhedor, seguro e humano, onde cada idoso receba atenção individualizada e viva com conforto, respeito e carinho.',
                'filtros': ['alimentos', 'livros'],
                'telefone': '(47) 99668-7569',
                'endereco_completo': 'R. Copacabana, 1109 - Floresta, Joinville - SC',
                'horario_funcionamento': '09:00 - 17:00',
                'logo': '/icons/CasaDeRepousoSiloe-logo.png',
                'coordenadas': [-26.3344, -48.8787],
            },
            {
                'identificador': 'casa-repouso-acolher',
                'categoria': 'idosos',
                'nome': 'Casa de Repouso Acolher',
                'descricao': 'A Casa de Repouso Acolher oferece um lar seguro e acolhedor para pessoas idosas sem condições de pagar pelo tratamento, proporcionando cuidados básicos, alimentação e acompanhamento diário. Nosso objetivo é garantir dignidade, bem-estar e qualidade de vida a cada residente. Com uma equipe dedicada, promovemos afeto, respeito e inclusão social, transformando vidas com solidariedade e amor.',
                'filtros': ['alimentos', 'livros', 'brinquedos'],
                'telefone': '(47) 99223-3386',
                'endereco_completo': 'R. Adolfo Konder, 64 - Floresta, Joinville - SC',
                'horario_funcionamento': '09:00 - 17:00',
                'logo': '/icons/CasaDeRepousoAcolher.png',
                'coordenadas': [-26.3200, -48.8600],
            },
            {
                'identificador': 'acao-social-joinville',
                'categoria': 'idosos',
                'nome': 'Ação Social Joinville',
                'descricao': 'A Ação Social de Joinville desenvolve um trabalho dedicado ao cuidado e à proteção de idosos em situação de vulnerabilidade. A instituição oferece acolhimento, alimentação, assistência médica e atividades socioeducativas. Seu objetivo é promover qualidade de vida, respeito e dignidade à terceira idade. Conta com o apoio da comunidade e de voluntários para manter seus serviços. A iniciativa é um exemplo de solidariedade e responsabilidade social na região.',
                'filtros': ['roupas', 'alimentos'],
                'telefone': '(47) 3422-6204',
                'endereco_completo': 'Av. Cel. Procópio Gomes, 219 - Bucarein, Joinville - SC',
                'horario_funcionamento': '08:00 - 17:00',
                'logo': '/icons/AcaoSocialJoinville-logo.png',
                'coordenadas': [-26.3144, -48.8587],
            },
            
            # =================== MORADORES DE RUA ===================
            {
                'identificador': 'casa-santo-egidio',
                'categoria': 'moradores-de-rua',
                'nome': 'Passagem Santo Egídio',
                'descricao': 'Casa de passagem que acolhe pessoas em situação de rua, migrantes e egressos do sistema prisional. Encaminhamentos feitos pelo Centro Pop de Joinville.',
                'filtros': ['roupas', 'alimentos'],
                'telefone': '(47) 997887356',
                'endereco_completo': 'R. Alexandre Schlemm, 850 - Anita Garibaldi',
                'horario_funcionamento': '24H',
                'logo': '/icons/CasaDePassagemSantoEgídio-logo.png',
                'coordenadas': [-26.3244, -48.8487],
            },
            {
                'identificador': 'casa-vo-joaquina',
                'categoria': 'moradores-de-rua',
                'nome': 'Casa da Vó Joaquina',
                'descricao': 'Organização fundada em 1994 que atua no acolhimento de pessoas em vulnerabilidade social. Oferece alimentação, apoio psicológico, assistência social e promove ações culturais.',
                'filtros': ['roupas', 'alimentos'],
                'telefone': '',
                'endereco_completo': 'R. Erivelto Martins, 669 - Ulysses Guimarães',
                'horario_funcionamento': '09:00 - 17:00',
                'logo': '/icons/CasaDaVóJoaquina-logo.png',
                'coordenadas': [-26.3344, -48.8787],
            },
            {
                'identificador': 'crepsr',
                'categoria': 'moradores-de-rua',
                'nome': 'Centro Pop',
                'descricao': 'Somos um espaço de acolhimento e atendimento voltado à população em situação de rua. Trabalhamos para garantir acesso a direitos, promover autonomia e reintegração social. Oferecemos apoio psicossocial, orientação e encaminhamentos para diversos serviços. Valorizamos o cuidado, o respeito e a escuta ativa. Nosso compromisso é com a dignidade e a inclusão.',
                'filtros': ['roupas', 'alimentos', 'brinquedos', 'livros'],
                'telefone': '(47) 3422-7445',
                'endereco_completo': 'Rua Paraíba, 937 – Anita Garibaldi, Joinville – SC',
                'horario_funcionamento': '07:00 - 19:00',
                'logo': '/icons/CentroDeReferenciaEspecializado-logo.png',
                'coordenadas': [-26.3144, -48.8587],
            },
            {
                'identificador': 'restaurante-herbert',
                'categoria': 'moradores-de-rua',
                'nome': 'Restaurante Popular UND1',
                'descricao': 'Oferecemos refeições saudáveis e acessíveis à população, com foco em segurança alimentar e inclusão. Trabalhamos para garantir que todos tenham acesso a uma alimentação digna e equilibrada. Atendemos principalmente pessoas em situação de vulnerabilidade. Prezamos pela qualidade dos alimentos e pelo atendimento humanizado. Nosso objetivo é combater a fome com respeito e cuidado.',
                'filtros': ['alimentos'],
                'telefone': '(47) 3433-0153',
                'endereco_completo': 'R. Urussanga, 442 - Bucarein, Joinville - SC',
                'horario_funcionamento': '09:00 - 19:00',
                'logo': '/icons/RestaurantePopular1-logo.png',
                'coordenadas': [-26.2944, -48.8687],
            },
            {
                'identificador': 'restaurante-zilda',
                'categoria': 'moradores-de-rua',
                'nome': 'Restaurante Popular UND2',
                'descricao': 'Somos um restaurante voltado a oferecer refeições nutritivas a preços populares, promovendo dignidade por meio da alimentação. Buscamos atender quem mais precisa com respeito, qualidade e acolhimento. Nossa equipe trabalha para garantir refeições seguras, equilibradas e saborosas. Valorizamos o direito à alimentação como base para a cidadania. Acreditamos que ninguém deve passar fome.',
                'filtros': ['alimentos'],
                'telefone': '(47) 3804-0154',
                'endereco_completo': 'Av. Alwino Hansen, 65 - Adhemar Garcia',
                'horario_funcionamento': '09:00 - 19:00',
                'logo': '/icons/RestaurantePopular2-logo.png',
                'coordenadas': [-26.3444, -48.8287],
            },
            {
                'identificador': 'casa-de-levi',
                'categoria': 'moradores-de-rua',
                'nome': 'Comunidade Eis-me Aqui',
                'descricao': 'Somos uma iniciativa comunitária voltada ao acolhimento de pessoas em situação de vulnerabilidade. Atuamos com empatia, escuta e apoio às famílias que enfrentam dificuldades. Acreditamos na transformação social por meio do cuidado com o próximo. Trabalhamos para restaurar a dignidade e a esperança de quem nos procura. Nossa missão é ser presença e apoio nos momentos mais difíceis.',
                'filtros': ['alimentos', 'roupas'],
                'telefone': '(47) 9718-4655',
                'endereco_completo': 'Rua Voluntários da Pátria, 105 – Itaum, Joinville – SC',
                'horario_funcionamento': '17:00 - 19:00',
                'logo': '/icons/CasaDeLeviEisMeAqui-logo.png',
                'coordenadas': [-26.3144, -48.8787],
            },
            {
                'identificador': 'sementes-do-futuro',
                'categoria': 'moradores-de-rua',
                'nome': 'AACC',
                'descricao': 'Trabalhamos para apoiar famílias em situação de vulnerabilidade com ações que promovem dignidade e desenvolvimento. Atuamos com foco na proteção de crianças, apoio aos responsáveis e fortalecimento de vínculos. Acreditamos na educação, na solidariedade e no cuidado como ferramentas de transformação. Nosso ambiente é acolhedor, seguro e voltado ao bem-estar. Somos sementes de esperança para o futuro.',
                'filtros': ['alimentos', 'livros', 'roupas', 'brinquedos'],
                'telefone': '(47) 9989-4529',
                'endereco_completo': 'R. dos Comerciários, 116 - Petrópolis, Joinville - SC',
                'horario_funcionamento': '14:00 - 17:00',
                'logo': '/icons/SementesDoFuturo-logo.png',
                'coordenadas': [-26.3244, -48.8987],
            },
            {
                'identificador': 'aaprn',
                'categoria': 'moradores-de-rua',
                'nome': 'AAPRN',
                'descricao': 'Somos uma entidade dedicada à reabilitação social, emocional e física de pessoas em situação de vulnerabilidade. Oferecemos acolhimento, orientação e atividades que promovem autonomia e autoestima. Trabalhamos com empatia e responsabilidade, valorizando cada história e trajetória. Buscamos restaurar vidas por meio do apoio contínuo e da escuta ativa. Acreditamos na superação com dignidade.',
                'filtros': ['livros', 'alimentos', 'roupas'],
                'telefone': '(47) 3029-1091',
                'endereco_completo': 'R. Blumenau, 178 - Centro, Joinville - SC',
                'horario_funcionamento': '09:00 - 17:00',
                'logo': '/icons/AssociacaoDeApoioEReabilitacaoDePessoasNecessitadas-logo.png',
                'coordenadas': [-26.3000, -48.8650],
            },
            {
                'identificador': 'caps',
                'categoria': 'moradores-de-rua',
                'nome': 'CAPS',
                'descricao': 'Atuamos no cuidado integral de pessoas que enfrentam problemas relacionados ao uso de álcool e outras drogas. Oferecemos atendimento multiprofissional, terapias em grupo e acompanhamento individual. Acreditamos na recuperação por meio do vínculo e da escuta qualificada. Nosso espaço é aberto, acolhedor e sem julgamentos. Trabalhamos pela saúde mental com dignidade e respeito.',
                'filtros': ['alimentos', 'livros'],
                'telefone': '(47) 3423-3367',
                'endereco_completo': 'Rua Doutor Plácido Olímpio de Oliveira, 1489 – Anita Garibaldi',
                'horario_funcionamento': '07:00 - 18:00',
                'logo': '/icons/CentreDeAtençãoPiscológica-logo.png',
                'coordenadas': [-26.3244, -48.8687],
            },
        ]

        self.stdout.write('🏢 Criando instituições...')
        created_count = 0
        updated_count = 0
        
        for ong_data in ongs_data:
            coordenadas = ong_data.pop('coordenadas')
            filtros = ong_data.pop('filtros')
    
            # Use identificador (string) como referência, não como ID primário
            instituicao, created = Instituicao.objects.get_or_create(
                identificador=ong_data['identificador'],  # ← Campo string único
                defaults={
                    'nome': ong_data['nome'],
                    'descricao': ong_data['descricao'],
                    'categoria': ong_data['categoria'],
                    'telefone': ong_data['telefone'],
                    'endereco_completo': ong_data['endereco_completo'],
                    'horario_funcionamento': ong_data['horario_funcionamento'],
                    'logo': ong_data['logo'],
                    'latitude': coordenadas[0],
                    'longitude': coordenadas[1],
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(f'  ✅ Criada: {instituicao.nome}')
            else:
                updated_count += 1
                self.stdout.write(f'  🔄 Atualizada: {instituicao.nome}')
                
            # Limpar tipos de doação existentes e adicionar novos
            instituicao.tipos_doacao_aceitos.clear()
            
            # Adicionar tipos de doação
            for filtro in filtros:
                try:
                    tipo = TipoDoacao.objects.get(nome_tipo=filtro)
                    instituicao.tipos_doacao_aceitos.add(tipo)
                except TipoDoacao.DoesNotExist:
                    self.stdout.write(f'    ⚠️  Tipo {filtro} não encontrado para {instituicao.nome}')
            
            instituicao.save()

        self.stdout.write(
            self.style.SUCCESS(
                f'🎉 Importação concluída! {created_count} criadas, {updated_count} atualizadas.'
            )
        )