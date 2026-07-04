# Taxonomia de Requisitos — Guia de Referência

Base teórica: Sommerville (2011), Machado (2016), Robertson & Robertson (2006), PMI (2018), PMBOK/BABOK. Consulte este arquivo quando precisar decidir a classificação correta de um requisito ambíguo ou quiser exemplos completos para inspirar a redação.

## 1. Níveis de Requisito

Os requisitos existem em três níveis, cada um voltado a um público diferente:

| Nível | Define | Leitores típicos |
| :--- | :--- | :--- |
| **Negócio** | Objetivos de alto nível da organização; ajuda a definir escopo e limites do software. Geralmente elaborado antes do projeto começar. | Gerentes, clientes, arquitetos de sistemas |
| **Usuário** | O que o usuário deve conseguir fazer com o software, em linguagem natural, sem detalhe técnico. Capturam necessidades e expectativas. | Gerentes, clientes, usuários, arquitetos |
| **Sistema** | Especificação técnica: funções, entradas, saídas, exceções, telas, campos. Deriva dos requisitos de negócio e de usuário. | Usuários avançados, arquitetos, desenvolvedores, testers |

Um requisito de usuário costuma ser expandido em um ou mais requisitos de sistema. Quem lê requisito de usuário não costuma se importar em como o sistema será implementado; quem lê requisito de sistema precisa entender o detalhe técnico para apoiar os processos de negócio.

### Exemplos por nível
- **Negócio:** gerenciar o estoque de tintas; implantar sistema de ponto para economizar papel; controlar a produção de lápis de cor.
- **Usuário:** visualizar os pacientes agendados no dia; realizar uma requisição de materiais; acessar o sistema de qualquer lugar.
- **Sistema:** "Deve possuir uma tela no menu Consultas > Agendamentos, onde será possível consultar todas as agendas do dia, com filtro por data e médico. Na visualização, deve mostrar nome do paciente, horário e médico agendado."

## 2. Requisitos Funcionais (RF)

Descrevem os serviços/funções que o sistema deve fornecer, e também podem declarar explicitamente comportamentos que o sistema não deve ter. São testáveis diretamente.

- No nível de usuário: escritos de forma abstrata ("o login deve ser efetuado com usuário e senha").
- No nível de sistema: detalham entradas, saídas e exceções.

| Necessidade | RF de Usuário | RF de Sistema |
| :--- | :--- | :--- |
| Login | O usuário deve ser autenticado para acesso ao sistema. | O sistema deve validar as credenciais na base; se corretas, gera token de sessão; caso contrário, exibe "Usuário ou senha inválidos". |
| Distinguir PF/PJ | É preciso diferenciar o cliente em pessoa física ou jurídica. | No cadastro, um campo permite selecionar Físico (habilita CPF) ou Jurídico (habilita CNPJ). |
| Consultar horários | É necessário consultar horários disponíveis para agendamento. | Tela mostra todos os horários disponíveis, com filtros por data e médico. |

### Requisitos Evidentes vs. Ocultos (subtipo de RF)
- **Evidentes:** funcionalidades com conhecimento explícito do cliente — consultas, cadastros, processos via interface. Ex: emitir relatório de vendas.
- **Ocultos:** funções executadas nos bastidores, sem o conhecimento explícito do usuário. Ex: ao indicar um amigo que compra, o indicador ganha desconto automático em uma parcela.

## 3. Requisitos Não Funcionais (RNF)

Não descrevem *o que* o sistema faz, mas *como* ele se comporta em atributos observáveis (confiabilidade, desempenho, segurança, usabilidade). São restrições sobre os serviços/funções e, em geral, mais difíceis de testar.

Sommerville (2011) classifica os RNF quanto à origem em três categorias:

### 3.1 Requisitos de Produto
Restringem o comportamento do software (desempenho, confiabilidade, usabilidade).
- *Usabilidade:* quando ocorrer erro, o usuário é redirecionado para página amigável.
- *Eficiência:* o sistema deve processar 25 requisições por minuto.
- *Confiabilidade:* o sistema deve ficar disponível 99% do tempo (uptime).

### 3.2 Requisitos Organizacionais
Derivados de políticas, padrões e procedimentos da organização.
- *Operacional:* falhas críticas disparam e-mail para o responsável técnico.
- *Implementação:* o sistema deve ser desenvolvido em uma stack/linguagem específica.

### 3.3 Requisitos Externos
Originados de fatores externos: legislação, ética, regulamentação.
- *Ético:* o sistema criptografa dados sensíveis.
- *Legal:* o sistema atende às normas da LGPD.

```
Requisitos não funcionais
├── de Produto → eficiência (desempenho, espaço), confiança, proteção
├── Organizacionais → ambientais, operacionais, de desenvolvimento
└── Externos → reguladores, éticos, legais (contábeis, segurança/proteção)
```

### RNF de Usuário vs. RNF de Sistema

| Necessidade | RNF de Usuário | RNF de Sistema |
| :--- | :--- | :--- |
| Navegadores suportados | O sistema deve rodar nos principais navegadores do mercado. | Deve rodar em Chrome (versão mínima X) e Firefox (versão mínima Y). |
| Padrão organizacional | Seguir os padrões de desenvolvimento da empresa. | Seguir orientação a objetos e arquitetura MVC. |
| Tempo de transação | Em caso de demora excessiva no pagamento, cancelar. | Timeout de 10s na resposta da maquininha; sem resposta, cancela a transação. |

## 4. Requisitos de Domínio / Regras de Negócio (RN)

Derivados do domínio da aplicação; refletem regras e conhecimentos específicos da área atendida. Se não forem satisfeitos, o sistema fica inútil para o negócio, mesmo que tecnicamente funcione.

Exemplos:
1. Só podem comprar no crediário clientes sem prestações atrasadas.
2. Média final = (A1 + A2 + A3) / 3.

Regras de negócio costumam virar requisitos funcionais associados:
- **Regra:** média = (A1+A2+A3)/3.
- **RF associado:** ao clicar em "Calcular média", o sistema aplica a fórmula e exibe o resultado em popup.

## 5. Outros Tipos (PMBOK / BABOK)

- **Requisito de Transição:** describe um estado temporário necessário para migrar do estado atual ao futuro; fica obsoleto após a transição. Ex: pagamentos PIX feitos manualmente por transferência até o sistema gerar QR Code automaticamente.
- **Requisito Inverso:** declaração de aspecto negativo — o que o sistema NÃO deve fazer. Usar com cautela para evitar ambiguidade; prefira sempre que possível declarar o comportamento positivo esperado.

## 6. Critérios de Aceite

Condições mínimas e mensuráveis para que uma entrega seja aceita pelo cliente (PMI, 2018). Regra prática: **critério de aceitação = requisito mínimo**.

| Requisito | Critério de Aceite |
| :--- | :--- |
| Visualizar agenda de consultas na data | Cada agendamento mostra obrigatoriamente nome do paciente e horário. |
| Parcelar a compra | A soma das parcelas deve ser exatamente o valor total da compra. |
| Backup diário da base | Executado automaticamente às 02h00, com log de sucesso 100% das vezes. |

Benefícios: ajuda o analista a entender o valor a entregar, ajuda a equipe a entender o objetivo real do requisito, e fornece parâmetros para planejamento de testes/homologação.

## 7. Restrições

Limitações internas ou externas impostas ao projeto. Ignorá-las gera soluções inviáveis e desperdício de recursos. Podem ampliar ou reduzir o escopo/qualidade exigida (ex: prazo curto afeta funcionalidade e usabilidade).

| Classificação | Exemplos |
| :--- | :--- |
| Restrições de Negócio | orçamento, prazo, disponibilidade dos envolvidos, habilidades da equipe |
| Restrições Técnicas | arquitetura predefinida, infraestrutura de servidores, limites de armazenamento |

## 8. Premissas

Fatores assumidos como verdadeiros para fins de planejamento, com **risco associado** caso se provem falsos. Cuidado: premissas com dependências criadas ao longo do projeto viram mais uma "promessa" do que uma premissa de fato.

Exemplos: "a tabela do INSS não muda até o ano que vem"; "a empresa estará habilitada para PIX antes do início do desenvolvimento".

### Matriz de correlação (exemplo)

| Necessidade | Premissa | Restrição | Regra de Negócio | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| Calcular folha de pagamento | Tabela do INSS não muda até o próximo ano | Entregar até 20/05 | Cálculo do INSS pela fórmula X | 100% dos funcionários ativos com folha calculada sem erro |

## 9. Atributos de Qualidade de um Bom Requisito

Use esta tabela para revisar os requisitos gerados antes de entregar ao usuário:

| Atributo | Descrição |
| :--- | :--- |
| Completude | Todas as funcionalidades solicitadas foram documentadas |
| Consistência | Sem conflitos ou contradições entre si |
| Correção | Satisfaz perfeitamente a necessidade real do interessado |
| Sem ambiguidade | Apenas uma interpretação possível |
| Verificável | Pode ser testado/comprovado na implementação |
| Compreensível | Escrito de forma clara para os respectivos leitores |
| Modificável | Permite alterações futuras sem grande impacto |
| Rastreável | Origem (quem pediu, por quê) claramente identificada |
| Necessário | Agrega valor real às partes interessadas |
| Viável | Possível de implementar dadas as restrições técnicas/financeiras/legais |

## 10. Dificuldades Comuns na Coleta de Requisitos

Vale ter em mente durante a entrevista com o usuário, pois ajudam a formular perguntas melhores:
comunicação pouco clara com stakeholders, acesso limitado a quem decide, indefinições (cliente não sabe o que quer), requisitos implícitos (não ditos), mudanças de requisito ao longo do projeto, conflitos entre necessidades, resistência a mudanças, falta de domínio de negócio por parte do interessado, super demanda e necessidade de priorização.
