from django.core.management.base import BaseCommand
from shareHelp.models import Instituicao, TipoDoacao

class Command(BaseCommand):
    help = 'Importa dados das ONGs para o banco'

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

        # Dados das ONGs
        ongs_data = [
            # =================== CRIANÇAS ===================
            {
                'identificador': 'lar-abdon-batista',
                'categoria': 'criancas',
                'nome': 'Lar Abdon Batista',
                'descricao_curta': 'Acolhe crianças afastadas das famílias, oferecendo proteção, carinho e novas oportunidades em um ambiente seguro e acolhedor.',
                'descricao': 'O Lar Abdon Batista é uma instituição dedicada ao acolhimento de crianças que, por diferentes motivos, precisam ser afastadas de suas famílias. Em um ambiente seguro e cheio de afeto, cada criança encontra proteção, cuidado e a chance de um novo começo. O trabalho realizado vai além da simples moradia: busca-se reconstruir laços familiares e preparar as crianças para um futuro mais seguro e cheio de esperança. A equipe do Lar atua diariamente para suprir as necessidades básicas e emocionais das crianças, garantindo acompanhamento integral. O objetivo central é oferecer um espaço acolhedor e humanizado, respeitando a individualidade de cada uma e promovendo seu desenvolvimento integral. As doações recebidas são fundamentais para manter essa rede de proteção, contribuindo com roupas, alimentos e apoio contínuo. Cada contribuição ajuda a fortalecer a missão de transformar vidas, criando um ambiente em que cada criança pode sonhar e acreditar em novas oportunidades.',
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
                'descricao_curta': 'Leva educação a comunidades vulneráveis no Brasil e África, implementando bibliotecas, capacitando professores e incentivando a leitura.',
                'descricao': 'A OMUNGA nasceu em Joinville como uma grife em 2013 e, com o tempo, transformou-se em um instituto voltado para a educação. Seu propósito é levar oportunidades de aprendizado a comunidades vulneráveis no Brasil e na África, atuando com projetos de incentivo à leitura, capacitação de professores e implantação de bibliotecas. O nome OMUNGA, de origem angolana, significa união, refletindo sua essência de conectar pessoas e transformar realidades por meio da educação. Com iniciativas que já alcançaram o sertão nordestino, a Amazônia e Angola, a organização impactou milhares de crianças e educadores, oferecendo ferramentas para a construção de um futuro mais justo. As ações são financiadas por meio da venda de produtos sociais, doações e parcerias. Esse modelo sustentável garante que a missão de levar educação siga crescendo e beneficiando comunidades que enfrentam grandes desafios de acesso ao conhecimento. Contribuir com a OMUNGA é apoiar diretamente o fortalecimento da educação e da cultura como instrumentos de transformação social.',
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
                'descricao_curta': 'Oferece vagas no contraturno escolar, promovendo desenvolvimento social, emocional e espiritual para crianças e adolescentes.',
                'descricao': 'Há quase três décadas, a Missão Criança atua no bairro Jardim Paraíso, em Joinville, oferecendo um espaço seguro e transformador para crianças e adolescentes. O projeto disponibiliza 250 vagas no contraturno escolar, garantindo que os jovens tenham acompanhamento e atividades que fortalecem seu desenvolvimento social, emocional e espiritual. Movido pelo amor de Deus, o projeto vai além do reforço escolar. Oficinas, orientações e apoio às famílias fazem parte da rotina, criando um ambiente onde os valores são cultivados e os vínculos comunitários são fortalecidos. O espaço é reconhecido como um refúgio de esperança, em que cada criança encontra acolhimento e incentivo para trilhar novos caminhos. A Missão Criança também dedica esforços a impactar positivamente a comunidade local, oferecendo suporte contínuo às famílias. Dessa forma, os benefícios vão além dos muros da instituição, reverberando em todo o entorno. Com dedicação e amor, o projeto constrói futuros mais promissores, ajudando cada criança a desenvolver seu potencial e acreditar em uma vida melhor.',
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
                'descricao_curta': 'Instituição cristã que protege crianças e adolescentes, promovendo igualdade, justiça social e dignidade em parceria com sociedade civil.',
                'descricao': 'A Associação Ecos de Esperança é uma instituição cristã, sem fins lucrativos, que trabalha na defesa integral de crianças e adolescentes. Seu foco é garantir proteção, promover direitos e lutar por justiça social, sempre fundamentada em valores éticos e no Evangelho de Cristo. Acredita que, por meio da fé e da ação concreta, é possível construir uma sociedade mais justa, humana e igualitária. Suas iniciativas envolvem projetos sociais que alcançam crianças em situação de vulnerabilidade, oferecendo suporte emocional, acompanhamento escolar e atividades que fortalecem a cidadania. A organização atua em parceria com igrejas, sociedade civil e poder público, fortalecendo redes de proteção e desenvolvendo projetos comunitários. A dedicação é voltada a assegurar que cada criança e adolescente tenha acesso a oportunidades e seja tratado com dignidade. O apoio da comunidade e das doações permite que esse trabalho se mantenha firme, transformando a vida de muitas famílias e contribuindo para um futuro mais solidário.',
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
                'descricao_curta': 'Apoia famílias em vulnerabilidade com projetos sociais, atendimento básico, orientação jurídica e suporte em saúde e cidadania.',
                'descricao': 'Há oito anos, o Instituto Conforme atua no atendimento a famílias em situação de vulnerabilidade social. Muitas dessas famílias chegam em busca de apoio diante de dificuldades como falta de alimentação, ausência de recursos para saúde e problemas sociais complexos. O instituto oferece uma rede de serviços que inclui palestras educativas, acompanhamento de advogados, médicos, dentistas e psicólogos, além da distribuição de cestas básicas. O trabalho vai além da ajuda imediata, buscando orientar sobre direitos, deveres e formas de conquistar maior autonomia e qualidade de vida. Também há incentivo à qualificação profissional, mostrando caminhos possíveis para romper o ciclo de vulnerabilidade. O Instituto Conforme acredita que a transformação social acontece quando as pessoas recebem apoio integral e oportunidades de desenvolvimento. As doações são fundamentais para garantir a continuidade das ações, fortalecendo famílias e contribuindo para que elas avancem em direção a uma vida mais digna e segura.',
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
                'descricao_curta': 'Apoia crianças e adolescentes com câncer, oferecendo acolhimento, suporte às famílias e mobilização por tratamentos adequados.',
                'descricao': 'A Associação Casa do Adalto, conhecida como ACAN, nasceu em 2002 a partir da história de Adalto, um menino diagnosticado com câncer aos quatro anos de idade. Apesar de sua luta, ele faleceu aos cinco anos, mas deixou um legado de amor e força que inspirou a criação da instituição. A ACAN é uma entidade sem fins lucrativos, dedicada a apoiar crianças e adolescentes com câncer, oferecendo acolhimento e suporte às famílias durante o tratamento. Além de garantir melhores condições de enfrentamento da doença, a associação mobiliza recursos para auxiliar em tratamentos, alimentação e necessidades básicas. O espaço também proporciona um ambiente acolhedor, em que famílias encontram apoio emocional e social em momentos de grande fragilidade. Com o trabalho da ACAN, muitas crianças e adolescentes recebem não apenas suporte médico e material, mas também afeto e esperança. Cada doação contribui para que a instituição siga firme em sua missão de transformar dor em solidariedade e cuidado.',
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
                'descricao_curta': 'Promove acolhimento e proteção a crianças em risco, oferecendo cuidado, segurança e oportunidade para recomeçar com esperança.',
                'descricao': 'O Projeto Resgate tem como missão oferecer acolhimento a crianças em situação de risco, criando um espaço seguro e afetuoso para seu desenvolvimento. A instituição garante proteção e assistência àquelas que, por diferentes motivos, não podem permanecer com suas famílias, assegurando que recebam o cuidado necessário para crescer de forma saudável. O trabalho realizado vai além da atenção imediata: busca-se fortalecer vínculos familiares e oferecer caminhos para que as crianças tenham novas oportunidades de vida. As atividades desenvolvidas incluem suporte socioeducativo, acompanhamento afetivo e programas de reintegração familiar ou encaminhamento para adoção, sempre com foco no melhor interesse da criança. O Projeto Resgate acredita que cada criança merece amor, dignidade e chances reais de construir um futuro melhor. Para isso, conta com o apoio da sociedade civil e de doadores, que contribuem com roupas, brinquedos e livros, tornando possível a continuidade dessa importante missão.',
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
                'descricao_curta': 'Acolhe crianças em situação de violação de direitos, garantindo proteção integral e ambiente seguro conforme o Estatuto da Criança.',
                'descricao': 'A Casa Lar Emanuel, vinculada à Associação Água da Vida, atua no acolhimento de crianças e adolescentes em situação de vulnerabilidade. Seu trabalho segue as diretrizes do Estatuto da Criança e do Adolescente, garantindo proteção integral àqueles que precisaram ser afastados de suas famílias por medidas de proteção. O objetivo é oferecer um lar temporário seguro e afetuoso, até que seja possível o retorno ao convívio familiar ou o encaminhamento para adoção. A instituição trabalha para suprir não apenas as necessidades básicas de alimentação, moradia e saúde, mas também para promover o desenvolvimento emocional, social e educacional dos acolhidos. Além disso, conta com profissionais preparados para acompanhar cada criança em suas necessidades individuais. O apoio da comunidade é essencial para manter esse serviço, especialmente por meio de doações de roupas e alimentos. A Casa Lar Emanuel representa esperança e segurança em momentos de fragilidade, transformando a realidade de muitas crianças e adolescentes.',
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
                'descricao_curta': 'Promove educação ambiental em escolas e comunidades, incentivando consciência ecológica, diagnóstico pedagógico e preservação socioambiental em Joinville.',
                'descricao': 'O Instituto Caranguejo de Educação Ambiental nasceu a partir das iniciativas do Menino Caranguejo e do personagem Caranga, que aproximaram crianças e escolas do tema da preservação ambiental. Com sede em Joinville, a instituição busca fortalecer a consciência ecológica por meio de projetos educativos em comunidades, escolas e espaços sociais. Além de atividades lúdicas e pedagógicas, o instituto realiza diagnósticos nacionais sobre o perfil de professores, estudantes e escolas que trabalham com educação ambiental. Essa análise permite desenvolver estratégias mais eficazes e contribuir para a formação de cidadãos comprometidos com a preservação do meio ambiente. O trabalho do Instituto Caranguejo é reconhecido pelo impacto positivo na formação de valores socioambientais e no estímulo à cidadania. As doações ajudam a fortalecer programas educativos e a ampliar o alcance das iniciativas, garantindo que mais crianças e jovens sejam sensibilizados para cuidar do planeta. Com cada ação, o instituto planta sementes de transformação e de consciência ecológica que perduram por gerações.',
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
                'descricao_curta': 'Oferece acolhimento seguro e cuidado completo a idosos, promovendo bem-estar, dignidade e qualidade de vida.',
                'descricao': 'O Lar do Idoso Betânia é uma instituição de longa permanência que acolhe e cuida de aproximadamente 50 idosos, oferecendo assistência completa em um ambiente seguro e acolhedor. Os atendimentos incluem cuidados médicos, enfermagem, nutrição, terapia ocupacional e apoio social, com uma equipe multidisciplinar formada por psicólogos, assistentes sociais, cuidadores e outros profissionais especializados. O Lar recebe encaminhamentos prioritários de pessoas em vulnerabilidade social por meio da Secretaria de Assistência Social do município, garantindo inclusão e proteção integral. Além dos cuidados básicos, a instituição promove atividades recreativas e educativas, estimulando o bem-estar físico, emocional e social dos residentes. Cada ação é planejada para respeitar a dignidade dos idosos, garantindo conforto, segurança e atenção individualizada. O Lar do Idoso Betânia se compromete com um atendimento humanizado, proporcionando um ambiente onde cada idoso se sinta valorizado, respeitado e acompanhado em todas as etapas da vida.',
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
                'nome': 'Ventura Residence',
                'descricao_curta': 'Oferece moradia e cuidados especializados a idosos, garantindo saúde, conforto e atenção humanizada em Joinville.',
                'descricao': 'Localizado em Joinville, o Ventura Residence é um residencial de idosos que proporciona um ambiente seguro e confortável para pessoas acima de 60 anos. A instituição oferece atendimento integral, incluindo serviços de enfermagem, nutrição, fisioterapia, assistência social e acompanhamento médico especializado. Cada residente recebe atenção individualizada, com foco na saúde física e emocional, bem-estar e qualidade de vida. A equipe é formada por profissionais capacitados, que combinam conhecimento técnico e cuidado humanizado. Além do atendimento diário, o Ventura Residence realiza atividades sociais e recreativas, estimulando a interação, a autonomia e a participação dos moradores. O espaço é projetado para atender às necessidades específicas de cada residente, oferecendo conforto, segurança e suporte contínuo. A instituição tem como missão proporcionar dignidade, acolhimento e qualidade de vida, criando um lar permanente ou temporário onde os idosos se sintam valorizados, respeitados e bem cuidados.',
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
                'descricao_curta': 'Promove acolhimento seguro e dignidade para mulheres idosas, oferecendo cuidado integral e apoio emocional constante.',
                'descricao': 'A Associação Beneficente Lar Renascer é uma instituição que se dedica ao acolhimento e proteção de mulheres idosas em situação de vulnerabilidade social em Joinville. O Lar oferece um ambiente seguro, confortável e humanizado, garantindo cuidados médicos, alimentação adequada, assistência psicológica e atividades recreativas. Cada residente recebe atenção individualizada, com foco na autonomia, dignidade e bem-estar. O Lar Renascer busca criar um espaço de convivência respeitosa, promovendo interação social, apoio emocional e desenvolvimento pessoal. A instituição atua para fortalecer vínculos comunitários e familiares, oferecendo suporte contínuo às necessidades das moradoras. Com serviços planejados e equipe qualificada, o Lar Renascer garante que cada idosa tenha qualidade de vida, segurança e respeito, transformando o cotidiano em um ambiente de cuidado, acolhimento e valorização.',
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
                'descricao_curta': 'Apoia idosos e imigrantes, promovendo autonomia, envelhecimento saudável e assistência social humanizada.',
                'descricao': 'O Centro Integrado João de Paula atua em Joinville oferecendo suporte a idosos e imigrantes em situação de vulnerabilidade social. A instituição realiza atendimento holístico, promovendo saúde física, emocional e social, com foco na autonomia e protagonismo dos indivíduos atendidos. As ações incluem suporte psicológico, atividades educativas, recreativas e acompanhamento social, com uma abordagem humanizada e inclusiva. O Centro integra serviços de alimentação, vestuário e cuidados básicos, garantindo dignidade e proteção aos participantes. O trabalho é planejado para estimular participação comunitária, fortalecer vínculos e promover envelhecimento saudável, respeitando a individualidade e necessidades de cada idoso. Por meio de parcerias com a sociedade civil, voluntários e órgãos públicos, a instituição amplia o alcance e impacto de seus programas, contribuindo para qualidade de vida, bem-estar e integração social dos atendidos. Cada ação reflete compromisso com respeito, cuidado e atenção contínua.',
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
                'descricao_curta': 'Oferece lar seguro e acolhedor com cuidados contínuos, promovendo dignidade e bem-estar integral aos idosos.',
                'descricao': 'A Casa de Repouso Lar Aconchego proporciona um ambiente seguro, acolhedor e estruturado para pessoas idosas, com acompanhamento 24 horas por profissionais especializados. A instituição oferece serviços de enfermagem, nutrição, terapia ocupacional e atendimento médico, garantindo cuidados integrados e atenção individualizada. Além dos cuidados básicos, são realizadas atividades recreativas e educativas para estimular o bem-estar físico e emocional dos residentes. Cada ação é planejada com foco na dignidade, conforto e saúde, respeitando as necessidades e limites de cada idoso. O Lar Aconchego valoriza o cuidado humanizado, promovendo interação social, suporte emocional e segurança em todas as etapas do dia a dia. O compromisso da instituição é oferecer qualidade de vida, respeito e atenção contínua, tornando o espaço um verdadeiro lar para seus moradores, onde cada idoso é valorizado e cuidado com carinho.',
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
                'descricao_curta': 'Dedica-se ao cuidado integral de idosos, oferecendo conforto, segurança e atendimento especializado 24 horas.',
                'descricao': 'A Casa de Repouso Bom Retiro, em Joinville, é um espaço dedicado ao cuidado integral de pessoas idosas, garantindo conforto, segurança e atenção personalizada. A instituição possui equipe qualificada disponível 24 horas, incluindo enfermeiros, nutricionistas, terapeutas ocupacionais e médicos, oferecendo acompanhamento contínuo e humanizado. Além dos cuidados de saúde, são promovidas atividades recreativas, sociais e educativas, incentivando interação, bem-estar e manutenção da autonomia dos residentes. Cada idoso recebe atenção individualizada, com foco em qualidade de vida, respeito e dignidade. O espaço é planejado para atender às necessidades físicas, emocionais e sociais, proporcionando um ambiente acolhedor e seguro. A Casa de Repouso Bom Retiro busca garantir que cada morador tenha conforto, suporte e acompanhamento integral, tornando o cotidiano mais seguro, saudável e agradável.',
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
                'nome': 'Repouso SILOÉ',
                'descricao_curta': 'Proporciona bem-estar e cuidados diários a idosos, garantindo atenção individualizada e qualidade de vida.',
                'descricao': 'A Casa de Repouso SILOÉ é um espaço dedicado ao cuidado e bem-estar de idosos, oferecendo atenção contínua, acompanhamento médico, atividades recreativas e suporte emocional. A instituição conta com equipe preparada e atenciosa, garantindo atendimento personalizado e humanizado. Os residentes participam de atividades sociais e educativas que promovem interação, desenvolvimento pessoal e qualidade de vida. O espaço é seguro, acolhedor e adaptado para atender às necessidades físicas e emocionais de cada idoso. O objetivo é proporcionar dignidade, conforto e apoio integral, promovendo envelhecimento saudável e valorizando cada indivíduo. A instituição também oferece suporte às famílias, mantendo comunicação e apoio constante. Cada ação é voltada a assegurar um ambiente seguro, respeitoso e enriquecedor para todos os residentes.',
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
                'nome': 'Repouso Acolher',
                'descricao_curta': 'Oferece lar seguro e cuidados básicos a idosos sem recursos, promovendo dignidade e atenção humanizada.',
                'descricao': 'A Casa de Repouso Acolher acolhe idosos que não possuem condições de custear cuidados especiais, oferecendo alimentação, acompanhamento diário e assistência integral em um ambiente seguro e acolhedor. A instituição promove dignidade, respeito e bem-estar, com equipe dedicada a cada residente, garantindo suporte emocional, social e físico. Além dos cuidados básicos, são realizadas atividades recreativas, educativas e de convivência, estimulando interação e qualidade de vida. O trabalho busca transformar a vida dos idosos, promovendo inclusão social e atenção personalizada. Cada ação é planejada com foco no conforto, segurança e valorização individual, garantindo que os residentes vivam em um lar de cuidado, solidariedade e respeito.',
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
                'descricao_curta': 'Dedica-se à proteção de idosos vulneráveis, oferecendo acolhimento, alimentação e atividades socioeducativas.',
                'descricao': 'A Ação Social de Joinville desenvolve trabalho voltado ao cuidado de idosos em situação de vulnerabilidade, oferecendo acolhimento, alimentação, assistência médica e atividades socioeducativas. A instituição visa promover qualidade de vida, dignidade, respeito e bem-estar para a terceira idade, com apoio de voluntários e da comunidade local. As ações incluem acompanhamento individual, suporte emocional, atividades recreativas e incentivo à autonomia dos residentes. Cada atendimento é planejado para respeitar necessidades físicas, sociais e emocionais, garantindo conforto e segurança. A instituição atua como referência em solidariedade e responsabilidade social, contribuindo para inclusão, valorização e fortalecimento dos idosos atendidos, promovendo um cotidiano digno e saudável.',
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
                'descricao_curta': 'Acolhe pessoas em situação de rua, migrantes e egressos do sistema prisional com apoio integral e acompanhamento social.',
                'descricao': 'A Casa Santo Egídio é uma casa de passagem em Joinville que recebe pessoas em situação de rua, migrantes e egressos do sistema prisional. Os encaminhamentos são realizados pelo Centro Pop do município, e o acolhimento é feito por uma equipe técnica composta por coordenador, assistentes sociais, psicólogos e dez educadores sociais. O espaço oferece suporte integral, incluindo alimentação, vestuário e acompanhamento psicossocial, garantindo dignidade, segurança e atenção às necessidades individuais de cada pessoa. A instituição promove integração social e reinserção gradual na comunidade, valorizando a escuta ativa, respeito e cuidado humanizado.',
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
                'descricao_curta': 'Oferece acolhimento a pessoas vulneráveis, com alimentação, assistência social, apoio psicológico e ações culturais e comunitárias.',
                'descricao': 'Fundada em 1994, a Casa da Vó Joaquina é uma organização sem fins lucrativos em Joinville dedicada ao acolhimento de pessoas em situação de vulnerabilidade social, incluindo crianças, mulheres, migrantes, idosos e pessoas em situação de rua. A instituição oferece alimentação, apoio psicológico, orientação social e promove atividades culturais e comunitárias, fortalecendo vínculos e promovendo inclusão. Reconhecida como entidade de utilidade pública e Ponto de Cultura, a Casa garante atenção individualizada, desenvolvimento pessoal e social e apoio integral às famílias atendidas. Cada ação é planejada para oferecer segurança, dignidade e cuidado humanizado em um ambiente acolhedor e seguro.',
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
                'nome': 'Centro POP',
                'descricao_curta': 'Espaço de acolhimento que promove direitos, autonomia, reintegração social e cuidado humanizado para pessoas vulneráveis.',
                'descricao': 'O Centro de Referência Especializado para População em Situação de Rua, em Joinville, é um espaço voltado ao acolhimento, proteção e orientação de pessoas em situação de rua. A instituição oferece apoio psicossocial, orientação, encaminhamentos para serviços essenciais, atividades educativas e de reintegração social. Todo o trabalho é realizado com foco na dignidade, autonomia e inclusão social, garantindo escuta ativa, atenção individualizada e respeito aos direitos de cada pessoa. O centro atua para fortalecer a autoestima, promover vínculos comunitários e facilitar a reinserção social, criando oportunidades de desenvolvimento pessoal e acesso a recursos essenciais de forma humanizada.',
                'filtros': ['roupas', 'alimentos', 'brinquedos', 'livros'],
                'telefone': '(47) 3422-7445',
                'endereco_completo': 'Rua Paraíba, 937 – Anita Garibaldi, Joinville – SC',
                'horario_funcionamento': '07:00 - 19:00',
                'logo': '/icons/CentroDeReferenciaEspecializado-logo.png',
                'coordenadas': [-26.3144, -48.8587],
            },
            {
                'identificador': 'caps',
                'categoria': 'moradores-de-rua',
                'nome': 'CAPS',
                'descricao_curta': 'Atendimento humanizado a pessoas com problemas relacionados a álcool e drogas, com terapias e acompanhamento integral.',
                'descricao': 'O Centro de Atenção Psicossocial em Álcool e outras Drogas de Joinville oferece atendimento integral a pessoas que enfrentam problemas com álcool e outras drogas. A instituição disponibiliza uma equipe multiprofissional, terapias individuais e em grupo, acompanhamento psicológico, orientação social e atividades de reinserção. O espaço é aberto, acolhedor e livre de julgamentos, priorizando o vínculo, a escuta qualificada e o respeito à dignidade de cada indivíduo. O objetivo é promover saúde mental, desenvolvimento pessoal, autonomia e qualidade de vida, incentivando a integração social, a superação de desafios e a construção de novas oportunidades para os atendidos.',
                'filtros': ['alimentos', 'livros'],
                'telefone': '(47) 3423-3367',
                'endereco_completo': 'Rua Doutor Plácido Olímpio de Oliveira, 1489 – Anita Garibaldi',
                'horario_funcionamento': '07:00 - 18:00',
                'logo': '/icons/CentreDeAtençãoPiscológica-logo.png',
                'coordenadas': [-26.3244, -48.8687],
            },
            {
                'identificador': 'restaurante-herbert',
                'categoria': 'moradores-de-rua',
                'nome': 'Restaurante Popular UND1',
                'descricao_curta': 'Oferece refeições acessíveis e nutritivas, promovendo segurança alimentar, dignidade e inclusão social para pessoas vulneráveis.',
                'descricao': 'O Restaurante Popular Herbert José de Souza, em Joinville, oferece refeições saudáveis, acessíveis e nutritivas para pessoas em situação de vulnerabilidade social, garantindo acesso à alimentação digna e equilibrada. A instituição prioriza qualidade dos alimentos, atendimento humanizado e respeito aos frequentadores, promovendo segurança alimentar e inclusão social. O objetivo é combater a fome, apoiar famílias e indivíduos, fortalecer vínculos comunitários e promover cidadania. Cada refeição é preparada com cuidado, buscando atender às necessidades nutricionais, respeitar hábitos alimentares e garantir conforto e acolhimento em um ambiente seguro e organizado.',
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
                'descricao_curta': 'Garante alimentação digna a preços populares, promovendo inclusão, cuidado e respeito para pessoas em vulnerabilidade.',
                'descricao': 'O Restaurante Popular Zilda Arns em Joinville oferece refeições nutritivas e acessíveis a preços populares para pessoas em situação de vulnerabilidade social. A instituição promove dignidade e cuidado por meio da alimentação, garantindo que todos tenham acesso a refeições equilibradas, seguras e saborosas. O espaço valoriza atendimento humanizado, acolhimento, respeito e empatia, buscando combater a fome e fortalecer a inclusão social. A equipe trabalha para garantir qualidade, segurança alimentar e um ambiente acolhedor, estimulando hábitos alimentares saudáveis e proporcionando oportunidades de bem-estar e cidadania para todos os frequentadores.',
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
                'descricao_curta': 'Iniciativa comunitária que acolhe pessoas vulneráveis, oferecendo apoio, dignidade e esperança.',
                'descricao': 'Comunidade Eis-me Aqui é uma iniciativa comunitária que acolhe pessoas em situação de vulnerabilidade, oferecendo apoio, dignidade e esperança. A Casa de Levi acolhe pessoas em situação de vulnerabilidade social, oferecendo suporte às famílias em momentos difíceis. Trabalhamos com empatia, escuta ativa e cuidado humanizado, promovendo dignidade e restauração da esperança. Acredita na transformação social por meio do cuidado, disponibiliza alimentos e roupas aos necessitados, fortalece vínculos comunitários e familiares, proporciona um espaço seguro, acolhedor e inclusivo e busca ser presença constante para quem precisa.',
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
                'descricao_curta': 'O Centro de Atendimento às Famílias Carentes Sementes do Futuro apoia famílias vulneráveis, promovendo cuidado, educação e fortalecimento de vínculos.',
                'descricao': 'apoia famílias vulneráveis com ações de cuidado, educação e dignidade, fortalecendo vínculos e promovendo bem-estar. O Centro Sementes do Futuro apoia famílias em vulnerabilidade social, promovendo dignidade, bem-estar e desenvolvimento pessoal. Atua com foco na proteção de crianças e no fortalecimento de vínculos familiares, oferecendo alimentos, livros, roupas e brinquedos. Trabalha com solidariedade, cuidado e atenção individual, proporcionando um ambiente seguro, acolhedor e estimulante, promovendo educação, integração e oportunidades de crescimento, valorizando a inclusão social e a esperança futura, transformando vidas com dedicação e comprometimento comunitário.',
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
                'nome': 'AACC',
                'descricao_curta': 'A Associação de Apoio à Reabilitação de Pessoas Necessitadas promove reabilitação social, emocional e física, oferecendo acolhimento e suporte.',
                'descricao': 'é uma entidade que apoia a reabilitação de pessoas vulneráveis, promovendo autonomia, dignidade e qualidade de vida. A associação promove reabilitação social, emocional e física, oferecendo acolhimento e orientação contínua a pessoas em situação de vulnerabilidade. Trabalhamos para fortalecer a autonomia, autoestima e confiança, valorizando cada história e trajetória individual. Desenvolve atividades educativas e de integração social, promovendo suporte humanizado, respeito e cuidado. Acreditamos na superação e recuperação com dignidade, oferecendo um espaço seguro, inclusivo e acolhedor, buscando restaurar vidas e oferecer oportunidades de reintegração e crescimento pessoal.',
                'filtros': ['livros', 'alimentos', 'roupas'],
                'telefone': '(47) 3029-1091',
                'endereco_completo': 'R. Blumenau, 178 - Centro, Joinville - SC',
                'horario_funcionamento': '09:00 - 17:00',
                'logo': '/icons/AssociacaoDeApoioEReabilitacaoDePessoasNecessitadas-logo.png',
                'coordenadas': [-26.3000, -48.8650],
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
                identificador=ong_data['identificador'],
                defaults={
                    'nome': ong_data['nome'],
                    'descricao_curta': ong_data['descricao_curta'],  # ✅ NOVO
                    'descricao': ong_data['descricao'],  # ✅ NOVO
                    'categoria': ong_data['categoria'],
                    'telefone': ong_data['telefone'],
                    'endereco_completo': ong_data['endereco_completo'],
                    'horario_funcionamento': ong_data['horario_funcionamento'],
                    'logo': ong_data['logo'],
                    'latitude': coordenadas[0],
                    'longitude': coordenadas[1],
                }
            )
            
            if not created:
                # Atualizar dados existentes
                instituicao.nome = ong_data['nome']
                instituicao.descricao_curta = ong_data['descricao_curta']
                instituicao.descricao = ong_data['descricao']
                instituicao.categoria = ong_data['categoria']
                instituicao.telefone = ong_data['telefone']
                instituicao.endereco_completo = ong_data['endereco_completo']
                instituicao.horario_funcionamento = ong_data['horario_funcionamento']
                instituicao.logo = ong_data['logo']
                instituicao.latitude = coordenadas[0]
                instituicao.longitude = coordenadas[1]
                instituicao.save()
                updated_count += 1
            else:
                created_count += 1
                
            if created:
                self.stdout.write(f'  ✅ Criada: {instituicao.nome}')
            else:
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