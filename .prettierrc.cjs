/**
 * Arquivo de Configuração Completo do Prettier (.prettierrc.js)
 * Documentação Oficial: https://prettier.io/docs/options
 */
module.exports = {
  // LARGURA E INDENTAÇÃO
  printWidth: 80, // Largura máxima da linha antes de quebrar (padrão: 80)
  tabWidth: 2, // Número de espaços por nível de indentação (padrão: 2)
  useTabs: false, // Usar tabulações em vez de espaços (padrão: false)

  // PONTUAÇÃO E ASPAS
  semi: true, // Adicionar ponto e vírgula no final das declarações (padrão: true)
  singleQuote: false, // Usar aspas simples em vez de duplas (padrão: false)
  quoteProps: "as-needed", // Aspas em propriedades de objetos: "as-needed", "consistent" ou "preserve" (padrão: "as-needed")
  jsxSingleQuote: false, // Usar aspas simples em JSX (padrão: false)
  trailingComma: "all", // Vírgulas finais: "all", "es5" ou "none" (padrão: "all")

  // CHAVES E PARÊNTESES
  bracketSpacing: true, // Espaços entre as chaves em objetos literais: { foo: bar } (padrão: true)
  bracketSameLine: false, // Colocar o `>` do JSX/HTML na mesma linha do último atributo (padrão: false)
  arrowParens: "always", // Parênteses em arrow functions: "always" ou "avoid" (padrão: "always")

  // FORMATAÇÃO PARCIAL E PRAGMAS
  rangeStart: 0, // Formatar apenas a partir deste caractere (padrão: 0)
  rangeEnd: Infinity, // Formatar apenas até este caractere (padrão: Infinity)
  requirePragma: false, // Requerer um comentário @prettier ou @format no topo do arquivo para formatar (padrão: false)
  insertPragma: false, // Inserir @format no topo do arquivo após a formatação (padrão: false)

  // MARKDOWN E HTML
  proseWrap: "preserve", // Quebra de linha em Markdown: "always", "never" ou "preserve" (padrão: "preserve")
  htmlWhitespaceSensitivity: "css", // Sensibilidade a espaços em branco no HTML/Vue/Angular: "css", "strict" ou "ignore" (padrão: "css")
  singleAttributePerLine: false, // Forçar apenas um atributo por linha em HTML/Vue/JSX (padrão: false)

  // VUE E FIM DE LINHA
  endOfLine: "lf", // Fim de linha usado pelo SO: "lf", "crlf", "cr" ou "auto" (padrão: "lf")
  embeddedLanguageFormatting: "auto", // Formatar código embutido (ex: HTML dentro de JS): "auto" ou "off" (padrão: "auto")

  // EXPERIMENTAL (Prettier v3.x)
  experimentalTernaries: true, // Usar formatação experimental mais legível para operadores ternários (padrão: false)
};
