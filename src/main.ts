import './style.css'
import type { Categoria, CategoriaDetalhes, Despesa, TotaisPorCategoria } from './types'

const categorias: Record<Categoria, CategoriaDetalhes> = {
  alimento: { nome: 'Alimentação', icone: '🍴', classe: 'food' },
  transporte: { nome: 'Transporte', icone: '↗', classe: 'transport' },
  lazer: { nome: 'Lazer', icone: '◇', classe: 'leisure' },
  saúde: { nome: 'Saúde', icone: '＋', classe: 'health' },
  outros: { nome: 'Outros', icone: '•••', classe: 'other' },
}

const despesas: Despesa[] = []

function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id)
  if (!element) throw new Error(`Elemento #${id} não encontrado.`)
  return element as T
}

const form = getElement<HTMLFormElement>('expense-form')
const titleInput = getElement<HTMLInputElement>('title')
const valueInput = getElement<HTMLInputElement>('value')
const categorySelect = getElement<HTMLSelectElement>('category')
const expenseList = getElement<HTMLUListElement>('expense-list')
const template = getElement<HTMLTemplateElement>('expense-item-template')
const emptyState = getElement<HTMLDivElement>('empty-state')
const toast = getElement<HTMLDivElement>('toast')
let toastTimer: number | undefined

function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}

function lerValor(valor: string): number {
  return Number(valor.trim().replace(/\s/g, '').replace(/\./g, '').replace(',', '.'))
}

function formatarCampoValor(valor: string): string {
  const digitos = valor.replace(/\D/g, '')
  if (!digitos) return ''

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(digitos) / 100)
}

function gerarId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
}

function atualizarResumo(): void {
  const totais = despesas.reduce<TotaisPorCategoria>((acc, despesa) => {
    acc[despesa.categoria] += despesa.valor
    return acc
  }, { alimento: 0, transporte: 0, lazer: 0, saúde: 0, outros: 0 })

  const totalGeral = despesas.reduce((total, despesa) => total + despesa.valor, 0)
  getElement('total-expenses').textContent = formatarMoeda(totalGeral)
  getElement('total-alimento').textContent = formatarMoeda(totais.alimento)
  getElement('total-transporte').textContent = formatarMoeda(totais.transporte)
  getElement('total-lazer').textContent = formatarMoeda(totais.lazer)
  getElement('total-saude').textContent = formatarMoeda(totais.saúde)
  getElement('total-outros').textContent = formatarMoeda(totais.outros)

  const quantidade = despesas.length
  getElement('expense-count').textContent = quantidade === 0 ? 'Nenhuma despesa' : `${quantidade} ${quantidade === 1 ? 'despesa registrada' : 'despesas registradas'}`
  getElement('item-count').textContent = `${quantidade} ${quantidade === 1 ? 'item' : 'itens'}`
  getElement('list-caption').textContent = quantidade === 0 ? 'Suas despesas aparecerão aqui.' : 'Acompanhe e gerencie os gastos adicionados.'
  emptyState.hidden = quantidade > 0
}

function criarItemDespesa(despesa: Despesa): DocumentFragment {
  const fragmento = template.content.cloneNode(true) as DocumentFragment
  const item = fragmento.querySelector<HTMLLIElement>('.expense-item')
  const titulo = fragmento.querySelector<HTMLElement>('[data-title]')
  const categoria = fragmento.querySelector<HTMLElement>('[data-category]')
  const valor = fragmento.querySelector<HTMLElement>('[data-value]')
  const icone = fragmento.querySelector<HTMLElement>('[data-category-icon]')
  const botaoExcluir = fragmento.querySelector<HTMLButtonElement>('[data-delete]')
  if (!item || !titulo || !categoria || !valor || !icone || !botaoExcluir) throw new Error('O template da despesa está incompleto.')

  const detalhes = categorias[despesa.categoria]
  item.dataset.id = despesa.id
  titulo.textContent = despesa.titulo
  categoria.textContent = detalhes.nome
  valor.textContent = formatarMoeda(despesa.valor)
  icone.textContent = detalhes.icone
  icone.classList.add(`expense-category-icon--${detalhes.classe}`)
  botaoExcluir.setAttribute('aria-label', `Excluir ${despesa.titulo}`)
  return fragmento
}

function renderizarDespesas(): void {
  expenseList.replaceChildren(...despesas.map(criarItemDespesa))
  atualizarResumo()
}

function limparErros(): void {
  for (const id of ['title', 'value', 'category']) {
    getElement(`${id}-error`).textContent = ''
    getElement(id).removeAttribute('aria-invalid')
  }
}

function mostrarErro(campo: 'title' | 'value' | 'category', mensagem: string): void {
  getElement(`${campo}-error`).textContent = mensagem
  getElement(campo).setAttribute('aria-invalid', 'true')
}

function validarFormulario(): { titulo: string; valor: number; categoria: Categoria } | null {
  limparErros()
  const titulo = titleInput.value.trim()
  const valor = lerValor(valueInput.value)
  const categoria = categorySelect.value as Categoria
  let valido = true
  if (titulo.length < 2) { mostrarErro('title', 'Informe um título com pelo menos 2 caracteres.'); valido = false }
  if (!Number.isFinite(valor) || valor <= 0) { mostrarErro('value', 'Informe um valor maior que zero.'); valido = false }
  if (!(categoria in categorias)) { mostrarErro('category', 'Selecione uma categoria.'); valido = false }
  return valido ? { titulo, valor, categoria } : null
}

function exibirToast(mensagem: string): void {
  toast.lastElementChild!.textContent = mensagem
  toast.classList.add('toast--visible')
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => toast.classList.remove('toast--visible'), 2400)
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const dados = validarFormulario()
  if (!dados) return
  despesas.unshift({ id: gerarId(), ...dados })
  renderizarDespesas()
  form.reset()
  titleInput.focus()
  exibirToast('Despesa adicionada com sucesso.')
})

expenseList.addEventListener('click', (event) => {
  const botao = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-delete]')
  const item = botao?.closest<HTMLLIElement>('.expense-item')
  if (!botao || !item?.dataset.id) return
  const indice = despesas.findIndex((despesa) => despesa.id === item.dataset.id)
  if (indice < 0) return
  despesas.splice(indice, 1)
  renderizarDespesas()
  exibirToast('Despesa removida.')
})

for (const campo of [titleInput, valueInput, categorySelect]) {
  campo.addEventListener('input', () => {
    campo.removeAttribute('aria-invalid')
    getElement(`${campo.id}-error`).textContent = ''
  })
}

valueInput.addEventListener('input', () => {
  valueInput.value = formatarCampoValor(valueInput.value)
})

getElement('current-month').textContent = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date()).replace(/^./, (letra) => letra.toUpperCase())
renderizarDespesas()
