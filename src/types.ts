export type Categoria = 'alimento' | 'transporte' | 'lazer' | 'saúde' | 'outros'

export type Despesa = {
  id: string
  titulo: string
  valor: number
  categoria: Categoria
}

export type CategoriaDetalhes = {
  nome: string
  icone: string
  classe: string
}

export type TotaisPorCategoria = Record<Categoria, number>
