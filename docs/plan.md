# Projeto: Painel de despesas

O projeto vai usar Vite com Vanilla-Typescript 

Apresentação visual do projeto:

Um card para adicionar uma nova despesa.
Lista de todas as despesas adicionadas, abaixo do card de adicionar nova despesa.

Na literal esquerda (sidebar) vamos ter as seguintes informações:
- Soma total de todas as despesas
- O total para cada categoria 

Cada despesa:
- id: string
- titulo: string
- valor: number 
- categorias: Categoria

As categorias são fixas:
"alimento", "transporte", "lazer", "saúde", "outros"

O projeto vai usar HTML, CSS e TS simples (vanilla).
Todos os eventos devem ser adicionados no ts e não no html inline.

Todos os tipes devem estar no araquivo src/types.ts

Não vai haver persistência do dados.

Utilize código simples de fácil manutenção.

Detalhe importante o html da aplicação deve ser montado no proprio html pois o ts será responsavel apenas pela manipulação dos dados, não montagem de html dentro de #app.